var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./dbConfig')
const cors = require( 'cors')

var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.stack);
        return;
      }
    
      console.log('Conexão bem-sucedida ao MySQL');
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


module.exports = app;
