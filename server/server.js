import express from 'express'
const app = express()
const path=require('path')
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
		Chat.create({from,to,content,chatId},function(err,doc){
			if(!err){
				io.emit('recvmsg',Object.assign({},doc._doc))
			}
		})
	})
})
app.use(cookieParser())


app.use(function(req,res,next){
	if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
		return next()
	}else{
		return res.sendFile(path.resolve('build/index.html'))
	}
})
app.use(express.static(path.resolve('build')))
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
})