import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import { Grid,NavBar,InputItem,Button,TextareaItem,WhiteSpace } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component{
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
    render(){
        const pathname=this.props.location.pathname;
        const redirectTo=this.props.redirectTo;
        return (
            <div>
            {pathname!=redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark" >牛人完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}></AvatarSelector>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
					求职岗位
                </InputItem>
                <WhiteSpace/>
                <TextareaItem
                title="个人见解"
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
export default GeniusInfo