# Recommended Supabase table schemas

-- documents
-- id (uuid) PK
-- user_id (uuid) FK -> auth.users
-- title text
-- storage_path text
-- text_preview text
-- created_at timestamptz default now()

-- summaries
-- id (uuid) PK
-- document_id uuid FK -> documents.id
-- summary text
-- created_at timestamptz default now()

-- flashcards
-- id (uuid) PK
-- document_id uuid FK -> documents.id
-- content text
-- created_at timestamptz default now()

-- study_sessions (optional): store user progress and spaced repetition metadata

Create these tables using Supabase SQL editor or migrations.
