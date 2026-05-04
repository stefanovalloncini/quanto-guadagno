# Quanto Guadagno

Calcolatore stipendio netto italiano. Lavoro in corso: il `main` contiene solo le funzionalità complete.

## Sviluppo

```bash
pnpm install
pnpm dev
```

## Verifica

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Architettura

Ports & adapters. `domain/` puro, `ports/` interfacce, `adapters/` implementazioni, `app/` cablaggio, `ui/` React.
