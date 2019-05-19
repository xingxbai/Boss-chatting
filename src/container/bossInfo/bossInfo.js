import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import axios from 'axios'
import { Grid,NavBar,InputItem,Button,TextareaItem,WhiteSpace } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:''
		}
    }
    onChange(key,val){
		this.setState({
			[key]:val
		})
    }
    update(){
        const{desc,title,avatar,money,company}={...this.state}
        axios.post('/user/update',{
            desc,title,avatar,money,company
        })
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                this.props.history.push('/login')
            }
        })
    }
    render(){
        const pathname=this.props.location.pathname;
        const redirectTo=this.props.redirectTo;
        return (
            <div>
            {pathname&&pathname!=redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark" >BOSS完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}></AvatarSelector>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.onChange('company',v)}>
                公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                招聘岗位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money',v)}>
                薪资
                </InputItem>
                <WhiteSpace/>
                <TextareaItem
                title="招聘要求"
                onChange={(v)=>this.onChange('desc',v)}
                value={this.state.desc}
                autoHeight
                labelNumber={5}
            />
                <WhiteSpace/>
                <Button type="primary" onClick={()=>{this.props.update(this.state)}}>提交</Button>
            </div>)
    }
}
export default BossInfo