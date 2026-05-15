# Quanto Guadagno

Calcolatore stipendio netto italiano. Il branch `main` contiene solo le funzionalità complete.

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

## Deploy — Cloudflare Pages

Sito in produzione: [quantoguadagno.com](https://quantoguadagno.com).

Build settings da inserire nel Cloudflare Pages project:

| Voce | Valore |
|------|--------|
| Framework preset | None (Vite) |
| Build command | `corepack enable && pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Production branch | `main` |
| Environment variable | `NODE_VERSION=22` |

Il fallback SPA per react-router è gestito da `public/_redirects` (`/* /index.html 200`).
