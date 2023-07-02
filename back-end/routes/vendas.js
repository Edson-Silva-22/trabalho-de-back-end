var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//Método store: cria um medicamento na tabela medicamentos
router.post('/', function store (req, res, next) {
    const query = `INSERT INTO vendas(nome_med, cod_med, quantidade, data_da_operação ) VALUES ( ?, ?, ?, now);`
  
    db.query(query,[req.body.nome, req.body.codigo, req.body.quantidade], (err, results) => {
      if(err) {
  
        // if(err.message == `Duplicate entry '${req.body.codigo}' for key 'vendas.cod_med'`){
        //   return res.status(500).json({ error: 'Erro ao cadastrar. Esse código já está associado a outro produto.' });
  
        // }
  
        // if(err.message == `Duplicate entry '${req.body.nome}' for key 'vendas.nome_med'`){
        //   return res.status(500).json({ error: 'Erro ao cadastrar. Esse nome já está associado a outro produto.' });
        // }

        console.log(err)
  
      }
  
      res.json(results)
    })
  });

module.exports = router;
