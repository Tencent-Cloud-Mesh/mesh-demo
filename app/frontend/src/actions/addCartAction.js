import {addCartInfo,clearCart,fetchCartInfo} from '../webAPI.js'
import {addService,loadingShow,loadingHide,CART_SHOW} from './actions.js'

// 发送请求
export const REQUEST_ADDCART = "REQUEST_ADDCART"

export const requestCartInfo = {
  type:REQUEST_ADDCART,
}

//接受请求

export const RECEIVE_CARTINFO = "RECEIVE_CARTINFO"

export const receiveCartInfo = function(json){
  return {
    type:RECEIVE_CARTINFO,
    data:json,
    receivedAt:Date.now()
  }
}

export function modifyCartInfo(uid,pid,num){
  return function (dispatch){
    dispatch(requestCartInfo);
    dispatch(loadingShow())
    return addCartInfo(uid,pid,num).then(res=>
      {
        res.data.Info && dispatch(addService(res.data.Info))
        dispatch({
          type:CART_SHOW,
        })
        dispatch(receiveCartInfo(res));
        dispatch(loadingHide());
      },error=>{
        dispatch(loadingHide())
        console.log(error);
      })
  }
}

// 发送清理cart请求

export const REQUEST_CLEARCART = "REQUEST_CLEARCART"

export const requestClearCart = {
  type:REQUEST_CLEARCART
}

// 接受清理cart请求

export const RECEIVE_CLEARCART = "RECEIVE_CLEARCART"

export const receiveClearCart = function(json){
  return {
    type:RECEIVE_CLEARCART,
    data:json.data,
    receiveAt:Date.now()
  }
}

export function clearCartInfo(uid){
  return function (dispatch){
    dispatch(requestClearCart);
    return clearCart(uid).then(res=>{
      dispatch(receiveClearCart(res));
    },error=>{
      console.log(error)
    })
  }
}

// 获取cart信息

export const REQUEST_FETCHCART = "REQUEST_FETCHCART"

export const requestFetchCart = {
  type:REQUEST_FETCHCART
}

// 接受清理cart请求

export const RECEIVE_FETCHCART = "RECEIVE_FETCHCART"

export const receiveFetchCart = function(json){
  return {
    type:RECEIVE_FETCHCART,
    data:json.data,
    receiveAt:Date.now()
  }
}

export function fetchCart(uid){
  return function (dispatch){
    dispatch(requestFetchCart);
    dispatch(loadingShow());
    return fetchCartInfo(uid).then(res=>{
      dispatch(receiveFetchCart(res));
      dispatch(addService(res.data.Info))
      dispatch(loadingHide())
      dispatch({
        type:CART_SHOW,
      })
    },error=>{
      console.log(error)
      dispatch(loadingHide())
    })
  }
}
