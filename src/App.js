import React from 'react';
import { Button } from 'antd-mobile';
import {connect} from 'react-redux';
import {counter,addGun,removeGun,addGunAsync} from './index.redux'
import 'antd-mobile/dist/antd-mobile.css';

@connect(
  state=>({num:state}),
  {addGun,removeGun,addGunAsync}
)
class App extends React.Component{
  render(){
    return (
      <div>
        <h1>现在有武器{this.props.num}</h1>
        <Button onClick={this.props.addGun}>加武器</Button>
        <Button onClick={this.props.removeGun}>减武器</Button>
        <Button onClick={this.props.addGunAsync}>拖两天给</Button>
      </div>
    )
  }
}


export default App;
