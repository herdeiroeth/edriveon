# E-DriveOn

Plataforma **mediadora P2P** de locação de veículos elétricos e híbridos. A plataforma não é dona dos carros — conecta `LOCADOR` (anuncia a frota) e `LOCATARIO` (aluga), com comissão de 10%, contrato digital e caução.

Projeto P.A.L · Senac.

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** · lucide-react
- **Prisma 6** + **PostgreSQL**
- **Auth.js (NextAuth v5)** — credenciais, sessão JWT, papéis
- **bcryptjs** · **Zod**

## Funcionalidades (v1)

- Landing, **catálogo** (filtros por tipo/categoria/cidade/diária/autonomia + ordenação + busca) e **detalhe** do veículo — públicos.
- **Autenticação** com papéis (locatário/locador/admin) e rotas protegidas (`/painel/*`, `/reserva/*`).
- **Aprovação interna de cadastros**: ninguém entra automaticamente. Novo cadastro fica `PENDENTE`; só o **admin** aprova/nega no painel `/painel/admin`; apenas contas `APROVADO` conseguem logar.
- **CRUD de carros** (prioridade): o locador anuncia, edita, pausa/ativa e remove veículos. Veículos `ATIVO` aparecem no catálogo na hora.
- Stubs protegidos (fase 2): painel do locatário e checkout de reserva em 4 etapas.

## Rodando localmente

Pré-requisitos: Node 20+, PostgreSQL.

```bash
# 1. Dependências
npm install

# 2. Variáveis de ambiente
cp .env.example .env
#   - DATABASE_URL / DIRECT_URL → seu Postgres local
#   - AUTH_SECRET → gere com: openssl rand -base64 32

# 3. Banco
npx prisma migrate dev      # cria as tabelas
npx prisma db seed          # popula 12 veículos + 2 usuários demo

# 4. Dev server
npm run dev                 # http://localhost:3000
```

### Contas demo (após o seed)

| Papel     | E-mail                   | Senha     |
| --------- | ------------------------ | --------- |
| Admin     | `admin@edriveon.com`     | `demo1234`|
| Locador   | `locador@edriveon.com`   | `demo1234`|
| Locatário | `locatario@edriveon.com` | `demo1234`|

> O seed também cria 2 cadastros `PENDENTE` para você aprovar/negar em `/painel/admin`.

## Estrutura

```
src/
  app/
    (public)/        landing, /veiculos, /veiculos/[slug]   — sem login
    (auth)/          /login, /cadastro
    (painel)/        /painel/locador (CRUD de carros), /painel/locatario
    (reserva)/       /reserva/[slug] (stub protegido)
    api/auth/[...nextauth]/route.ts
  actions/           server actions (auth, vehicles) — validação + ownership
  components/        ui, layout, catalog, vehicle, fleet, forms
  lib/               prisma, auth (+ auth.config edge-safe), guards, validations, slug, catalog-query
  proxy.ts           proteção de rotas (Next 16: "middleware" → "proxy")
prisma/
  schema.prisma      User, Vehicle, enums
  seed.ts
```

## Segurança

- Senhas com `bcrypt` (cost 12); `passwordHash` nunca é exposto.
- Validação **Zod** em toda entrada (login, cadastro, veículos).
- Defesa em camadas: `proxy.ts` (1ª camada) + guards server-side (`requireUser`/`requireLocador`/`assertVehicleOwner`) dentro de cada server action.
- Headers de segurança em `next.config.ts`.

## Deploy

O app roda no **Vercel** ou no **Railway**, lendo o **mesmo Postgres do Railway**.

### Banco (Railway)

Provisione um Postgres no Railway e pegue duas URLs:

- `DATABASE_URL` → conexão **pooled** (PgBouncer): `...?pgbouncer=true&connection_limit=1&sslmode=require`
- `DIRECT_URL` → conexão **direta** (usada por `prisma migrate`)

### Vercel

1. Importe o repositório.
2. Variáveis de ambiente: `DATABASE_URL` (pooled, URL pública do Railway), `DIRECT_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST=true`, `AUTH_URL=https://<seu-dominio>`.
3. Build padrão (`npm run build`, que já roda `prisma generate`).
4. Migrations: rode `npx prisma migrate deploy` apontando para o Postgres do Railway (localmente/CI) a cada mudança de schema.

### Railway (rodar o app aqui também)

1. Novo serviço a partir do repo (Nixpacks detecta Node).
2. Variáveis: `DATABASE_URL=${{Postgres.DATABASE_URL}}` (interna), `DIRECT_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST=true`, `AUTH_URL`.
3. O `railway.json` já define build (`npm run build`) e start com `prisma migrate deploy` automático.

## Scripts

| Script             | Ação                                  |
| ------------------ | ------------------------------------- |
| `npm run dev`      | dev server                            |
| `npm run build`    | `prisma generate` + build de produção |
| `npm run start`    | servidor de produção                  |
| `npm run db:migrate` | `prisma migrate dev`                |
| `npm run db:deploy`  | `prisma migrate deploy` (produção)  |
| `npm run db:seed`    | popula dados demo                   |
| `npm run db:studio`  | Prisma Studio                       |
