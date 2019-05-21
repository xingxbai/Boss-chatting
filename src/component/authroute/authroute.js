import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import{Redirect} from 'react-router-dom'
import {Toast} from 'antd-mobile'
import {loadData} from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'
@withRouter
@connect(
    state=>state.user,  
    {loadData}
)
class AuthRoute extends React.Component{
    constructor(props){
        super(props);
            this.state={
                error:false
            }
    }
    componentDidMount(){
        const publicPath=['/login','register']
        const pathname=this.props.location.pathname
        if(publicPath.indexOf(pathname)>=0){
            return null
        }
        axios.get('/user/info')
        .then(res=>{
            if(res.status==200){
                if(res.data.code==0){
                this.props.loadData(res.data.data)
                this.props.history.push(`/${res.data.data.type}`)
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    componentDidCatch(err,info){
        if(err){
            this.setState({error:true})
        }
    }
    render(){
        return this.state.error?<Redirect to='/msg'></Redirect>:null
    }
}
export default AuthRoute