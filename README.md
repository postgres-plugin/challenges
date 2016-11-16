# Challenges

Pre-requisites:
- Create a 'tags', 'organisations' and 'people' table by entering following
into your postgres client:
```
  CREATE TABLE tags (id SERIAL PRIMARY KEY);
  CREATE TABLE organisations (id SERIAL PRIMARY KEY);
  CREATE TABLE people (id SERIAL PRIMARY KEY);
```
- To get the tests to pass, populate the tables with the following:
```
  INSERT INTO organisations (id) VALUES (1);
  INSERT INTO people (id) VALUES (1);
```

A plugin which:
- creates a 'Challenges' table
- _addChallenge_ function to add challenge to pre-existing challenge table
- _getChallenge_ function to get challenge to pre-existing challenge table
