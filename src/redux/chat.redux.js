import axios from 'axios'
import io from 'socket.io-client'
const socket=io('ws://localhost:9093')
const MSG_LIST='MSG_LIST'
const MSG_RECV='MSG_RECV'
const MSG_READ='MSG_READ'

const initState={
    chatmsg:[],
    unread:0
}
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read&&v.to==action.userid).length}
        case MSG_RECV:
            let n=action.payload.to==action.userid?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            return {...state,unread:action.payload}
        default:
            return state
    }
}

function msgList(msgs,userid){
    return{ type:MSG_LIST,payload:msgs,userid}
}
function recvmsg(msgs,userid){
    return {type:MSG_RECV,payload:msgs,userid}
}
function unread(msgs){
    return {type:MSG_READ,payload:msgs}
}
export function getMsgList(){
    return (dispatch,getState)=>{
        let userid=getState().user._id?getState().user._id:window.localStorage.getItem("user_id")
        axios.get('/user/getchatlist')
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(msgList(res.data.data,userid))
            }
        })
    }
}
export function sendMsg({from,to,content,url}){
    return dispatch=>{
        socket.emit('sendMsg',{
            from,to,content,url
        })
    }
}

export function recvMsg(targetId){
    return (dispatch,getState)=>{
        let userid=getState().user._id?getState().user._id:window.localStorage.getItem("user_id")
        socket.on('recvmsg',function(data){
            if(targetId){
                // axios.get('/user/chattingRead',{
                //     params:{
                //         targetId
                //     }
                // })
            }
            dispatch(recvmsg(data,userid))
        })
    }
}
export function firstUnread(){
    return (dispatch,getState)=>{
        axios.get('/user/getchatlist')
        .then(res=>{
            let userid=getState().user._id?getState().user._id:window.localStorage.getItem("user_id")
            if(res.status==200&&res.data.code==0){
                let count=res.data.data.filter(v=>!v.read&&v.to==userid).length
                dispatch(unread(count))
            }
        })
    }
}