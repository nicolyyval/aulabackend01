-- criação do banco
CREATE DATABASE aulaback;

-- acessando o banco
\c aulaback

-- crianso a tabela
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    datanascimento DATE NOT NULL,
    idade INT NOT NULL,
    signo VARCHAR(100) NOT NULL
);

-- inserindo dados
INSERT INTO usuarios (nome, sobrenome, email, datanascimento ) VALUES ('Nicoly', 'Val', 'nicolyval98@gmail.com', '2007-07-02');