import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import {counter} from './index.redux'
import {Provider} from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css';
import thunk from 'redux-thunk'
import App from './App';
const store=createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDOM.render((
    <Provider store={store}><App /></Provider>), document.getElementById('root'));
// import {createStore} from 'redux'
// function counter(state=0,action){
//     switch(action.type){
//         case '加机关枪':
//             return state+1
//         case '减机关枪':
//             return state-1
//         default:
//             return state=10
//     }
// }
// const store=createStore(counter)
// function listener(){
//     const current=store.getState();
//     console.log(`现在有机关枪${current}`)
// }
// store.subscribe(listener)
// console.log(store.getState())
// store.dispatch({type:"加机关枪"})
// console.log(store.getState())
// store.dispatch({type:"加机关枪"})
// console.log(store.getState())
// store.dispatch({type:"减机关枪"})
// console.log(store.getState())

