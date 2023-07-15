var express = require('express');
const db = require('../dbConfig')
var router = express.Router();

//Método view: lista todas as vendas realizadas ou um conjunto de vendas por data
router.get('/:data?', function view(req, res, next) {
  try {
    if(req.params.data){
      const query = `SELECT id, nome_med,cod_med,quantidade, DATE_FORMAT(data_da_operação, '%d-%m-%Y') FROM vendas WHERE data_da_operação LIKE ? ORDER BY data_da_operação DESC;`
      db.query(query, [`${req.params.data}%`], (err, results) => {
        if(err){
          console.log(err);
        }
        
        else{
          return res.status(200).json({
            results
          })
        }
      })
    }

    else{

      const query = `SELECT id, nome_med,cod_med,quantidade, DATE_FORMAT(data_da_operação, '%d-%m-%Y Hora: %H:%i') as data_da_operação FROM vendas ORDER BY data_da_operação DESC`
      db.query(query, (err, results) => {
        if(err){
          console.log(err);
        }
  
        else{
          return res.status(200).json({
            results
          })
        }
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: "Devido ao erro interno não foi possível registrar a venda"
    })
  }
});

//Método show: lista uma venda específica
router.get('/show/:nome_med', function show(req, res, next) {
  try {
    const query = `SELECT * FROM vendas WHERE nome_med like ?`
    db.query(query, [`%${req.params.nome_med}%`], (err, results) => {
      if(err){
        console.log(err);
      }

      else{
        return res.status(200).json({
          results
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: "Devido ao erro interno não foi possível registrar a venda"
    })
  }
});


//Método store: registra uma venda realizada na tabela vendas
router.post('/', function store (req, res, next) {
  try {
    db.query(`SELECT quantidade FROM medicamentos WHERE codigo = ?`, [req.body.cod_med], (err, results) => {
      if(err){
        console.log(err);
      }
      else{
        console.log(results[0].quantidade);
        if(req.body.quantidade > results[0].quantidade){
          return res.status(400).json({
            error: "Quantidade de produto indisponível"
          })
          
        }

        else{
          const query = `INSERT INTO vendas(nome_med, cod_med, quantidade, data_da_operação ) VALUES ( ?, ?, ?, now());`
      
          db.query(query,[req.body.nome_med, req.body.cod_med, req.body.quantidade], (err, results) => {
            if(err) {
      
              console.log(err)
      
            }
      
            else{
              
              db.query(`UPDATE medicamentos SET quantidade = quantidade - ? WHERE codigo = ?;`, [req.body.quantidade, req.body.cod_med], (err, results) => {
                if(err){
                  console.log(err);
                }
      
                else{
      
                  db.query(`SELECT * FROM vendas WHERE cod_med = ${req.body.cod_med} AND quantidade = ${req.body.quantidade}`, (err, results) => {
          
                    return res.status(200).json({
                      results,
                      message: "Venda realizada"
                    })
                  })
                }
              })
      
            }
        
          })

        }
      }
    })

  } 
  catch (error) {
    return res.status(500).json({
      error: "Devido ao erro interno não foi possível registrar a venda"
    })
  }
});



router.delete('/:id', function destroy(req, res, next) {
  try {
    const query = `DELETE FROM vendas WHERE id = ?;`
    db.query(query, [req.params.id], (err, results) => {
      if(err){
        console.log(err);
      }

      else{
        return res.status(200).json({
          message: 'Registro de venda excluído com sucesso'
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: "Devido ao erro interno não foi possível registrar a venda"
    })
  }
});

module.exports = router;
