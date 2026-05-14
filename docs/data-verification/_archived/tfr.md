# TFR — verifica dati

Trattamento di Fine Rapporto. Riferimento normativo: art. 2120 del Codice Civile.

## Formula di accumulo

L'accantonamento annuo del TFR è pari a:

```
quota_annua = retribuzione_annua_lorda / 13,5
```

Il divisore 13,5 deriva da: contributo TFR ≈ 6,91% della retribuzione, equivalente a 1/14,5 con compensazione del contributo INPS dello 0,5%.

## Rivalutazione

Ogni anno il fondo TFR accumulato viene rivalutato di:

```
tasso_rivalutazione = 1,5% (fisso) + 75% × inflazione_annua (ISTAT)
```

L'inflazione di riferimento è l'indice ISTAT FOI (Famiglie di Operai e Impiegati) di dicembre dell'anno precedente.

## Tassazione

La rivalutazione (la parte che eccede gli accantonamenti) è soggetta a un'imposta sostitutiva del 17%, già trattenuta dal datore di lavoro anno per anno. Il TFR vero e proprio (la somma degli accantonamenti) viene tassato separatamente al momento dell'erogazione, con aliquota media IRPEF dell'ultimo periodo. Il calcolatore qui mostra solo l'imposta sulla rivalutazione, non la tassazione finale del TFR.

## Esempio

### RAL 35.000 €, 10 anni di servizio, inflazione media 2%

- Quota annua = 35.000 / 13,5 = 2.592,59 €
- Tasso di rivalutazione = 1,5% + 0,75 × 2% = 3%
- Capitale accumulato (con rivalutazione composta): ≈ 29.730 €
- Capitale senza rivalutazione: 25.926 €
- Rivalutazione lorda: ≈ 3.804 €
- Imposta sulla rivalutazione (17%): ≈ 647 €
- TFR netto stimato: ≈ 29.083 €

## Limiti del modello

- Assume retribuzione costante per tutta la durata.
- Assume inflazione costante. La realtà è variabile e il tasso composto è anno per anno.
- Non modella le anticipazioni (acquisto prima casa, spese mediche, ecc.).
- Non modella la destinazione a fondi pensione complementari.
- Non calcola la tassazione finale del TFR all'erogazione.

## Fonti

- Art. 2120 c.c. — disciplina del TFR.
- Art. 11 D.Lgs. 252/2005 — tassazione TFR.
- Art. 1 c. 6 L. 296/2006 — imposta sostitutiva sulla rivalutazione (17%).
- ISTAT, indice dei prezzi al consumo per le famiglie di operai e impiegati (FOI).

## Ultima verifica

2026-05-05
