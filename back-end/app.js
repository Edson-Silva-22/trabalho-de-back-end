var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./dbConfig')
const cors = require( 'cors')
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');
var estoquistasRouter = require('./routes/estoquistas');
var vendasRouter = require('./routes/vendas');

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.stack);
        return;
      }
    
      console.log('Conexão bem-sucedida ao MySQL');
})

//usando o drive mongoose para se conectar com o mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/estoque").then(() => {
  console.log('Conexão bem-sucedida ao MongoDB');
}).catch (err => {
  console.log('Erro ao conectar ao MongoDB: ' + err.stack);
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/produtos', produtosRouter);
app.use('/estoquistas', estoquistasRouter);
app.use('/vendas', vendasRouter);

module.exports = app;
