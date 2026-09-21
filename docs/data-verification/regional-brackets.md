# Regional addizionale IRPEF brackets — verification

Every Italian region sets its own addizionale all'IRPEF, with bracketed rates and (in some regions) an exemption threshold. The current data lives in `src/domain/data/regions.ts` and is consumed by `calculateRegionalTax`.

## Sources

For each region the brackets come from the regional law (legge regionale) currently in force in 2026, cross-checked against the Agenzia delle Entrate aggregator at
<https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/nuova_addregirpef/sceltaregione.htm>.

Some regions use a single flat rate (Valle d'Aosta, Friuli-Venezia Giulia, Sicilia, Sardegna). Others use the same scaglioni as the national IRPEF (Lombardia, Veneto, etc.). A handful add an exemption threshold below which no addizionale is due (e.g. Valle d'Aosta below €15.000, Campania below €28.000).

## Data shape

```ts
interface Region {
  code: RegionCode;
  name: string;
  taxBrackets: ReadonlyArray<{
    min: number;
    max: number | null; // null for "infinity"
    rate: number;        // 0.0123 = 1,23 %
  }>;
  exemptionThreshold?: number;
  taxDeduction?: {
    amount: number;       // subtracted from the tax, never from the base
    incomeCeiling: number; // above it the deduction is gone entirely
  };
}
```

Brackets MUST partition the income axis without gaps: each bracket's `min` equals the previous bracket's `max`. The final bracket's `max` is `null`.

## Implementation

```ts
function calculateRegionalTax(taxableIncome, region) {
  if (region.exemptionThreshold && taxableIncome <= region.exemptionThreshold) return 0;
  const tax = applyProgressiveBrackets(taxableIncome, region.taxBrackets);
  return Math.max(0, tax - deductionFor(taxableIncome, region));
}
```

Where `applyProgressiveBrackets` already powers IRPEF — same engine, different brackets.

## Worked example (Toscana, taxable €27.243)

Toscana brackets (2026):
- 0–15.000 → 1,42%
- 15.000–28.000 → 1,43%
- 28.000+ → 1,68%

```
0..15000   → 15000 × 0.0142 = 213,00 €
15000..27243 → 12243 × 0.0143 = 175,07 €
total = 388,07 €
```

Matches stipendee.it's example to the cent.

## Valle d'Aosta — the exemption is set by regional law

Valle d'Aosta has one rate, 1,23%, and exempts low incomes outright. The wording on the MEF
aggregator (region code 20, year 2026) is:

> soggetti con reddito complessivo, determinato ai fini dell'imposta sul reddito delle persone
> fisiche (IRPEF), fino a 15.000 euro, sono esentati dal pagamento dell'addizionale regionale
> all'IRPEF

The exemption was introduced by L.R. 32/2022 and is still in force for 2026; the MEF page cites
art. 50, commi 2 and 3, D.Lgs. 446/1997 together with art. 1, L.R. 23 dicembre 2025 n. 29.

`REGIONS["valle-daosta"]` models this as `exemptionThreshold: 15_000` over a single 1,23% bracket,
which reproduces the law exactly. One detail worth stating: the law keys the exemption to *reddito
complessivo IRPEF*, while `calculateRegionalTax` applies it to the taxable income the calculator
computes (gross minus INPS). For an employee whose only income is employment income the two are
the same figure, because art. 51 TUIR already excludes contributions from employment income. They
would diverge for someone with other income the calculator does not know about.

## Trento and Bolzano — same rates, two different reliefs

Both provinces charge 1,23% up to €50.000 and 1,73% above, so the `taxBrackets` arrays are right.
The relief below the threshold, however, is not the same instrument in the two provinces: Bolzano
grants a detrazione from the tax, Trento a deduction from the base. They need two different fields.

### Bolzano — a detrazione of €430,50, modelled as such since 2026-09-21

MEF aggregator, region code 03, year 2026, citing **art. 21/sexiesdecies, legge provinciale 11
agosto 1998, n. 9**:

- detrazione of **€430,50** for taxable income up to €90.000;
- a further detrazione up to €125,00 for taxable income above €50.000, computed as
  `125 × (imponibile − 50.000) / 25.000`;
- €340,00 per dependent child for taxable income up to €90.000.

The detrazioni cumulate but never produce a credit: if the tax owed is smaller, the addizionale is
simply zero.

`REGIONS["bolzano"]` now carries `taxDeduction: { amount: 430.5, incomeCeiling: 90_000 }` and no
`exemptionThreshold`. `calculateRegionalTax` runs the brackets first, subtracts the detrazione when
the taxable income is at or below the ceiling, and floors the result at zero. The break-even sits at
exactly €35.000, where 430,50 / 0,0123 = 35.000.

Golden vectors in `tests/domain/calc/regionalTax.test.ts`:

| Taxable income | Brackets | Detrazione | Addizionale |
|---|---|---|---|
| €20.000 | 246,00 | −430,50 | 0 |
| €28.000 | 344,40 | −430,50 | 0 |
| €35.000 | 430,50 | −430,50 | 0 |
| €60.000 | 788,00 | −430,50 | 357,50 |
| €90.000 | 1.307,00 | −430,50 | 876,50 |
| €95.000 | 1.393,50 | none | 1.393,50 |

#### What is still not modelled

The second detrazione of up to €125,00 above €50.000 is not modelled: the law grants it on top of
the €430,50 for the same taxpayers, so leaving it out overstates the addizionale by at most €125,00
a year between €50.000 and €90.000, and never understates it.

The €340,00 per dependent child is not modelled: the calculator collects the number of children
over 21 for the national detrazioni, but the provincial relief keys on dependent children of any
age, which is not an input the form asks for.

#### Marginal rate

`getRegionalMarginalRate` needed one adjustment. A fixed detrazione does not change the slope of the
curve, but while it still covers the whole tax another euro of income costs nothing, so the helper
returns 0 below €35.000 and the bracket rate above it. The step at €90.000 is a cliff, not a
marginal rate: one euro more than the ceiling costs €430,50 in lost detrazione, and the helper does
not report it as a rate.

### Trento — a €30.000 deduction from the taxable base, which the model does match

MEF aggregator, region code 18, year 2026, citing **art. 1, commi 2 quater, 2 sexies e 3 bis,
legge provinciale 23 dicembre 2019, n. 13**, as amended by art. 1, legge provinciale 29 dicembre
2025, n. 11: taxpayers whose taxable income does not exceed €30.000 deduct €30.000 from the base,
and the deduction is not available to anyone above €30.000. There is also a €246 detrazione per
dependent child for taxable income up to €50.000.

That deduction is a cliff, not a taper: it zeroes the addizionale for anyone at or below €30.000
and disappears entirely one euro later. `exemptionThreshold: 30_000` reproduces it exactly, so for
Trento the model agrees with the law. The legacy note that described both provinces as
detrazione-based (`06-regional-taxes.md` in the previous codebase) is wrong for Trento under the
law in force.

## Known limitations

- **Comune-level** addizionale is captured via a single user-editable rate, not a comune-keyed table — Italy has ~8000 comuni, each with its own rate; the calculator deliberately keeps this as a user input.
- **2026 vs prior years**: rates can change yearly. Regions are not yet versioned by `taxYear`; we currently use 2026 values for all years. Future iteration should add per-year regional bracket tables (similar to `TAX_CONFIG_<year>`).
- **Special regimes** for Trento and Bolzano (Provincia Autonoma): treated as separate "regions" with their own brackets. Bolzano's €430,50 detrazione is modelled; its second detrazione of up to €125 above €50.000 is not.
- **Regional detrazioni for dependent children** (Bolzano €340, Trento €246) are not modelled.

## Verification log

| Date | What was checked | Source |
|---|---|---|
| 2026-09-21 | Valle d'Aosta exemption wording, Bolzano detrazione, Trento base deduction | MEF addizionale regionale aggregator, region codes 20, 03, 18, year 2026 |
| 2026-09-21 | Bolzano modelled as a detrazione of €430,50 up to €90.000 (L.P. 9/1998 art. 21-sexiesdecies), replacing the €28.000 threshold | MEF addizionale regionale aggregator, region code 03, year 2026 |
