import React from 'react'
import {Redirect} from 'react-router-dom'
import {Result,List,Button,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {logout} from '../../redux/user.redux'
const Item = List.Item;
const Brief = Item.Brief;
@connect(
    state=>state,
    {logout}
)
class Me extends React.Component{
    componentDidMount(){}
    logout(){
        Cookies.remove('userid');
        this.props.logout()
        this.props.history.push('/login')
    }
    render(){
        return (this.props.user.avatar?
            <div>
                <Result
                img={<img src={require('../img/'+this.props.user.avatar +'.png')} style={{width:"50px"}}/>}
                title={this.props.user.user}
                message={this.props.company?<div>{this.props.company}</div>:null}
                />
                <List renderHeader={() =><div style={{textAlign:"center"}}>简介</div>}>
                <Item style={{textAlign:"center"}}>{this.props.user.title}
                    {this.props.user.desc?this.props.user.desc.split('\n').map(v=>(
                        <Brief style={{textAlign:"center"}} key={v}>{v}</Brief>
                    )):null}
                    {this.props.user.money?<Brief style={{textAlign:"center"}}>薪资：{this.props.user.money}</Brief>:null}
                </Item>
                <WhiteSpace></WhiteSpace>
                <Button onClick={()=>{this.logout()}}>退出登录</Button>
                </List>
            </div>:null
        )
    }
}
export default Me