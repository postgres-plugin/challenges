DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;
DROP TABLE IF EXISTS people CASCADE;


CREATE TABLE IF NOT EXISTS tags (id SERIAL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS organisations (id SERIAL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS people (id SERIAL PRIMARY KEY);
INSERT INTO organisations (id) VALUES (1);
INSERT INTO people (id) VALUES (1);