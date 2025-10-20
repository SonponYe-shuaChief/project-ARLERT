# ARLERT — AI-Powered Study Assistant (Starter)

This repository is a starter scaffold for ARLERT, an AI-powered study assistant built with Next.js (App Router), Supabase, and OpenAI.

Features included in this scaffold:
- Supabase auth (email/password) wiring
- File upload endpoint + PDF text extraction (server-side)
- OpenAI integration for summarization & quiz/flashcard generation
- Basic pages: Login/Landing, Dashboard, Upload, Document view
- Tailwind CSS with a small ARLERT theme

See the `src/` folder for app code and `pages/api/` for API routes.

Quick start
1. Copy `.env.example` to `.env.local` and fill in keys.
2. npm install
3. npm run dev

TODO: This is a starter scaffold. You still need to create Supabase tables, configure storage buckets, and provide API keys.

Notes & next steps
- Run `npm install` to install dependencies (React, Next, Supabase, pdf-parse, OpenAI client, Tailwind).
- Create the Supabase tables described in `SUPABASE_SCHEMA.md`.
- Fill `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `OPENAI_API_KEY`.
- The API routes in `src/pages/api/` are server-side and expect Node environment variables to be available. The upload route uses `formidable` to parse multipart uploads.

Security
- Keep your `SUPABASE_SERVICE_ROLE_KEY` out of client code. Use server-only environment variables.

Planned enhancements
- Add full Supabase auth flow and protected pages
- Add background job to generate embeddings and chunked summaries
- Improve UI and error handling

