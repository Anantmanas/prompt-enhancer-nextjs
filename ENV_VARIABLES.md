# Environment Variables

Create a `.env.local` file in the project root and add your real values there.

## Currently Used By Code

These variables are referenced by the current implementation.

```env
DATABASE_URL=""
NVIDIA_API_KEY=""
AI_PROVIDER_API_KEY=""
```

### `DATABASE_URL`

Used by: `prisma/schema.prisma`

Purpose: connects Prisma to your database.

For Supabase Postgres, use the database connection string from:

Supabase Dashboard -> Project Settings -> Database -> Connection string

Example format:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### `NVIDIA_API_KEY`

Used by: `app/api/enhance/route.ts`

Purpose: calls NVIDIA NIM chat completions with `nvidia/nemotron-3-super-120b-a12b` to generate the final enhanced prompt.

Keep this server-only. Do not prefix it with `NEXT_PUBLIC_`.

### `AI_PROVIDER_API_KEY`

Used by: `app/api/enhance/route.ts` as a fallback when `NVIDIA_API_KEY` is not set.

## Present In `.env.example`

These variables are already listed in `.env.example`, but most are not yet wired into runtime code.

```env
NEXT_PUBLIC_APP_URL=""
AI_PROVIDER_API_KEY=""
NVIDIA_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

### Recommended Values For Your Setup

Since you chose Supabase Auth and Vercel hosting, use:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-SUPABASE-ANON-KEY]"
AI_PROVIDER_API_KEY="[YOUR-AI-PROVIDER-KEY]"
NVIDIA_API_KEY="[YOUR-NVIDIA-NIM-KEY]"
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

For Vercel production, set:

```env
NEXT_PUBLIC_APP_URL="https://your-vercel-domain.vercel.app"
```

## Variables Needed Soon For Supabase Auth

When Supabase Auth is fully wired into the app, these should be used:

```env
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
```

### `SUPABASE_SERVICE_ROLE_KEY`

Only use this on the server. Never expose it in client components. It is useful for secure server-side operations such as admin database writes, credit updates, or protected webhooks.

## Variables Needed Soon For Real AI Enhancement

The app currently uses a local mock strategy engine. To connect real AI generation, use one of these approaches.

### Single Generic Provider Key

```env
AI_PROVIDER_API_KEY=""
```

### Recommended Provider-Specific Keys

```env
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_GENERATIVE_AI_API_KEY=""
```

Use these if you want separate integrations for ChatGPT, Claude, and Gemini.

## Variables Needed Later For Stripe

For the future credit/subscription system:

```env
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
```

## Minimal `.env.local` For Supabase + Vercel MVP

Use this as your starting file:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-SUPABASE-ANON-KEY]"
AI_PROVIDER_API_KEY="[YOUR-AI-PROVIDER-KEY]"
NVIDIA_API_KEY="[YOUR-NVIDIA-NIM-KEY]"
```

## Vercel Setup

Add the same variables in:

Vercel Dashboard -> Project -> Settings -> Environment Variables

Use separate values for:

- Development
- Preview
- Production

At minimum for production, set:

```env
DATABASE_URL=""
NEXT_PUBLIC_APP_URL=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
AI_PROVIDER_API_KEY=""
NVIDIA_API_KEY="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"
```
