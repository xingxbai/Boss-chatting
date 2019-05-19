
import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const LOGOUT_SUCESS = 'LOGOUT_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const UPDATE_SUCCESS='UPDATE_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:"",redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case UPDATE_SUCCESS:
            return {...state,...action.payload,msg:"",redirectTo:getRedirectPath(action.payload),isAuth:true,avatar:action.avatar}
        case LOAD_DATA:
            return {...state,...action.payload,msg:"",redirectTo:getRedirectPath(action.payload),isAuth:true,avatar:action.avatar}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOGIN_SUCESS:
            return {...state,...action.payload,msg:"",avatar:action.payload.avatar,redirectTo:getRedirectPath(action.payload)}
        case LOGOUT_SUCESS:
            return {...initState}
        default:
            return state
    }
}
function errMsg(msg){
    return {type:ERROR_MSG,msg}
}
function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}
function updateSuccess(data){
    return {type:UPDATE_SUCCESS,payload:data}
}
function LoginSuccess(data){
    return {type:LOGIN_SUCESS,payload:data}
}
function LogoutSuccess(){
    
    return {type:LOGOUT_SUCESS}
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!repeatpwd){
        return errMsg("用户名密码必须输入")
    }
    if(pwd!=repeatpwd){
        return errMsg("密码和确认密码不一致")
    }
    return dispatch=>{
        axios.post('/user/register',{
            user,pwd,type
        })
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errMsg("用户名密码必须输入")
    }
    return dispatch=>{
        axios.post('/user/login',{
            user,pwd
        })
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                const data=res.data.data
                dispatch(LoginSuccess(data))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}
export function logout(){
    // Cookies.remove('userid');
    return LogoutSuccess()
}
export function update({desc,title,avatar,money="",company=""}){
    return dispatch=>{
        axios.post('/user/update',{
            desc,title,avatar,money,company
        })
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(updateSuccess({...res.data.data}))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}
export function loadData(data){
    return {type:LOAD_DATA,payload:data}
}