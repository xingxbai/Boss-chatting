import React from 'react'
import {InputItem,List,NavBar,Icon,Grid} from 'antd-mobile'
import {connect }from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import axios from 'axios';
import QueueAnim from 'rc-queue-anim'
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:""
        }
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        axios.get('/user/chatread',{
            params:{
                to:this.props.match.params.id
            }
        }).then(this.props.getMsgList())
    }
    handleChange(type,value){
        this.setState({
            [type]:value
        })
    }
    handleSubmit(){ 
        let self=this
        const data={
            from:this.props.user._id,
            to:this.props.match.params.id,
            content:this.state.text
        }
        this.props.sendMsg({...data})
        self.setState({
            text:""
        })
    }
    render(){
        const Item=List.Item
        const myself=this.props.user._id
        const navbar=this.props.match.params.id
        const chatmsg=this.props.chat.chatmsg.filter(v=>
            v.chatId==[navbar,this.props.user._id].sort().join('_')
        )
        return (
            
            <div id='chat-page'>
                <NavBar icon={<Icon type="left" />} onLeftClick={() =>this.props.history.go(-1)}>{this.props.chatuser.userlist.filter(v=>v._id==navbar)[0].user}</NavBar>
                <QueueAnim type='left' deplay='60'>
                {chatmsg.map((v)=>{
                    if(v.from!=myself){
                        return (
                            <List key={v._id}>
                                <Item
                                    key={v.chatId}
                                    thumb={require(`../img/${this.props.chatuser.userlist.filter(v=>v._id==navbar)[0].avatar}.png`)}>{v.content}</Item>
                            </List>)
                    }else{
                        return (this.props.user.avatar?
                            <List  key={v._id}>
                            <Item   key={v.chatId}
                                    className='chat-me'
                                    extra={<img src={require(`../img/${this.props.user.avatar}.png`)}/>}>{v.content}</Item>
                            </List>:null)
                    }
                })}</QueueAnim>
                <div style={{position:"relative",marginTop:45,bottom:0,width:"100%"}}>
                    <InputItem extra={<span onClick={()=>{this.handleSubmit()}}>发送</span>}
                                value={this.state.text}
                                onChange={(v)=>{this.handleChange('text',v)}}></InputItem>
                </div>
            </div>
        )
    }
}
export default Chat