-- DESTRUCTIVE ROLLBACK. Never run automatically.
-- This file removes only the isolated blog_content schema and leaves public.* untouched.
-- Required preconditions:
--   1. Confirm the target database and environment.
--   2. Export and verify a backup of blog_content.
--   3. Stop Blog content writers and publication workers.
--   4. Record row counts and the approved change ticket.
--   5. Obtain explicit human approval.

BEGIN;

DO $$
BEGIN
  IF current_schema() = 'blog_content' THEN
    RAISE EXCEPTION 'Refusing rollback while blog_content is the active schema';
  END IF;
END;
$$;

DROP SCHEMA IF EXISTS blog_content CASCADE;

-- pg_trgm is intentionally retained because it may be shared by other systems.
-- pgcrypto is also retained and is already used by the database.

COMMIT;
