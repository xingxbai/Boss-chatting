import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';
import thunk from 'redux-thunk'
import './config'
import Login from './container/login/login'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import BossInfo from './container/bossInfo/bossInfo'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import reducers from './reducer'
const store=createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
function Boss(){
    return <h2>boss</h2>
}
function Genius(){
    return <h2>genius</h2>
}


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                    <AuthRoute/>
                    <Route path='/' exact component={Login}/>
                    <Route path='/boss' exact component={Boss}/>
                    <Route path='/bossinfo' exact component={BossInfo}/>
                    <Route path='/genius' exact component={Genius}/>
                    <Route path='/geniusinfo' exact component={GeniusInfo}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
            </div>
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root'));
