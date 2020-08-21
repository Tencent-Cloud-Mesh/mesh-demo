import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers/state.js'

import thunkMiddleware from 'redux-thunk'
// import loggerMiddleware from 'redux-logger'

export let store = createStore(rootReducer,applyMiddleware(
  thunkMiddleware, // 可以dispatch函数
  // loggerMiddleware
));


