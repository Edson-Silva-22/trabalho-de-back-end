//importando o model da tabela estoquistas que foi criado
const estoquistas = require('../models/estoquistas')
var express = require('express');
var router = express.Router();

//store: método para cadastrar um estoquista
router.post('/', async function store(req, res, next){

    try{
        const email = req.body.email
        //Verificando se o estoquista já existe usando o método findOne
        if(await estoquistas.findOne({ email })){
            return res.status(400).json({
                error: "Usuário já está cadastrado"
            })
        }

        else{
            //Usando o método create para criar o estoquista
            const estoquista = estoquistas.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                cpf: req.body.cpf,
                cidade: req.body.cidade,
                telefone: req.body.telefone
            })

            return res.json(estoquista)
        }
    } 
    catch (error){
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível realizar o cadastro"
        })
    }
    
})

module.exports = router;
