# INPS gestione separata — verifica dati

Riferimento normativo: art. 2, c. 26, L. 335/1995. Aliquote definite annualmente da circolare INPS.

## Aliquote (2024, 2025, 2026)

| Anno | Aliquota piena | Aliquota ridotta |
|------|----------------|-------------------|
| 2024 | 26,07% | 24% |
| 2025 | 26,07% | 24% |
| 2026 | 26,07% | 24% |

L'aliquota piena si applica a chi non ha altre coperture previdenziali (es. liberi professionisti senza cassa).
L'aliquota ridotta si applica ai soggetti già coperti da altra gestione obbligatoria (es. dipendenti che fanno anche freelance).

## Massimali e minimali

| Anno | Minimale reddito | Massimale | Min contributo (piena) | Min contributo (ridotta) |
|------|-------------------|-----------|--------------------------|---------------------------|
| 2024 | 18.415 € | 119.650 € | 4.802,79 € | 4.419,60 € |
| 2025 | 18.555 € | 120.607 € | 4.839,29 € | 4.453,20 € |
| 2026 | 18.808 € | 122.295 € | 4.905,24 € | 4.513,92 € |

I valori del minimo contributo sono calcolati come `minimale_reddito × aliquota`.

## Calcolo

```
contributo = max(min_contributo, min(reddito, massimale) × aliquota)
```

## Fonti

- Art. 2, c. 26, L. 335/1995.
- Circolare INPS n. 8/2024 — aliquote e massimali gestione separata 2024.
- Circolare INPS n. 27/2025 — aliquote e massimali gestione separata 2025.
- Circolare INPS n. 8/2026 del 03/02/2026 — aliquote e massimali gestione separata 2026.
- INPS, "Gestione separata", https://www.inps.it

## Ultima verifica

2026-05-05
