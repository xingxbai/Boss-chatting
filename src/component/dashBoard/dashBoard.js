import React from 'react';
import {NavBar} from 'antd-mobile'
import {Switch,Route,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import NavLinkBar from '../navLinkBar/navLinkBar'
import Boss from '../boss/boss'
import Msg from '../msg/msg'
import Genius from '../boss/boss'
import Me from '../me/me'
import {getMsgList,sendMsg,recvMsg,firstUnread} from '../../redux/chat.redux'

@withRouter
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,firstUnread}
)
class DashBoard extends React.Component{
    componentDidMount() {
        let targetId=""
        // this.props.firstUnread()
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg(targetId)
        }
        // this.props.getMsgList()
    }
    render(){
        const user=this.props.user
        const pathname=this.props.location.pathname
        const navList=[
            {
                path:"/boss",
                text:"牛人",
                icon:"boss",
                title:"牛人列表",
                component:Boss,
                hide:user.type=="genius"
            },
            {
                path:"/genius",
                text:"BOSS",
                icon:"job",
                title:"BOSS列表",
                component:Genius,
                hide:user.type=="boss"
            },
            {
                path:"/msg",
                text:"消息",
                icon:"msg",
                title:"消息列表",
                component:Msg
            },
            {
                path:"/me",
                text:"我",
                icon:"user",
                title:"个人中心",
                component:Me
            }
        ]
        return (
            <div>
                <div style={{position:"fixed",top:0,width:"100%"}}>
                    <NavBar mode="dark">
                        {navList.filter(v=>v.path==pathname)[0].title}
                    </NavBar>
                </div>
                <div style={{marginTop:"45px"}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>
                <div style={{position:"fixed",bottom:0,width:"100%"}}>
                    <NavLinkBar data={navList} pathname={pathname}/>
                </div>
            </div>
        )
    }
}
export default DashBoard