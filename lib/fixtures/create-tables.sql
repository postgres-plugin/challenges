-- Create table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  org_id INTEGER REFERENCES organisations (id) NOT NULL,
  creator_id INTEGER REFERENCES people (id) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS tags_challenges (
  tags_id INTEGER,
  challenges_id INTEGER REFERENCES challenges (id) on delete cascade on update cascade
);

-- Create table
CREATE TABLE IF NOT EXISTS locations_challenges (
  locations_id INTEGER,
  challenges_id INTEGER REFERENCES challenges (id)
);

-- Create table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES people (id),
  comment TEXT NOT NULL,
  flagged BOOLEAN NOT NULL,
  author_flag INTEGER REFERENCES people (id),
  challenge_id INTEGER REFERENCES challenges (id),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  active BOOLEAN NOT NULL
);
