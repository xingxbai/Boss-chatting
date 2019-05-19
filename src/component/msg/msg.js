import React from 'react'
import { List, Badge} from 'antd-mobile';
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import axios from 'axios';
const Item = List.Item;
const Brief = Item.Brief;
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Msg extends React.Component{
    linkChat(id){
        this.props.history.push(`/chat/${id}`)
    }
    componentDidMount(){
        this.props.getMsgList()
    }
    render(){
        const userinfo=this.props.chatuser.userlist
        const msgGroup={}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatId]=msgGroup[v.chatId]||[]
            msgGroup[v.chatId].push(v)
        })
        const msgList=Object.values(msgGroup)
        const userid=this.props.user._id
        function getChatId(from,to){
            return [from,to].sort().join('_')
        }
        return (
            <div>
                <List>
                    {msgList.map(v=>{
                        const targetId=v[0].from==userid?v[0].to:v[0].from;
                        const userinfoinfo=userinfo.filter(val=>val._id==targetId)[0]||[]
                        const useravatar=userinfoinfo.avatar;
                        const username=userinfoinfo.user;
                        let showunreadArray;
                        if(!v.filter(valu=>valu.to!=targetId).length){
                            showunreadArray=[{content:""}];
                        }else{
                            showunreadArray=v.filter(valu=>valu.to!=targetId)
                        }
                        let lastItem=showunreadArray[(showunreadArray.length)-1].content||""
                        console.log(lastItem)
                        const unreadNum=v.filter(value=>value.to!=targetId&&!value.read).length
                        const showAboutMeChatList=v[0]||[]
                        const showAboutMeChatListBoolean=showAboutMeChatList.chatId==getChatId(targetId,userid)
                        return (useravatar&&showAboutMeChatListBoolean?<Item
                                click={()=>{}}
                                extra={unreadNum}
                                onClick={()=>{this.linkChat(userinfoinfo._id)}}
                                thumb={require('../img/'+ useravatar+'.png')}>
                                        <Brief>{username}</Brief>
                                        {lastItem}
                                    </Item>:null)
                        })}
                </List>
            </div>
        )
    }
}
export default Msg





// return(<Item
//     extra={<Badge text={unreadNum}></Badge>}
//     thumb={require(`../img/${userinfo.filter(va=>va._id==targetId)[0].avatar}.png`)}>
//     {v[v.length-1].content}
//     <Brief>{userinfo.filter(va=>va._id==targetId)[0].user}</Brief>
// </Item>)