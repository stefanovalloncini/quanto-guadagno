# Sicurezza

## Come è fatto il sito

È un'applicazione statica. Non c'è un backend, non ci sono account e non viene inviata da nessuna parte nessuna delle cifre che inserisci: i calcoli avvengono nel browser. Lo storico degli stipendi, la lingua e il tema scelto restano nel `localStorage` del tuo browser e non lasciano il dispositivo.

Di conseguenza il rischio principale è la catena di fornitura: le dipendenze npm e la pipeline di build.

## Segnalare un problema

Apri una issue su GitHub. Se ritieni che la segnalazione non debba essere pubblica, usa il [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) del repository, oppure scrivi all'indirizzo che compare come autore nella cronologia dei commit.

Nella segnalazione indica cosa hai osservato, come riprodurlo e quale impatto ti aspetti.

## Fuori ambito

I risultati dei calcoli non sono un problema di sicurezza. Se un'aliquota o una soglia è sbagliata, apri una issue con il modello "Errore nei dati fiscali".
