# ARLERT — AI‑Powered Study Assistant

ARLERT is a Next.js (App Router) starter that helps you turn PDFs into study material. Upload a document, extract text server‑side, and use OpenAI to generate concise summaries and flashcards. Supabase powers storage and persistence.

This repository is a production‑ready foundation: clear folder structure, typed APIs, Tailwind styling, and environment‑based configuration. Extend it into a full study app with auth, progress tracking, and more.

## Features

- PDF upload with server‑side parsing via `pdf-parse`
- OpenAI‑powered summary and flashcard generation
- Supabase storage for uploaded files and Postgres tables for summaries/flashcards
- Next.js App Router pages: Home, Dashboard, Upload, Document view
- Tailwind CSS with a small ARLERT color theme

## Tech stack

- Next.js 14 (App Router), React 18, TypeScript
- Supabase (Auth, Storage, Postgres via `@supabase/supabase-js`)
- OpenAI (`openai` SDK)
- Tailwind CSS, PostCSS, Autoprefixer
- File handling: `formidable`

## Project structure

```
src/
	app/
		(App Router pages)
		page.tsx                # Landing
		dashboard/page.tsx      # Demo dashboard listing sample docs
		documents/[id]/page.tsx # Document detail placeholder
		upload/page.tsx         # Upload screen (uses UploadForm)
	components/
		ChatBox.tsx
		DocumentCard.tsx
		Header.tsx
		UploadForm.tsx
	lib/
		serverUtils.ts          # PDF extraction + OpenAI helpers
		supabaseClient.ts       # Supabase browser/server client
	pages/api/
		upload.ts               # Multipart upload + PDF text extraction
		generate.ts             # Calls OpenAI to generate summary/flashcards

public/
next.config.js
tailwind.config.js
postcss.config.js
tsconfig.json
SUPABASE_SCHEMA.md
```

## Prerequisites

- Node.js 18+ and npm
- Supabase project (URL, keys, and a public storage bucket named `documents` by default)
- OpenAI account and API key

## Quick start

1) Create and populate your environment file

Copy `.env.example` to `.env.local` and fill in values:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
OPENAI_API_KEY=your-openai-api-key
SUPABASE_BUCKET=documents
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

2) Install dependencies

```powershell
npm install
```

3) Create the database tables

Use the schemas in `SUPABASE_SCHEMA.md` (documents, summaries, flashcards). You can paste them into the Supabase SQL editor.

4) Run the dev server

```powershell
npm run dev
```

Visit http://localhost:3000

## How it works

- Upload flow (`/api/upload`):
	- Parses multipart form data with `formidable`.
	- Extracts PDF text with `pdf-parse`.
	- Uploads the raw file to Supabase Storage (bucket `documents`).
	- Inserts a `documents` row with `title`, `storage_path`, and a `text_preview` snippet.

- Generation flow (`/api/generate`):
	- Accepts `{ documentId?, text? }` via POST.
	- If `text` is not provided, loads `text_preview` for `documentId`.
	- Calls OpenAI (model `gpt-4o-mini`) via helpers in `src/lib/serverUtils.ts` to create a summary and flashcards.
	- Persists results in `summaries` and `flashcards` tables.

UI pages are wired as a simple demo; replace mock data with Supabase queries as you expand.

## Environment variables

Defined in `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (safe to expose in browser)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key (safe to expose in browser)
- `SUPABASE_SERVICE_ROLE_KEY` — Server‑only key for privileged actions (never expose to client)
- `OPENAI_API_KEY` — Server‑only OpenAI key
- `SUPABASE_BUCKET` — Storage bucket name (default: `documents`)
- `NEXT_PUBLIC_APP_URL` — Base app URL for links/callbacks

In development, use PowerShell to set a var for the current session if needed:

```powershell
$env:OPENAI_API_KEY = "sk-..."
```

## NPM scripts

- `npm run dev` — Start Next.js in development
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint

## API reference

### POST /api/upload

Multipart form upload. Field: `file` (PDF).

Response:

```json
{ "id": "<document-id>", "message": "ok" }
```

Errors: `400` no file, `405` wrong method, `500` server error.

Notes:
- Requires Supabase Storage bucket. Ensure your service role key is available server‑side.

### POST /api/generate

Body JSON:

```json
{ "documentId": "<uuid>", "text": "optional raw text" }
```

Behavior:
- If `text` missing and `documentId` provided, the API loads the `text_preview` for that document.
- Calls OpenAI to generate summary and flashcards.
- Persists into `summaries` and `flashcards` tables.

Response:

```json
{ "summary": "...", "flashcards": "..." }
```

Errors: `400` missing text, `405` wrong method, `500` server error.

## Supabase schema

See `SUPABASE_SCHEMA.md` for suggested SQL table definitions:

- `documents(id, user_id, title, storage_path, text_preview, created_at)`
- `summaries(id, document_id, summary, created_at)`
- `flashcards(id, document_id, content, created_at)`

## Security

- Never expose `SUPABASE_SERVICE_ROLE_KEY` or `OPENAI_API_KEY` to the browser. Keep them in server-only runtime.
- API routes under `src/pages/api` run server-side; validate inputs and sanitize file names/paths.
- Consider RLS (Row Level Security) in Supabase and user‑scoped operations for production.

## Deployment

- Vercel: Add all environment variables in Project Settings → Environment Variables. Deploy from the `main` branch.
- Other Node hosts: Build with `npm run build` and start with `npm start`. Ensure environment variables are configured.

## Troubleshooting

- OpenAI errors like "401 Unauthorized": Check `OPENAI_API_KEY` and usage limits; restart the dev server after changing env.
- Upload fails with 413/large file: configure size limits in your host or switch to client‑direct upload to Supabase.
- Supabase insert/storage errors: verify bucket name (`SUPABASE_BUCKET`) and service role key (server-only) permissions.
- Type errors or build issues: run `npm run lint` and ensure Node 18+.

## Roadmap

- Full Supabase auth and protected routes
- Chat with document context and embeddings
- Spaced repetition and study sessions
- Better UI states and error handling

---

MIT License © 2025

