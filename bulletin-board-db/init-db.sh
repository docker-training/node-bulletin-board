#!/bin/bash
set -e            

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE Events(Id SERIAL, Title TEXT, Detail TEXT, Date DATE);
    INSERT INTO Events (Title, Detail, Date) VALUES
    ('Docker for Beginners', 'Introduction to Docker using Node.js', '2017-11-21'),
    ('Advanced Orchestration', 'Deep dive into Docker Swarm', '2017-12-25'),
    ('Docker on Windows', 'From 101 to production', '2018-01-01');
EOSQL