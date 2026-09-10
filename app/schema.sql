CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM (
            'applied', 'online_assessment', 'interview', 'offer', 'rejected'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    company VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    status application_status NOT NULL DEFAULT 'applied',
    applied_date TIMESTAMPTZ,
    location VARCHAR,
    platform VARCHAR,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

ALTER TABLE applications ADD COLUMN IF NOT EXISTS location VARCHAR;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS platform VARCHAR;