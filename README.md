# PromptEnhance

A modern AI Prompt Enhancer SaaS built with Next.js and TypeScript.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- NVIDIA-hosted Nemotron 3 Super 120B A12B prompt generation
- Prisma schema for future Postgres/Supabase persistence

## Core Routes

- `/` landing page
- `/dashboard` prompt enhancer
- `/history` saved prompts
- `/pricing` token and plan model
- `/settings` user defaults
- `/docs` prompting guides
- `/auth/sign-in` and `/auth/sign-up`
- `/share/[id]` public prompt sharing

## API Routes

- `POST /api/enhance`
- `GET /api/prompts`
- `POST /api/prompts`
- `GET /api/usage`
- `POST /api/share`

## Future Integration Path

1. Add Supabase or another Postgres provider.
2. Generate Prisma client and run migrations.
3. Replace mock API responses with database reads/writes.
4. Add provider-specific routing if you want ChatGPT, Claude, or Gemini to use separate APIs.
5. Connect Stripe webhooks for credit purchases and subscriptions.
