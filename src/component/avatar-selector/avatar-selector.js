import React from 'react'
import { Grid,List } from 'antd-mobile';
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            avatar:""
        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',')
												.map(v=>({
													icon:require(`../img/${v}.png`),
													text:v
												}))
        return (
            <List renderHeader={()=>(
                this.state.avatar?<div>
                    你选择的头像:
                    <img style={{width:20}} src={this.state.avatar} alt=""/>
                    </div>:<span>请选择头像:</span>)
            }>
                <Grid data={avatarList} columnNum="5"
                        activeStyle={false} 
                        onClick={(avatar)=>{
                            this.setState({avatar:avatar.icon})
                            this.props.selectAvatar(avatar.text)
                        }}/>

            </List>)
    }
}
export default GeniusInfo