import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';
import thunk from 'redux-thunk'
import './config'
import Login from './container/login/login'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import BossInfo from './container/bossInfo/bossInfo'
import Boss from './container/boss/boss'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import DashBoard from './component/dashBoard/dashBoard'
import reducers from './reducer'
const store=createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
function Genius(){
    return <h2>genius</h2>
}
function GeniusList(){
    return <h2>geniusList</h2>
}
function NotFound(){
    return <h2>404</h2>
}


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                    <Switch>
                        <Route path='/' exact component={Login}/>
                        <Route path='/bossinfo'  component={BossInfo}/>
                        <Route path='/geniusinfo'  component={GeniusInfo}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route component={DashBoard}/>
                    </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root'));
    // <AuthRoute/>