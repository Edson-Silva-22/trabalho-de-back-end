const mongoose = require('mongoose')
//biblioteca responsável por criptografar senhas
const bcrypt = require('bcryptjs')

//Criando modelo que representa a tabela estoquistas
const estoquistas = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 

    senha: {
        type: String,
        required: true,
        select: false
    },

    cpf: {
        type: String,
        required: true,
        unique: true,
    },

    cidade: {
        type: String,
        required: true
    },

    telefone: {
        type: Number,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Antes de inserir um estoquista a senha é criptografada
estoquistas.pre('save', async function(next){
    const hasth = await bcrypt.hash(this.senha, 12)
    this.senha = hasth
    next()
})

//Exportando o model estoquista para ser usado no arquivo estoquistas.js na pasta de rotas
module.exports = mongoose.model('estoquistas', estoquistas)