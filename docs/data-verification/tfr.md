# TFR accumulato — verifica dati

Riferimento normativo: Art. 2120 c.c. (disciplina del trattamento di fine
rapporto) e DL 47/2014 art. 1 (imposta sostitutiva sulla rivalutazione elevata
dall'11% al 17%).

## Formula

Ogni anno:

```
quota annua      = RAL / 13,5
rivalutazione    = stock al 31/12 dell'anno precedente × (1,5% + 75% × inflazione FOI)
imposta          = 17% sulla rivalutazione
stock            = stock precedente + quota + rivalutazione netta
```

- La quota dell'anno in corso **non** viene rivalutata nello stesso anno: la
  rivalutazione si applica al montante accantonato al 31 dicembre dell'anno
  precedente.
- Il coefficiente di rivalutazione è 1,5% fisso + 75% dell'aumento dell'indice
  ISTAT FOI. Per una proiezione si usa un'inflazione attesa.
- Lo "stock" è il TFR accumulato **al lordo della tassazione separata** che si
  applica solo alla liquidazione (TUIR art. 19, aliquota media); questo
  strumento non la calcola.

## Esempi di calcolo (golden vectors)

### RAL 30.000 €, 3 anni, inflazione attesa 2%

- Quota annua = 30.000 / 13,5 = **2.222,22 €**
- Coefficiente di rivalutazione = 1,5% + 75% × 2% = **3%**
- Anno 1: stock 0 → nessuna rivalutazione → stock 2.222,22 €
- Anno 2: rivalutazione 2.222,22 × 3% = 66,67 €, netta 55,33 € → stock 4.499,78 €
- Anno 3: rivalutazione 4.499,78 × 3% = 134,99 €, netta 112,04 € → stock 6.834,04 €
- Totale quote = **6.666,67 €**, imposta sostitutiva totale ≈ **34,28 €**.

## Semplificazioni

- RAL costante per tutto il periodo (le carriere reali crescono).
- Inflazione attesa costante (l'indice FOI reale varia anno per anno).
- Non include la tassazione separata alla liquidazione né eventuali anticipazioni.
