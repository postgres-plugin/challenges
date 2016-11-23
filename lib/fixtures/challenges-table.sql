
-- Delete tables
DROP TABLE IF EXISTS challenges_tags CASCADE;
DROP TABLE IF EXISTS challenges CASCADE;

-- Create table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  org_id INTEGER REFERENCES organisations (id) NOT NULL,
  creator_id INTEGER REFERENCES people (id) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS tags_challenges (
  tags_id INTEGER REFERENCES tags (id),
  challenges_id INTEGER REFERENCES challenges (id)
);
