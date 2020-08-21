import {fetchCart} from './addCartAction.js'
export const ADD_CART = 'ADD_CART'
export const INCRE_NUM = 'INCRE_NUM'
export const DECRE_NUM = 'DECRE_NUM'
export const LOGIN_HIDDEN = 'LOGIN_HIDDEN'
export const LOGIN_SHOW = 'LOGIN_SHOW'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CART_HIDDEN  = 'CART_HIDDEN'
export const CART_SHOW = 'CART_SHOW'
export const GET_USERINFO = 'GET_USERINFO'
export const GET_PRODUCTLIST = 'GET_PRODUCTLIST'
export const ADD_SERVICE = 'ADD_SERVICE'
export const DELETE_SERVICE = 'DELETE_SERVICE'
export const LOADING_SHOW = "LOADING_SHOW"
export const LOADING_HIDE = "LOADING_HIDE"

export function addCart(pid){
  return {
    type:ADD_CART,
    pid
  }
}

export function increNum(pid){
  return {
    type:INCRE_NUM,
    pid
  }
}

export function decreNum(pid){
  return {
    type:DECRE_NUM,
    pid
  }
}

export const loginHidden = ()=>{
  return {
    type:LOGIN_HIDDEN
  }
}

export const loginShow = ()=>{
  return {
    type:LOGIN_SHOW
  }
}

export const loginFailed = (info)=>{
  return {
    type:LOGIN_FAILED,
    Info:info
  }
}

export const cartHidden = (info)=>{
  return function(dispatch){
    dispatch({
      type:CART_HIDDEN
    })
    dispatch(deleteService(info))
  }
}

export const cartShow = (uid)=>{
  return function(dispatch){
    if(uid){
      dispatch(fetchCart(uid))
    }else{
      dispatch(
        {
          type:LOGIN_SHOW,
        }
      )
    }
  }
}


export const getUserInfo = (uid)=>{
  return {
    type:GET_USERINFO,
    uid
  }
}

// 增加service 

export const addService = (service)=>{
  return {
    type:ADD_SERVICE,
    service
  }
}

export const deleteService = (service)=>{
  return {
    type:DELETE_SERVICE,
    service
  }
}

// loading show

export const loadingShow = ()=>{
  return {
    type:LOADING_SHOW
  }
}

export const loadingHide = ()=>{
  return {
    type:LOADING_HIDE,
  }
}