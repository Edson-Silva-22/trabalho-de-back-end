const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    //Pegando o token do cabeçalho da requisição
    const authHeader = req.headers.tk
    //Fazendo verificações manuais para poupar processamento.
    //Verificando token
    if(!authHeader){
        return res.status(401).json({ error: 'Token não informado'})
    }

    //Separando a parte Bearer do token
    const partes = authHeader.split(' ')

    //Verificando se existe as duas partes 
    if(!partes.length === 2){
        return res.status(401).json({error: 'Erro de token'})
    }

    //Atribuindo cada parte a uma constante
    const [ bearer, token ] = partes

    //verificando se a palavra Bearer está escrito na constante
    //
    if(!/^Bearer$/i.test(bearer)){
        return res.status(401).json({error: 'Formato de token errado'})
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(401).json({error: 'Token inválido'})
        }

        else{
            req.id = decoded.id
            return next()
        }
    })
}