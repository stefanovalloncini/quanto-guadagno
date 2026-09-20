# Come contribuire

Grazie per l'interesse. Questo file spiega cosa serve perché una modifica venga accettata.

Chi partecipa accetta il [codice di condotta](CODE_OF_CONDUCT.md).

## Segnalare un dato fiscale sbagliato

È il contributo più utile. Le aliquote cambiano ogni anno e qualcosa sfugge sempre.

Apri una issue con il modello "Errore nei dati fiscali" e indica:

- l'anno fiscale interessato;
- il valore che il sito mostra, con il nome del campo;
- il valore corretto;
- il link alla fonte ufficiale che lo dimostra.

La fonte deve essere ufficiale: Gazzetta Ufficiale, circolare o messaggio INPS, provvedimento dell'Agenzia delle Entrate, delibera regionale o comunale. Un articolo di giornale che cita la norma non basta, serve la norma.

Se vuoi correggere il dato tu, apri una pull request che tocchi il file in `src/domain/data/`, aggiorni la scheda in `docs/data-verification/` (fonte, data della verifica, esempio svolto) e aggiunga il caso di test corrispondente in `tests/domain/calc/`.

## Branch

| Prefisso | Quando |
| --- | --- |
| `feat/<slug>` | funzionalità nuove |
| `fix/<slug>` | correzioni |
| `data/<anno>` | aggiornamento dei dati fiscali di un anno |
| `docs/<slug>` | solo documentazione |
| `chore/<slug>` | build, dipendenze, configurazione |

## Commit

[Conventional Commits](https://www.conventionalcommits.org/): `tipo: oggetto`, con l'oggetto all'imperativo e sotto i 50 caratteri. Tipi ammessi: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`. Il corpo si scrive solo quando il motivo della modifica non si capisce dall'oggetto.

Nei messaggi di commit e nelle descrizioni delle PR non vanno righe di attribuzione a strumenti di AI: niente `Co-Authored-By` verso un assistente, niente "Generated with", niente firme automatiche. Il commit lo firma chi lo propone.

## Prima di aprire una pull request

Devono passare tutti, in locale, senza warning:

```bash
pnpm typecheck && pnpm lint && pnpm format:check && pnpm test && pnpm build && pnpm check:ai-tells && pnpm check:i18n
```

Nessun file sotto `src/` supera le 250 righe. È una regola di lint, non un consiglio: se un file cresce oltre, va spezzato. I file di soli dati sotto `src/domain/data/` sono esentati.

## I quattro controlli di qualità

Una modifica entra in `main` quando supera tutti e quattro.

**Meccanica.** I comandi qui sopra sono verdi, il limite di 250 righe è rispettato, il peso del bundle non peggiora oltre il budget (250 KB gzip iniziali, 500 KB totali).

**Correttezza dei calcoli.** Ogni funzione di calcolo nuova ha i suoi test. Ogni dato fiscale nuovo ha la scheda in `docs/data-verification/` con la fonte, la data di verifica e almeno un esempio svolto, e quell'esempio compare come caso di test.

**Coerenza visiva.** Niente colori scritti a mano nel JSX, niente emoji nel testo dei componenti (le icone sono componenti SVG), niente `<div role="button">`. I numeri usano le cifre tabulari e il formato italiano (`€1.234,56`) tramite l'helper di formattazione, mai una chiamata a `Intl.NumberFormat` inline.

**Accessibilità.** Obiettivo WCAG AA. `pnpm test:a11y` pulito, ogni elemento interattivo raggiungibile da tastiera con focus visibile, errori annunciati da una live region, nessuna informazione affidata al solo colore, `prefers-reduced-motion` rispettato.

Se uno dei quattro non passa, la PR resta in bozza. Non si abbassa l'asticella.

## Testo e traduzioni

L'italiano è la lingua primaria, l'inglese la seconda. Tutte le stringhe visibili passano da `react-intl`: una stringa scritta direttamente nel JSX è un errore di lint. I due cataloghi in `src/ui/i18n/messages/` devono avere le stesse chiavi, e `pnpm check:i18n` lo verifica.

Il testo è piano e diretto. Niente linguaggio pubblicitario, niente aggettivi di riempimento, niente emoji. Rileggi ad alta voce quello che scrivi: se suona come una brochure, riscrivilo come un fatto.

## Domande

Apri una issue. Per le funzionalità nuove conviene discuterne prima di scrivere il codice.
