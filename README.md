# Quanto guadagno

Calcolatore di stipendio netto per l'Italia: dal lordo al netto, con contributi, imposte e detrazioni mostrati riga per riga.

## Perché

In Italia il carico fiscale è difficile da leggere. Tra IRPEF, contributi INPS, addizionali regionali e comunali, detrazioni da lavoro e trattamento integrativo, capire quanto resta davvero in busta paga richiede o un commercialista o mezza giornata di letture.

Questo progetto fa vedere dove vanno i soldi. Ogni calcolo è scomposto in passaggi, e per ogni valore normativo c'è la norma che lo giustifica. Sapere quanto si paga è il primo passo per farsi un'idea di come quei soldi vengono spesi.

Resta una stima. Non sostituisce il lavoro di un commercialista e non è un documento fiscale.

## Strumenti

| Strumento | Percorso | Cosa fa |
| --- | --- | --- |
| Stipendio netto da lordo | `/calcola-stipendio` | Lavoratore dipendente, anno fiscale 2024, 2025 o 2026. Aliquote regionali, detrazione lavoro, trattamento integrativo, taglio del cuneo. |
| Calcolo inverso: netto a lordo | `/calcolo-netto-lordo` | Conosci il netto a cui vuoi arrivare: trova la RAL lorda corrispondente. |
| Tredicesima netta | `/calcolo-tredicesima` | Quanto resta della tredicesima dopo INPS e IRPEF, escludendo le detrazioni da lavoro. |
| Progressione apprendistato | `/progressione-apprendistato` | Stima la retribuzione anno per anno durante l'apprendistato professionalizzante. |
| Costo del lavoro | `/costo-azienda` | Quanto costa un dipendente all'azienda, dal lordo agli oneri. |
| Confronto offerte | `/confronto-stipendi` | Due stipendi lordi a confronto: quale rende di più al netto. |
| Storico stipendi | `/storico-stipendio` | Tieni traccia dei tuoi RAL anno per anno e vedi come l'inflazione ne ha cambiato il valore reale. |
| Partita IVA forfettario | `/partita-iva-forfettario` | Reddito netto da fatturato con aliquota sostitutiva al 5% o 15% e contributi Gestione Separata. |
| NASpI | `/calcolo-naspi` | Stima l'indennità di disoccupazione: importo mensile, durata, riduzione progressiva. |
| Preavviso dimissioni | `/preavviso-dimissioni` | Giorni di preavviso e data di uscita in base al CCNL, al livello e all'anzianità. |
| TFR | `/tfr` | Quanto trattamento di fine rapporto accumuli, con quote e rivalutazione. |
| Interesse composto | `/interesse-composto` | Quanto cresce un capitale nel tempo, con versamenti periodici e inflazione attesa. |
| Potere d'acquisto | `/inflazione` | Quanto vale oggi una cifra di qualche anno fa, con l'indice ISTAT FOI. |
| Glossario | `/glossario` | I termini del fisco italiano in breve. |
| Fonti | `/fonti` | Da dove vengono i numeri, riferimento per riferimento. |
| Informazioni | `/informazioni` | Cos'è il progetto e come è fatto. |

## Dati fiscali

I valori normativi stanno in `src/domain/data/`: un file per anno fiscale (`2024.ts`, `2025.ts`, `2026.ts`) e un file per materia (`regions.ts`, `naspi.ts`, `preavviso.ts`, `forfettario.ts`, `inflation.ts` e gli altri). Le funzioni di calcolo leggono soltanto questi file, non contengono cifre proprie.

Ogni valore ha una scheda di verifica in `docs/data-verification/`. La scheda riporta la norma o la circolare che lo fissa, il link alla pubblicazione ufficiale, la data dell'ultimo controllo e almeno un esempio svolto per intero. Gli stessi esempi sono i casi di test in `tests/domain/calc/`, quindi una modifica ai dati che contraddice una fonte verificata fa fallire la suite.

Quando esce una Legge di Bilancio:

1. aggiungi il file dell'anno in `src/domain/data/` e registralo in `index.ts`;
2. aggiorna le schede in `docs/data-verification/` che cambiano, con il riferimento in Gazzetta Ufficiale e la nuova data di verifica;
3. aggiungi i casi di test presi dagli esempi delle istruzioni ufficiali;
4. lancia `pnpm test`.

Le addizionali comunali sono migliaia e cambiano ogni anno: il calcolatore lascia l'aliquota modificabile a mano invece di far finta di conoscerle tutte.

## Sviluppo

Serve Node 22 o superiore e pnpm.

```bash
pnpm install
pnpm dev
```

| Comando | Cosa fa |
| --- | --- |
| `pnpm build` | compila in `dist/` |
| `pnpm preview` | serve la build compilata |
| `pnpm typecheck` | TypeScript in modalità strict |
| `pnpm lint` | ESLint, zero warning ammessi |
| `pnpm format:check` | Prettier |
| `pnpm test` | tutta la suite Vitest |
| `pnpm test:a11y` | i soli test axe |
| `pnpm check:ai-tells` | lessico ed emoji nel sorgente |
| `pnpm check:i18n` | parità fra il catalogo italiano e quello inglese |

Prima di proporre una modifica devono passare tutti:

```bash
pnpm typecheck && pnpm lint && pnpm format:check && pnpm test && pnpm build && pnpm check:ai-tells && pnpm check:i18n
```

## Contribuire

La segnalazione più utile riguarda i dati: un'aliquota sbagliata, una soglia non aggiornata, un'addizionale che non corrisponde alla delibera. Apri una issue con il modello "Errore nei dati fiscali" e allega il link alla fonte ufficiale che dimostra il valore corretto.

Per tutto il resto, da come si nominano i branch a cosa deve passare prima di una PR, leggi [CONTRIBUTING.md](CONTRIBUTING.md). Il [codice di condotta](CODE_OF_CONDUCT.md) vale per issue, pull request e discussioni.

## Disclaimer

I risultati sono una stima indicativa. Non tengono conto di accordi aziendali, conguagli di fine anno, arretrati, redditi diversi da quello inserito e situazioni personali particolari. La busta paga del datore di lavoro resta il riferimento, e per le scelte che contano serve un commercialista.

## English

Quanto guadagno is a net salary calculator for Italy. It takes a gross figure and shows what is left after INPS contributions, IRPEF, regional and municipal surtaxes and the statutory deductions, with every step visible instead of a single final number.

Everything runs in the browser. There is no backend and no account, and nothing you type is sent anywhere.

Tax figures live in `src/domain/data/`, one file per year. Each value is documented in `docs/data-verification/` with its legal source, the date it was last checked and a worked example that doubles as a test case.

The interface is available in Italian and English. To run it locally you need Node 22 or later: `pnpm install`, then `pnpm dev`.

The output is an estimate. Your employer's payslip is the authoritative document.
