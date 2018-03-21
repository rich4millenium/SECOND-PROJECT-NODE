CREATE DATABASE quiz_db;
USE quiz_db;


CREATE TABLE users 
(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    score int(11),
    primary key(id)
);
