# Challenges

Pre-requisites:
- Create a 'tags' table by entering following into postgres client:
```
  CREATE TABLE tags (id SERIAL PRIMARY KEY);
```

A plugin which:
- creates a 'Challenges' table
- _addChallenge_ function to add challenge to pre-existing challenge table
- _getChallenge_ function to get challenge to pre-existing challenge table
