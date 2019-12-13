/* importar configurações do servidor*/
const app = require('./config/server.js')

const PORT = process.env.PORT || 80

/* Define porta de escuta do servidor*/
var server = app.listen(PORT, ()=>{
    console.log('Server is runing')
})

/*Require socket.io passando a var server como parametro*/
var io =require('socket.io').listen(server)

/* Variavel Global setada no objeto express*/
app.set('io', io);

/* Criar uma conexão por web socket*/
io.on('connection', (socket)=>{
    console.log('usuario conectado')

    /*Escuta o evento disconnect e envia uma mensagem ao prompt*/
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado')
    })

    socket.on('msgParaServidor', (data)=>{
        socket.emit('msgCliente', {apelido: data.apelido, mensagem: data.mensagem})

        socket.broadcast.emit('msgCliente', {apelido: data.apelido, mensagem: data.mensagem})

        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){

            socket.emit('participantesParaCliente', {apelido: data.apelido})

            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido})
        }
    })
})