CREATE DATABASE fetcher;

USE fetcher;

CREATE TABLE repos(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  repo_user VARCHAR(50),
  repo_name VARCHAR(50),
  html_url VARCHAR(50),
  clone_url VARCHAR(50),
  forks INT,
  watchers INT
);

