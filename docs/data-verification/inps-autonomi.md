# INPS Autonomi (forfettario gestion) — verification

Per-year INPS contribution parameters used by the forfettario calculator for the four supported gestions.

## Sources

- **Gestione Separata 2026** — Circolare INPS n. 8 del 3 febbraio 2026. Aliquota piena 26,07 %; ridotta 24 %; minimale reddito € 18.808; massimale € 122.295.
- **Artigiani / Commercianti 2026** — Circolare INPS n. 14 del 9 febbraio 2026. Artigiani: 24 % fino a € 56.224, 25 % oltre (fino al massimale). Commercianti: stesso scaglione + 0,48 % IVS commercio. Minimale reddito € 18.808; massimale post-1996 € 122.295.
- **Maternity surcharge** — € 7,44 annui per Artigiani e Commercianti (€ 0,62 / mese).
- **Riduzione 35 % L. 190/2014 art. 1 c. 77** — confermata strutturale per il 2026. Domanda entro il 28 febbraio sul cassetto previdenziale.
- **Riduzione 50 % nuovi iscritti L. 207/2024 art. 1 c. 186** — solo per chi si iscrive ex novo nel 2025. 36 mesi continuativi. **Mutually exclusive** con la riduzione 35 %. Si applica alla sola IVS, non al contributo maternità.
- **Soglia RAL dipendente** — € 35.000 per accesso al forfettario in presenza di lavoro dipendente concomitante (art. 1 c. 692 L. 178/2020).

## 2025 differences (per `getAutonomiConfig(2025)`)

- Minimale reddito € 18.555 (Circ. INPS n. 28/2025).
- Massimale Gestione Separata € 120.607.
- Tutto il resto identico al 2026 (aliquote invariate).

## 2024 differences

- Minimale reddito Gestione Separata € 18.415.
- Minimale Artigiani / Commercianti € 17.504.
- Massimale Gestione Separata € 119.650.

## What this calculator does **not** model

- **Cassa Forense, Inarcassa, ENPAM, ENPACL, CNPADC, CNPR, CIPAG, ENPAP, ENPAV, ENPAB, EPAP, EPPI, ENPAPI.** Each has its own contributo soggettivo + integrativo + minimi + maternity. Covered via the **"Cassa professionale (importo manuale)"** option: the user enters the contribution amount as estimated by their cassa, and the calculator uses it verbatim.
- **Ante / post 1996** massimale split for Artigiani / Commercianti. We use the post-1996 figure (€ 122.295 for 2026). Ante-1996 iscritti have a lower cap (€ 86.334 in 2026) and should treat the contribution as overstated by ~ € 1 % of their imponibile in the highest band.
- **National holidays** are not subtracted when prorating contributo fisso by months of activity. Stipendee.it does the same simplification.
- **Domanda di adesione alla riduzione 35 %**: required by Feb 28 — not surfaced in the UI as the calculator is a projection, not a procedure.
