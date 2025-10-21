# Database Documentation

This document provides an overview of the database schema and setup for the ARLERT project. It includes details about the tables, their relationships, and how to configure the database for development and production environments.

## Database Tables

### 1. `documents`
Stores metadata about uploaded documents.

```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    text_preview TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

- **`id`**: Unique identifier for the document.
- **`user_id`**: References the user who uploaded the document.
- **`title`**: Title of the document.
- **`storage_path`**: Path to the document in Supabase storage.
- **`text_preview`**: A snippet of the document's text.
- **`created_at`**: Timestamp of when the document was created.

### 2. `summaries`
Stores AI-generated summaries for documents.

```sql
CREATE TABLE summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents (id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

- **`id`**: Unique identifier for the summary.
- **`document_id`**: References the associated document.
- **`summary`**: The generated summary text.
- **`created_at`**: Timestamp of when the summary was created.

### 3. `flashcards`
Stores AI-generated flashcards in JSON format.

```sql
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents (id) ON DELETE CASCADE,
    content JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

- **`id`**: Unique identifier for the flashcard.
- **`document_id`**: References the associated document.
- **`content`**: JSON object containing the flashcard data.
- **`created_at`**: Timestamp of when the flashcard was created.

## Setting Up the Database

1. **Create the Tables**:
   - Use the SQL commands provided above to create the tables in your Supabase project.
   - Open the Supabase SQL editor and paste the commands.

2. **Environment Variables**:
   - Ensure the following environment variables are set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_BUCKET=documents
```

3. **Storage Bucket**:
   - Create a public storage bucket in Supabase named `documents` (or update the `SUPABASE_BUCKET` variable if using a different name).

## Relationships

- `documents` → `summaries`: One-to-One (a document has one summary).
- `documents` → `flashcards`: One-to-Many (a document can have multiple flashcards).

## Notes for Developers

- **Supabase Auth**: The `user_id` field in the `documents` table references the `auth.users` table provided by Supabase.
- **JSONB in Flashcards**: The `content` field in the `flashcards` table uses the `JSONB` type to store structured data.
- **Timestamps**: All tables include a `created_at` field for tracking record creation times.

## Troubleshooting

- **Missing Tables**: Ensure the SQL commands were executed successfully in the Supabase SQL editor.
- **Permission Errors**: Check that your Supabase service role key has the necessary permissions to insert and query data.
- **Storage Issues**: Verify that the `SUPABASE_BUCKET` exists and is publicly accessible.

## Future Enhancements

- Add a `study_sessions` table to track user progress and spaced repetition metadata.
- Implement Row Level Security (RLS) policies for better data protection.

---

For any questions or issues, please contact the project maintainer.