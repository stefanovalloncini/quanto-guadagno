# Come si aggiornano i dati fiscali

La legge fiscale italiana cambia ogni dicembre con la Legge di Bilancio, e in corso d'anno con
circolari INPS, decreti MEF e delibere regionali. Questa guida dice dove mettere le mani, in che
ordine, e cosa deve contenere la pull request perché il numero resti tracciabile.

Regola di fondo: **nessuna cifra entra nel codice senza una fonte ufficiale citata in
`docs/data-verification/`.** Se la fonte non c'è, il dato non si aggiunge.

## Dove stanno i dati

```
src/domain/data/
  types.ts        YearlyTaxConfig e le interfacce che lo compongono
  index.ts        getTaxConfig(year), SUPPORTED_YEARS, LATEST_SUPPORTED_YEAR
  shared.ts       i valori che non cambiano da un anno all'altro
  2024.ts         TAX_CONFIG_2024
  2025.ts         TAX_CONFIG_2025
  2026.ts         TAX_CONFIG_2026
  regions.ts      addizionale regionale IRPEF, 21 regioni e province autonome
  naspi.ts        massimali e riduzione NASpI, per anno
  preavviso.ts    tabelle CCNL dei termini di preavviso
  ccnlPresets.ts  mensilità e aliquote tipiche per CCNL
  forfettario.ts  coefficienti di redditività ATECO
  inpsAutonomi.ts aliquote e minimali artigiani, commercianti, gestione separata
  fringeBenefits.ts soglie e tabelle dei fringe benefit
  inflation.ts    serie ISTAT FOI

docs/data-verification/<materia>.md   la scheda che giustifica ogni cifra
tests/domain/calc/                    i vettori che la bloccano
```

Il criterio per scegliere il file: se il valore cambia con l'anno fiscale sta nel file dell'anno;
se vale per tutti gli anni supportati sta in `shared.ts` e il file dell'anno lo importa; se non
dipende dall'anno fiscale ma dalla materia (regioni, CCNL, ATECO) sta nel file di materia.

Le funzioni in `src/domain/calc/` non contengono cifre. Leggono `getTaxConfig(year)` e le tabelle
di materia, e basta. Se ti trovi a scrivere un numero dentro un calcolo, è nel posto sbagliato.

## Aggiungere un anno fiscale

Si fa quando la Legge di Bilancio è pubblicata in Gazzetta Ufficiale, non prima. Un disegno di
legge non è una fonte.

1. Copia il file dell'ultimo anno: `cp src/domain/data/2026.ts src/domain/data/2027.ts`.
2. Rinomina la costante in `TAX_CONFIG_2027` e porta `year: 2027`.
3. Aggiorna ogni aliquota, scaglione, soglia e massimale che è cambiato, lasciando il commento
   con la fonte accanto al valore. I valori invariati restano importati da `shared.ts`: se un
   valore smette di essere condiviso, toglilo da `shared.ts` e scrivilo per esteso negli anni che
   lo usano ancora.
4. Compila `sources` con la Gazzetta Ufficiale della legge, la circolare INPS dell'anno e la data
   di verifica in formato ISO.
5. In `src/domain/data/types.ts` estendi `TaxYear` con il nuovo anno.
6. In `src/domain/data/index.ts` importa la nuova costante, aggiungila a `SUPPORTED_YEARS`, al
   `REGISTRY` e a `LATEST_SUPPORTED_YEAR`, ed estendi il tipo `SupportedYear`.
7. Aggiorna `src/ui/features/employee-calculator/urlState.ts`: la funzione che valida il parametro
   `y` elenca gli anni ammessi a mano, altrimenti i link con il nuovo anno vengono scartati.
8. Crea `tests/domain/calc/composer.2027.test.ts` copiando il file dell'anno precedente e
   ricalcolando le attese dagli esempi ufficiali (vedi "I vettori").
9. Aggiorna le schede in `docs/data-verification/` toccate dalla modifica, con la nuova riga in
   tabella, il riferimento di legge e la nuova data di verifica.
10. `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.

## Aggiornare un'aliquota

1. Apri il file dell'anno e trova la sezione: ognuna ha un commento con la norma che la fissa.
2. Cambia il valore e aggiorna anche il commento. Un valore nuovo con la vecchia citazione
   accanto è peggio di nessuna citazione.
3. Aggiorna `sources.<chiave>.document` e `lastVerified`.
4. Apri la scheda in `docs/data-verification/` e correggi la tabella, l'esempio svolto e la data
   di ultima verifica.
5. Ricalcola i vettori che dipendono da quel valore e aggiorna le attese nei test. Se un test
   cambia risultato senza che tu abbia capito perché, fermati: o la modifica tocca più cose di
   quanto pensavi, o l'attesa precedente era sbagliata.
6. `pnpm test`.

Le aliquote sono sempre frazioni: `0.0123`, mai `1.23`. Gli importi sono sempre in euro pieni,
con l'underscore a separare le migliaia (`56_224`).

## Aggiungere o ritirare una misura temporanea

Alcune misure valgono per un anno solo (l'esonero contributivo 2024) o arrivano e poi diventano
strutturali (il taglio del cuneo). In `YearlyTaxConfig` stanno come campi tipizzati che valgono
`null` negli anni in cui la misura non esiste: `taxWedgeCut` e `inpsExemption2024` sono i due casi
già presenti.

Per aggiungerne una:

1. Definisci l'interfaccia dei parametri accanto alla funzione che la applica, in
   `src/domain/calc/<misura>.ts`, e riesportala da `src/domain/data/types.ts` come fanno le altre.
2. Aggiungi il campo a `YearlyTaxConfig` come `<Misura>Config | null`.
3. Valorizzalo negli anni in cui la misura è in vigore, `null` in tutti gli altri. Lasciare il
   campo fuori dagli anni vecchi non è un'opzione: il tipo lo richiede, ed è la richiesta a
   impedire che una misura resti accesa per dimenticanza.
4. Scrivi la funzione di calcolo con il suo test, in TDD, e collegala in `composer.ts`.
5. Scrivi `docs/data-verification/<misura>.md` con la norma, il link e un esempio svolto.

Per ritirarne una: porta il campo a `null` nel nuovo anno e **non toccare gli anni passati**. Un
calcolo del 2024 deve continuare a restituire quello che restituiva nel 2024. Se la misura non è
più in vigore in nessun anno supportato, allora si può togliere il campo, la funzione e i test
insieme.

## Aggiornare l'addizionale regionale

Le aliquote regionali stanno in `src/domain/data/regions.ts`, con la stessa forma degli scaglioni
IRPEF. La tabella deve rispettare quattro regole:

- il primo scaglione parte da `min: 0`;
- l'ultimo ha `max: null`;
- il `min` di ogni scaglione è uguale al `max` del precedente, senza buchi;
- `exemptionThreshold` azzera l'imposta fino a quella soglia, e sopra non ha effetto;
- `taxDeduction` sottrae un importo fisso dall'imposta fino a `incomeCeiling`, con il risultato mai
  sotto zero.

Oggi non esiste un test che verifica queste quattro regole su tutte le regioni: `regionalTax.test.ts`
copre singoli casi di calcolo. Finché quel test non c'è, ricontrolla la continuità degli scaglioni
a mano dopo ogni modifica.

`exemptionThreshold` descrive un'esenzione vera (Valle d'Aosta) o una deduzione dalla base con
effetto a scalino (Trento). Una detrazione d'imposta va invece su `taxDeduction`, come per la
provincia di Bolzano. Prima di modellare una regione, leggi sulla pagina MEF quale dei tre
strumenti la legge usa davvero: producono importi diversi sulla stessa aliquota.

La tabella non è ancora versionata per anno: vale l'ultimo anno verificato per tutti gli anni
supportati. Se una regione cambia aliquota, la modifica si riflette anche sui calcoli degli anni
precedenti. È un limite dichiarato, non una svista.

## I vettori

I vettori sono i casi di test in `tests/domain/calc/`: un file per anno
(`composer.2024.test.ts`, `composer.2025.test.ts`, `composer.2026.test.ts`) e un file per materia
(`regionalTax.test.ts`, `deductions.test.ts`, `employerCost.test.ts` e gli altri). I calcoli
singoli hanno invece il test accanto al modulo, in `src/domain/calc/<nome>.test.ts`.

Quello che rende un vettore affidabile:

- gli input sono scritti per esteso nel test, non costruiti da una fixture condivisa;
- l'attesa viene da una fonte esterna al codice (l'esempio delle istruzioni Agenzia Entrate, la
  circolare INPS, un caso svolto in una scheda di verifica), non dall'output del programma;
- sopra c'è un commento che dice da dove viene il numero.

Quando un'attesa cambia perché è cambiata la legge, il commento cambia con lei. Quando cambia
perché il motore è stato corretto, la scheda di verifica spiega l'errore precedente.

## Cosa deve contenere la pull request

- [ ] ogni cifra modificata è tracciabile a una pubblicazione ufficiale;
- [ ] il commento accanto al valore cita la norma o la circolare giusta;
- [ ] `sources.<chiave>.document` e `lastVerified` sono aggiornati;
- [ ] la scheda in `docs/data-verification/` riporta la modifica, con almeno un esempio svolto;
- [ ] i vettori toccati sono aggiornati e il commento spiega perché l'attesa è cambiata;
- [ ] `pnpm typecheck && pnpm lint && pnpm format:check && pnpm test && pnpm build` è verde;
- [ ] i risultati degli anni passati non sono cambiati (se sono cambiati, la PR dice perché).

Una PR che tocca i dati e non tocca nessun test è quasi sempre incompleta: o il dato non influisce
su niente, e allora non serve, oppure influisce e manca il vettore.
