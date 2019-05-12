const express = require('express');
// const utils = require('utility')
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')
Router.get('/info',function(req,res){
	const userid=req.cookies.userid;
	User.findOne({_id:userid},{"pwd":0},function(err,doc){
		if(!doc){
			return res.json({code:1,msg:"没有找到cookie"})
		}
		return res.json({code:0,data:doc})
	})
})
Router.get('/remove',function(req,res){
    User.remove({},function(err,doc){})
    return res.send({code:0,msg:"用户信息验证成功"})
})
Router.post('/register', function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user},function(err,doc){
		if (doc) {
			return res.json({code:1,msg:'用户名重复'})
		}
		const userModel = new User({user,type,pwd})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
	})
})
Router.post('/login',function(req,res){
	const {user,pwd}=req.body
	User.findOne({user,pwd},{"pwd":0},function(err,doc){
		if(doc){
			const {user,type,_id,avatar}=doc
			res.cookie('userid',_id)
			return res.json({code:0,data:doc})
		}
		return res.json({code:1,msg:'用户名或者密码错误'})
	})
})
Router.post('/update',function(req,res){
	const userid=req.cookies.userid;
	if(!userid){
		return res.json({code:1,msg:"没有cookie"})
	}
	const body=req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		if(err){
			return res.json({code:1,msg:"修改出错"})
		}
		User.findOne({_id:userid},{"pwd":0},function(err,doc){
			if(err){
				return res.json({code:1,msg:"修改出错"})
			}
			return res.json({code:0,data:doc})
		})
	})
})
Router.get('/list',function(req,res){
	const {userType}=req.query
	User.find({type:userType},{"pwd":0},function(err,doc){
		if(err){
			return res.json({code:1,msg:"查询出错"})
		}
		return res.json({code:0,data:doc})
	})
})
module.exports=Router;