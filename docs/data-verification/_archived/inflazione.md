# Inflazione (FOI) — verifica dati

L'app usa l'indice ISTAT FOI (Famiglie di Operai e Impiegati al netto dei tabacchi), il riferimento standard per la rivalutazione automatica del TFR e per il confronto del potere d'acquisto degli stipendi.

## Tassi annui (variazione percentuale media)

| Anno | Variazione FOI |
|------|----------------|
| 2010 | 1,5% |
| 2011 | 2,8% |
| 2012 | 3,0% |
| 2013 | 1,2% |
| 2014 | 0,2% |
| 2015 | 0,0% |
| 2016 | −0,1% |
| 2017 | 1,1% |
| 2018 | 1,1% |
| 2019 | 0,5% |
| 2020 | −0,2% |
| 2021 | 1,9% |
| 2022 | 8,1% |
| 2023 | 5,7% |
| 2024 | 1,1% |
| 2025 | 1,2% |
| 2026 | 1,4% (stima MEF) |

## Calcolo del potere d'acquisto

Per portare un valore nominale dall'anno A all'anno B (con A < B):

```
fattore = ∏ (1 + tasso_anno_i) per i in (A, B]
valore_reale_in_anno_A = nominale / fattore
```

L'app divide quando si va in avanti (chiede "quanto vale oggi quel denaro di X anni fa") e moltiplica quando si va indietro nel tempo.

## Esempio

### 20.000 € del 2020 in euro del 2026

- Tassi: 2021 1,9% → 2022 8,1% → 2023 5,7% → 2024 1,1% → 2025 1,2% → 2026 1,4%
- Fattore = 1,019 × 1,081 × 1,057 × 1,011 × 1,012 × 1,014 ≈ 1,202
- Valore reale = 20.000 / 1,202 ≈ 16.640 €

In altre parole: 20.000 € del 2020 hanno il potere d'acquisto di circa 16.640 € di oggi. La differenza (≈ 20%) è la perdita di potere d'acquisto dovuta all'inflazione del periodo.

## Fonti

- ISTAT, indice FOI nazionale, https://www.istat.it/it/dati-analisi-e-prodotti/banche-dati/dati-mensili
- MEF, Documento di Economia e Finanza (DEF) per le stime correnti.

## Limiti

- L'indice FOI riflette i consumi delle famiglie di lavoratori dipendenti. Per altre categorie (pensionati, alta percentile) il paniere reale può differire.
- Le stime per anni futuri (2026 in avanti) sono indicative e vanno aggiornate ogni gennaio con i dati ISTAT consolidati.

## Ultima verifica

2026-05-05
