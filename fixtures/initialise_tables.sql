-- Delete tables
DROP TABLE IF EXISTS tags_challenges CASCADE;
DROP TABLE IF EXISTS challenges CASCADE;
DROP TABLE IF EXISTS tags_organisations CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;
DROP TABLE IF EXISTS people CASCADE;

-- TAGS --
DROP TABLE IF EXISTS tags_categories;
DROP TABLE IF EXISTS tags cascade;
DROP TABLE IF EXISTS categories cascade;
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS tags_categories (
  id_tag INTEGER REFERENCES tags (id),
  id_category INTEGER REFERENCES categories (id),
  PRIMARY KEY (id_tag, id_category)
);
-- FINISH TAGS --

-- Create table
CREATE TABLE IF NOT EXISTS organisations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_url TEXT,
  mission_statement VARCHAR(200),
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS tags_organisations (
  orgs_id INTEGER REFERENCES organisations (id),
  tags_id INTEGER REFERENCES tags (id)
);

-- Create table
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('admin', 'primary', 'secondary')),
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(100),
  password VARCHAR(100) NOT NULL,
  org_id INTEGER REFERENCES organisations (id),
  job_title VARCHAR(80),
  last_login BIGINT,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  date BIGINT NOT NULL,
  org_id INTEGER REFERENCES organisations (id) NOT NULL,
  creator_id INTEGER REFERENCES people (id) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS tags_challenges (
  tags_id INTEGER REFERENCES tags (id),
  challenges_id INTEGER REFERENCES challenges (id)
);
