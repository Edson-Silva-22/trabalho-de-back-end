CREATE DATABASE IF NOT EXISTS estoque DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;
USE estoque;

CREATE TABLE IF NOT EXISTS estoquistas (
    id INT AUTO_INCREMENT,
    nome VARCHAR(225) NOT NULL,
    email VARCHAR(225) UNIQUE NOT NULL,
    senha VARCHAR(225) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    cidade VARCHAR(225),
    telefone VARCHAR(11),
    PRIMARY KEY(id)
) DEFAULT CHARSET = utf8mb4;


CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT,
    nome VARCHAR(225) UNIQUE NOT NULL,
    codigo INTEGER NOT NULL,
    quantidade INT NOT NULL,

    PRIMARY KEY(id)
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT,
    nome_med VARCHAR(225) UNIQUE NOT NULL,
    cod_med INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    data_da_operação DATETIME NOT NULL,
    PRIMARY KEY(id)
) DEFAULT CHARSET = utf8mb4;