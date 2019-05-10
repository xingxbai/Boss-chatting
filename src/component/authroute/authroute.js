import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'
@withRouter
@connect(
    state=>state.user,
    {loadData}
)
class AuthRoute extends React.Component{
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
                // this.props.loadData(res.data.data)
                // this.props.history.push(`/${res.data.data.type}`)
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}
export default AuthRoute