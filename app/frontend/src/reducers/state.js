import {
  LOGIN_HIDDEN,
  LOGIN_SHOW,
  CART_HIDDEN,
  CART_SHOW,
  ADD_SERVICE,
  DELETE_SERVICE,
  LOGIN_FAILED,
  LOADING_HIDE,
  LOADING_SHOW
} from '../actions/actions.js'

import {RECEIVE_PRODUCTINFO,REQUEST_PRODUCTINFO} from '../actions/fetchProductsInfo.js'
import {RECEIVE_USERINFO,REQUEST_USERINFO} from '../actions/fetchUserInfo.js'
import {REQUEST_ADDCART,RECEIVE_CARTINFO,REQUEST_CLEARCART,RECEIVE_CLEARCART,REQUEST_FETCHCART,RECEIVE_FETCHCART} from '../actions/addCartAction.js'
import {REQUEST_ORDERINFO,RECEIVE_ORDERINFO,RECEIVE_ERRORINFO, RESET_ORDERINFO} from '../actions/fetchOrderActions.js'
import {combineReducers} from 'redux'



export default combineReducers({
  isLoginShow,
  isCartShow,
  isLoadingShow,
  productsInfo,
  userInfo,
  cartInfo,
  orderInfo,
  serviceInfo,
})

function orderInfo(state = {
  isFetching:false,
  didInvalidate:false,
  orderInfo:{
    Subtotal:0,
    Shoppint:0,
    ToTal:0,
    Success:false,
    Info:[]
  },
  loggin:false 
},action){
  if(action.type === REQUEST_ORDERINFO){
    return Object.assign({},state,{
      isFetching:true,
      didInvalidate:false,
    })
  }else if(action.type === RECEIVE_ORDERINFO){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:false,
      orderInfo:action.data
    })
  }else if(action.type === RECEIVE_ERRORINFO){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:true,
    })
  }else if(action.type === RESET_ORDERINFO){
    return Object.assign({},state,{
      didInvalidate:false
    })
  }else{
    return state;
  }
}

function cartInfo(state = {
  isFetching:false,
  didInvalidate:false,
  cartList:{
    Info:{},
    Products:[]
  }
},action){
  if(action.type === REQUEST_ADDCART){
    return Object.assign({},state,{
      isFetching:true,
      didInvalidate:false,
    })
  }else if(action.type === RECEIVE_CARTINFO){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:false,
      cartList:action.data.data,
    })
  }else if(action.type === REQUEST_FETCHCART){
    return Object.assign({},state,{
      isFetching:true,
      didInvalidate:false,
    })
  }else if(action.type === RECEIVE_FETCHCART){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:false,
      cartList:action.data
    })
  }else if(action.type === REQUEST_CLEARCART){
    return Object.assign({},state,{
      isFetching:true,
      didInvalidate:false,
    })
  }else if(action.type === RECEIVE_CLEARCART){
    if(action.data.Success === 'true'){
      return Object.assign({},state,{
        isFetching:false,
        didInvalidate:false,
        cartList:Object.assign({},state.cartList,{
          Products:[],
          Info:[]
        })
      })
    }else{
      return state;
    }
  }else{
    return state;
  }
}

function productsInfo(state = {
  isFetching:false,
  didInvalidate:false,
  productList:[]
},action){
  if(action.type === REQUEST_PRODUCTINFO){
    return Object.assign({},state,{
      isFetching:true,
      didInvalidate:false,
    })
  }else if(action.type === RECEIVE_PRODUCTINFO){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:false,
      productList:action.data,
    })
  }else{
    return state;
  }
}

function isLoginShow(state=false,action){
  if(action.type ===  LOGIN_HIDDEN){
    document.body.style.overflow="visible";
    return false;
  }else if(action.type === LOGIN_SHOW){
    document.body.style.overflow="hidden";
    return true;
  }else{
    return state;
  }
}

function isCartShow(state=false,action){
  if(action.type === CART_SHOW){
    document.body.style.overflow="hidden";
    return true;
  }else if(action.type === CART_HIDDEN){
    document.body.style.overflow="visible";
    return false;
  }else{
    return state;
  }
}

function isLoadingShow(state=false,action){
  if(action.type === LOADING_SHOW){
    return true;
  }else if(action.type === LOADING_HIDE){
    return false;
  }else{
    return state;
  }
}

function userInfo(state = {
  idFetching:false,
  didInvalidate:false,
  userInfo:{
    Info:{},
    Name:'visitor',
    UserID:"",
  },
  login:true,
},action){
  if(action.type === REQUEST_USERINFO){
    return Object.assign({},state,{
      isFetching:true,
      didInvalidate:false,
    })
  }else if(action.type === RECEIVE_USERINFO){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:false,
      userInfo:action.data.data,
      login:true
    })
  }else if(action.type === LOGIN_FAILED){
    return Object.assign({},state,{
      isFetching:false,
      didInvalidate:false,
      login:false,
      userInfo:Object.assign({},state.userInfo,{
        Info:action.Info,
      })
    })
  }else{
    return state;
  }
}

function serviceInfo(state=[],action){
  let arr = [];
  if(action.type === ADD_SERVICE){
    Array.isArray(action.service) && action.service.forEach(s=>{
      let service = state.find(v=>v.Service.split('-')[0] === s.Service.split('-')[0])
      if(!service){
        arr.push(s);
      }else{
        service.Service = s.Service;
        service.Pod = s.Pod;
        service.Region = s.Region;
      }
    })
    return [...state,...arr];
  }else if(action.type === DELETE_SERVICE){
    let newState = [...state];
    Array.isArray(action.service) && action.service.forEach(s=>{
      newState = newState.filter(ns=>ns.Service !== s.Service);
    })
    return [...newState];
  }else{
    return state;
  }
}
