import React from 'react'
import {InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket=io('ws://localhost:9093')
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            chatContent:""
        }
    }
    componentDidMount(){
        socket.on('receMsg',function(data){
            console.log('====================================');
            console.log(data);
            console.log('====================================');
        })
    }
    handleChange(type,value){
        this.setState({
            [type]:value
        })
    }
    handleSubmit(){
        socket.emit('sendMsg',{text:this.state["chatContent"]})
        this.setState({
            chatContent:""
        })
    }
    render(){
        return (
            <div style={{position:"fixed",bottom:0,width:"100%"}}>
                <InputItem extra={<span onClick={()=>{this.handleSubmit()}}>发送</span>}
                            value={this.state.chatContent}
                            onChange={(v)=>{this.handleChange('chatContent',v)}}></InputItem>
            </div>
        )
    }
}
export default Chat