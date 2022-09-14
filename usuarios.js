const express = require('express');
const router = express.Router();
const mysql = require('../mysqul').pool;
const bcrypt = require('bcrypt');

router.post('/cadastro', (req, res, next) => {
    mysqul.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error})}
        bcrypt.hash(req.body.senha, 10, (errVcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt}) }
            conn.query(
        'INSERT INTO usuario (nome, idade, email, senha, sexo) VALUES (?,?,?,?,?)', 
        [req.body.nome, hash],
        (error, results) => {
            conn.release();
            if (err) { return res.status(500).send({ error: errBcrypt}) }
                response = {
                mensagem: 'Usuário criado com sucesso',
                usuarioCriado: {
                    id_usuario: results.insertId,
                    nome: req.body.nome,
                    idade: req.body.idade,
                    emai: req.body.email,
                    sexo: req.body.sexo
                }           
            }
            return res.status(201).send({
            })

            })
        });
    });
})

module.exports = router