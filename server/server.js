const express = require('express')
const app = express()
const server=require('http').createServer(app)
const io=require('socket.io')(server)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const userRouter = require('./user')

io.on('connection',function(socket){
	socket.on('sendMsg',function(data){
		const {from,to,content}=data
		const chatId=[from,to].sort().join('_')
		console.log(data)
		Chat.create({from,to,content,chatId},function(err,doc){
			if(!err){
				console.log('====================================');
				console.log(1);
				console.log('====================================');
				io.emit('recvmsg',Object.assign({},doc._doc))
			}
		})
	})
})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



;