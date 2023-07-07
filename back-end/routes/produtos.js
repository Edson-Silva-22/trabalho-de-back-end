var express = require('express');
const db = require('../dbConfig')
var router = express.Router();


//Método view: lista todos os medicamentos
router.get('/', function view (req, res) {
  const query = 'select * from medicamentos order by nome'

  db.query(query, (err, results) => {
    if(err){
      console.error('Erro ao executar a busca: ' + err.stack);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }

    res.json(results)
  })
})

//Método show: lista um único medicamento
router.get('/:medicamento', function show (req, res) {
  const query = "select * from medicamentos where nome like ?;"

  db.query(query, [`%${req.params.medicamento}%`], (err, results) => {
    if(err){
      console.error('Erro ao executar a busca: ' + err.message);
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }

    if(!results.length){
      return res.status(500).json({ error: 'Esse produto não existe. Verifique os dados e tente novamente.' });
    }

    res.json(results)
  })
})


//Método store: cria um medicamento na tabela medicamentos
router.post('/', function store (req, res, next) {
  const query = `INSERT INTO medicamentos(nome, codigo, quantidade) VALUES ( ?, ?, ?);`

  db.query(query,[req.body.nome, req.body.codigo, req.body.quantidade], (err, results) => {
    if(err) {

      if(err.message == `Duplicate entry '${req.body.codigo}' for key 'medicamentos.codigo'`){
        return res.status(500).json({ error: 'Erro ao cadastrar. Esse código já está associado a outro produto.' });

      }

      if(err.message == `Duplicate entry '${req.body.nome}' for key 'medicamentos.nome'`){
        return res.status(500).json({ error: 'Erro ao cadastrar. Esse nome já está associado a outro produto.' });
      }

    }

    res.json(results)
  })
});

//Método update: atualiza um medicamento da tabela medicamentos
router.put('/:id', function update (req, res) {
  const query = `update medicamentos set nome = ?, codigo = ?, quantidade = ? where id = ?;`

  db.query(query, [req.body.nome, req.body.codigo, req.body.quantidade, req.params.id], (err, results) => {
    if(err) {

      if(err.message == `Duplicate entry '${req.body.codigo}' for key 'medicamentos.codigo'`){
        return res.status(500).json({ error: 'Erro ao atualizar. Esse código já está associado a outro produto.' });

      }

      if(err.message == `Duplicate entry '${req.body.nome}' for key 'medicamentos.nome'`){
        return res.status(500).json({ error: 'Erro ao atualizar. Esse nome já está associado a outro produto.' });
      }

    }

    res.json(results)
  })
})

//Método destroy: deleta um medicamento da tabela medicamentos
router.delete('/:codigo', function destroy (req, res, next) {
  const query = `delete from medicamentos where codigo = ?;`

  db.query(query, [req.params.codigo], (err, results) => {
    if(err) {
      console.error('Erro ao executar a remoção: ' + err.stack);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }

    res.json(results)
  })
});

module.exports = router;
