import axios from 'axios'
import io from 'socket.io-client'
const socket=io('ws://localhost:9093')
const MSG_LIST='MSG_LIST'
const MSG_RECV='MSG_RECV'
const MSG_READ='MSG_READ'

const initState={
    chatmsg:[],
    read:0
}
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read&&v.to==action.userid).length}
        case MSG_RECV:
            const n=action.payload.to==action.userid?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
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
export function getMsgList(){
    return (dispatch,getState)=>{
        const userid=getState().user._id
        axios.get('/user/getchatlist')
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(msgList(res.data.data,userid))
            }
        })
    }
}
export function sendMsg({from,to,content}){
    return dispatch=>{
        socket.emit('sendMsg',{
            from,to,content
        })
    }
}

export function recvMsg(){
    return (dispatch,getState)=>{
        const userid=getState().user._id
        socket.on('recvmsg',function(data){
            dispatch(recvmsg(data,userid))
        })
    }
}