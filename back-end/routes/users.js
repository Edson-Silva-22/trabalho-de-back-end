var express = require('express');
const db = require('../dbConfig')
var router = express.Router();

//Rota para lista todos medicamentos
router.get('/', (res, req) => {
  const query = 'select * from medicamentos order by nome'

  db.query(query, (err, results) => {
    if(err){
      console.error('Erro ao executar a inserção: ' + err.stack);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }

    req.json(results)
  })
})

/* Rota para cadastrar um medicamento */
router.post('/', (req, res, next) => {
  const query = `INSERT INTO medicamentos(nome, codigo, quantidade) VALUES ( ?, ?, ?);`

  db.query(query,[req.body.nome, req.body.codigo, req.body.quantidade], (err, results) => {
    if(err) {
      console.error('Erro ao executar a inserção: ' + err.stack);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }

    res.json(results)
  })
});

module.exports = router;
