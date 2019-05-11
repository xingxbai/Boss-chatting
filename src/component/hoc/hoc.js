import React from 'react'
export default function Hoc(Comp){
    return class WrappComp extends React.Component{
        constructor(props){
            super(props)
            this.state={}
            this.handleChange=this.handleChange.bind(this)
        }
        handleChange(type,value){
            console.log('====================================')
            console.log(type,value)
            console.log('====================================')
            this.setState({
                [type]:value
            })
        }
        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}