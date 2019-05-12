const express = require('express')
const app = express()
const server=require('http').createServer(app)
const io=require('socket.io')(server)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

io.on('connection',function(socket){
	socket.on('sendMsg',function(data){
	console.log(data)
	socket.emit('receMsg',data)})
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



