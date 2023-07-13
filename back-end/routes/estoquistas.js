//importando o model da tabela estoquistas que foi criado
const estoquistas = require('../models/estoquistas')
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

function generateToken(params = {}){
    //O jwt recebe como primeiro parâmetro o que diferencia os dados um do outro como o id
    //Segundo parâmetro é um hash que diferencia de tokens de outras aplicações que no caso é um hash md5 que esta no arquivo auth da pasta config
    //O ultimo parâmetro é o tempo de validade desse toquem em segundos
    return jwt.sign({ params }, authConfig.secret, {
        //O token vai ser válido por 1 dia
        expiresIn: 86400
    })
}

router.get('/', async function store(req, res, next){

    try{
        const email = req.body.email
        const senha = req.body.senha
        //Verificando se o login do estoquista já existe usando o método findOne
        const estoquista = await estoquistas.findOne({ email }).select('+senha')
        console.log(estoquista);
        if(estoquista){
            //comparando se senha que foi digitada e a senha salva no banco usando são diferentes usando o padrão de criptografia do bcrypt
            if(!await bcrypt.compare(senha, estoquista.senha)){
                return res.status(400).json({
                    message: 'Senha inválida.'
                })
            }
            //apagando a senha para não expor na requisição
            estoquista.senha = undefined 

            return res.status(200).json({
                estoquista, 
                //Chamando função de gerar token
                token: generateToken({ id: estoquista.id })
            })
        }

        else{
            return res.status(400).json({
                message: "Dados inválidos. Verifique e tente novamente"
            })
        }
    } 
    catch (error){
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível realizar o cadastro"
        })
    }
    
})

//store: método para cadastrar um estoquista
router.post('/', async function store(req, res, next){

    try{
        const email = req.body.email
        //Verificando se o estoquista já existe usando o método findOne
        if(await estoquistas.findOne({ email })){
            return res.status(400).json({
                message: "Usuário já está cadastrado"
            })
        }

        else{
            //Usando o método create para criar o estoquista
            const estoquista = await estoquistas.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                cpf: req.body.cpf,
                cidade: req.body.cidade,
                telefone: req.body.telefone
            })
            estoquista.senha = undefined

            return res.status(200).json({
                estoquista,
                //Chamando função de gerar token
                token: generateToken({ id: estoquista.id })
            })
        }
    } 
    catch (error){
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível realizar o login"
        })
    }
    
})

router.put('/:id', async function update(req, res){
    try{
        const findUser = await estoquistas.findOne({_id: req.params.id})

        const cryptSenha = await bcrypt.hash(req.body.senha, 12)

        if(findUser){
            await estoquistas.updateOne({_id: req.params.id}, {
                nome: req.body.nome,
                email: req.body.email,
                senha: cryptSenha,
                cpf: req.body.cpf,
                cidade: req.body.cidade,
                telefone: req.body.telefone
            }).then(async () => {
                return res.status(200).json({
                    message: "Perfil atualizado com sucesso" ,
                    response: await estoquistas.findOne({_id: req.params.id})
                })
            }).catch(error => {
                return res.status(500).json({
                    error: "Devido ao erro interno não foi possível atualizar o perfil"
                })
            })
        }
        else{
            return res.status(404).json({
                message: "Usuário não encontrado"
            }) 
        }
    }
    catch (error){
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível atualizar o perfil"
        })
    }
})

module.exports = router;
