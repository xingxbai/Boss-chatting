import React from 'react'
import './logo.css'
import logo from './logo.png'
class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img style={{width:"256px",height:"256px",borderRadius:"50%"}}src={logo} alt=""/>
            </div>
        )
    }
}
export default Logo