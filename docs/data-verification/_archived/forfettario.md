# Regime forfettario — verifica dati

Riferimento normativo: L. 190/2014 art. 1 commi 54-89, modificata da L. 145/2018 e L. 197/2022. La soglia di ricavi è stata portata a 85.000 € dalla L. 197/2022.

## Parametri (identici per 2024, 2025, 2026)

| Parametro | Valore |
|-----------|--------|
| Soglia ricavi annui | 85.000 € |
| Aliquota imposta sostitutiva — standard | 15% |
| Aliquota imposta sostitutiva — startup | 5% |
| Durata regime startup | 5 anni dall'inizio attività |

## Coefficiente di redditività

Dipende dal codice ATECO. Esempi tipici:

| Attività | Coefficiente |
|----------|--------------|
| Servizi professionali (consulenza, ingegneria, libero professionista) | 78% |
| Attività di costruzione e immobiliare | 86% |
| Commercio all'ingrosso e dettaglio | 40% |
| Industrie alimentari | 40% |
| Intermediari del commercio | 62% |

L'app usa 78% come default (servizi professionali). L'utente può modificarlo per il proprio ATECO.

## Calcolo

```
imponibile lordo = ricavi × coefficiente
contributi INPS = max(minimo, imponibile lordo × aliquota_gestione_separata) [vedi gestione-separata.md]
imponibile sostitutiva = imponibile lordo − contributi INPS
imposta sostitutiva = imponibile sostitutiva × aliquota
netto annuo = ricavi − contributi INPS − imposta sostitutiva
```

## Esempio di calcolo

### Anno 2026, ricavi 50.000 €, coefficiente 78%, regime standard, INPS piena

- imponibile lordo = 50.000 × 78% = 39.000 €
- INPS gestione separata = 39.000 × 26,07% = **10.167,30 €** (sopra il minimo)
- imponibile sostitutiva = 39.000 − 10.167,30 = 28.832,70 €
- imposta sostitutiva = 28.832,70 × 15% = **4.324,91 €**
- netto = 50.000 − 10.167,30 − 4.324,91 = **35.507,79 €**

### Anno 2026, ricavi 30.000 €, coefficiente 78%, startup, INPS piena

- imponibile lordo = 30.000 × 78% = 23.400 €
- INPS = 23.400 × 26,07% = 6.100,38 €
- imponibile sostitutiva = 17.299,62 €
- sostitutiva = 17.299,62 × 5% = **864,98 €**
- netto = 30.000 − 6.100,38 − 864,98 = **23.034,64 €**

## Fonti

- L. 190/2014, art. 1, commi 54-89.
- L. 145/2018 (Bilancio 2019) — riforma del forfettario.
- L. 197/2022, art. 1 c. 54 — innalzamento soglia a 85.000 €.
- Agenzia delle Entrate, "Regime forfetario", https://www.agenziaentrate.gov.it
- Allegato 4 alla L. 190/2014 — coefficienti di redditività per codice ATECO.

## Ultima verifica

2026-05-05
