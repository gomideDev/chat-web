/* Importação do framework express*/
const express = require('express')

/* Importação do modulo consign*/
const consign = require('consign')

/* Importação do modulo body-parser*/
const bodyParser = require('body-parser')

/* Importação do modulo express validator*/
const expressValidator = require('express-validator')

/*Inicia o express*/
const app = express()

/*Configura Ejs*/

app.set('view engine', 'ejs')
app.set('views', './app/views')

/*Configura midlleware express.static*/
app.use(express.static('./app/public'))

/*Configura o midleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}))

/*Configura midleware express.validator*/
app.use(expressValidator())

/*Configura o modulo consign - autoload*/
consign()
    .include('app/routes')
    .then('app/controllers')
    .into(app)

/*Exporta o modulo express*/
module.exports = app;