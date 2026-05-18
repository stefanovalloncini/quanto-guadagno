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
}
```

Brackets MUST partition the income axis without gaps: each bracket's `min` equals the previous bracket's `max`. The final bracket's `max` is `null`.

## Implementation

```ts
function calculateRegionalTax(taxableIncome, region) {
  if (region.exemptionThreshold && taxableIncome <= region.exemptionThreshold) return 0;
  return applyProgressiveBrackets(taxableIncome, region.taxBrackets);
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

## Known limitations

- **Comune-level** addizionale is captured via a single user-editable rate, not a comune-keyed table — Italy has ~8000 comuni, each with its own rate; the calculator deliberately keeps this as a user input.
- **2026 vs prior years**: rates can change yearly. Regions are not yet versioned by `taxYear`; we currently use 2026 values for all years. Future iteration should add per-year regional bracket tables (similar to `TAX_CONFIG_<year>`).
- **Special regimes** for Trento and Bolzano (Provincia Autonoma): treated as separate "regions" with their own brackets.
