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


router.get('/:id', async function view(req, res, next){
    try {
        const _id = req.params.id
        const estoquista = await estoquistas.findOne({ _id })
        if(estoquista){
            estoquista.senha = undefined
            return res.status(200).json({
                estoquista,
            })
        }
        else{
            return res.status(401).json({
                error: "Dados inválidos. Verifique e tente novamente"
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível realizar o login"
        })
    }
})


router.post('/login', async function view(req, res, next){

    try{
        const email = req.body.email
        const senha = req.body.senha
        //Verificando se o login do estoquista já existe usando o método findOne
        const estoquista = await estoquistas.findOne({ email }).select('+senha')
        if(estoquista){
            //comparando se senha que foi digitada e a senha salva no banco usando são diferentes usando o padrão de criptografia do bcrypt
            if(!await bcrypt.compare(senha, estoquista.senha)){
                return res.status(401).json({
                    error: 'Senha inválida.'
                })
            }
            //apagando a senha para não expor na requisição
            estoquista.senha = undefined 

            return res.status(200).json({
                estoquista, 
                message: 'Login realizado com sucesso',
                //Chamando função de gerar token
                token: generateToken({ id: estoquista.id })
            })
        }

        else{
            return res.status(401).json({
                error: "Dados inválidos. Verifique e tente novamente"
            })
        }
    } 
    catch (error){
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível realizar o login"
        })
    }
    
})

//store: método para cadastrar um estoquista
router.post('/', async function store(req, res, next){

    try{
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        //Verificando se o estoquista já existe usando o método findOne
        if(await estoquistas.findOne({ email }).where({ _id:{$ne: req.params.id} })){
            return res.status(400).json({
                error: "Este email já esta sendo utilizado"
            })
        }

        if(await estoquistas.findOne({ cpf }).where({ _id:{$ne: req.params.id} })){
            return res.status(400).json({
                error: "Este cpf já foi cadastrado no sistema"
            })
        }

        if(await estoquistas.findOne({ telefone }).where({ _id:{$ne: req.params.id} })){
            return res.status(400).json({
                error: "Este telefone já esta vinculado a outro usuário"
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
            error: "Devido ao erro interno não foi possível realizar o cadastro"
        })
    }
    
})

router.put('/:id', async function update(req, res){
    try{
        const findUser = await estoquistas.findOne({_id: req.params.id})
        console.log(req.params.id);
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone

        const cryptSenha = await bcrypt.hash(req.body.senha, 12)

        if(findUser){
            if(await estoquistas.findOne({ email }).where({ _id:{$ne: req.params.id} })){
                return res.status(400).json({
                    error: "Este email já esta sendo utilizado"
                })
            }
    
            if(await estoquistas.findOne({ cpf }).where({ _id:{$ne: req.params.id} })){
                return res.status(400).json({
                    error: "Este cpf já foi cadastrado no sistema"
                })
            }
    
            if(await estoquistas.findOne({ telefone }).where({ _id:{$ne: req.params.id} })){
                return res.status(400).json({
                    error: "Este telefone já esta vinculado a outro usuário"
                })
            }

            else{

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
        }
        else{
            return res.status(404).json({
                message: "Usuário não encontrado"
            }) 
        }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            error: "Devido ao erro interno não foi possível atualizar o perfil"
        })
    }
})

module.exports = router;
