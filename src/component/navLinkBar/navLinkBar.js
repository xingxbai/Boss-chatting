import React from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(state=>state)
class NavLinkBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide)
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                        title={v.text}
                        badge={v.path=='/msg'?this.props.chat.unread:0}
                        key={v.path}
                        icon={{uri:require('./img/'+ v.icon +'.png')}}
                        selectedIcon={{uri:require('./img/'+ v.icon +'-active'+'.png')}}
                        selected={v.path==this.props.pathname}
                        onPress={()=>this.props.history.push(v.path)}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}
export default NavLinkBar