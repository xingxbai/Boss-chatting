import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import { WingBlank, WhiteSpace,InputItem ,Button,Radio } from 'antd-mobile';
import Logo from "../../component/logo/logo";
const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {register}
)

class Register extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'genius' // 或者boss
		}

		this.handleRegister = this.handleRegister.bind(this)
	}
    handleChange(type,value){
        this.setState({
            [type]:value
        })
    }
    handleRegister(){
        this.props.register(this.state)

    }
    render(){
        return (
            <div >
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                {this.props.msg?<p style={{color:"red",marginLeft:"21px"}}>{this.props.msg}</p>:null}
                <WingBlank>
                    <InputItem onChange={(v)=>{this.handleChange("user",v)}}>用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type="password"
                                onChange={(v)=>{this.handleChange("pwd",v)}}>密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type="password"
                                onChange={(v)=>{this.handleChange("repeatpwd",v)}}>重复密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem checked={this.state.type=='genius'}
                                onChange={()=>{this.handleChange("type","genius")}}>牛人</RadioItem>
                    <RadioItem checked={this.state.type=='boss'}
                                onChange={()=>{this.handleChange("type","boss")}}>BOSS</RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>this.handleRegister()}>注册</Button>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                </WingBlank>
            </div>
        )
    }
}
export default Register