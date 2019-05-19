import React from 'react'
import {Card} from 'antd-mobile'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        const pathname=this.props.location.pathname=='/boss'?'genius':'boss'
        this.props.getUserList(pathname)
    }
    linkChat(id){
        this.props.history.push(`/chat/${id}`)
    }
    render(){
        return (
            <div>
                {this.props.userlist.map(v=>(
                    v.avatar?
                    <Card  key={v.user} onClick={()=>{this.linkChat(v._id)}}>
                        <Card.Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                        />
                        <Card.Body>
                        <div>
                            {v.desc.split('\n').map(value=>(<div key={value}>{value}</div>))}
                        </div>
                        </Card.Body>
                    </Card>:null
                ))}
            </div>
            )
    }
}
export default Boss