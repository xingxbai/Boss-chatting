import React from 'react'
import { WingBlank, WhiteSpace,InputItem ,Button } from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import Logo from "../../component/logo/logo";
import Hoc from '../../component/hoc/hoc'
@connect(
    state=>state.user,
    {login}
)
@Hoc
class Login extends React.Component{
    // handleChange(type,value){
    //     this.setState({
    //         [type]:value
    //     })
    // }
    goRegister(){
        this.props.history.push('/register')
    }
    render(){
        return (
            <div >
            {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                {this.props.msg?<p style={{color:"red",marginLeft:"21px"}}>{this.props.msg}</p>:null}
                    <InputItem onChange={(v)=>{this.props.handleChange("user",v)}}>用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type="password"
                                onChange={(v)=>{this.props.handleChange("pwd",v)}}>密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>{this.props.login(this.props.state)}}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={()=>{this.goRegister()}}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login