import {getOrderInfo} from '../webAPI.js'
import {clearCartInfo} from './addCartAction.js'
import {hashHistory} from 'react-router'
import {loadingHide,loadingShow, cartHidden} from './actions.js'

// 发送请求
export const REQUEST_ORDERINFO = 'REQUEST_ORDERINFO'

export const requestOrderInfo = (cartInfo)=>{
  return {
    type : REQUEST_ORDERINFO,
    cartInfo
  }
}


// 接受请求

export const RECEIVE_ORDERINFO = 'RECEIVE_ORDERINFO'

export const receiveOrderInfo = function(json){
  return {
    type:RECEIVE_ORDERINFO,
    data:json,
    receivedAt:Date.now()
  }
}

// 请求错误
export const RECEIVE_ERRORINFO = 'RECEIVE_ERRORINFO'

export const receiveErrorInfo = function(error){
  return {
    type:RECEIVE_ERRORINFO,
    data:error,
    receiveAt:Date.now()
  }
}

// 重置orderInfo

export const RESET_ORDERINFO = 'RESET_ORDERINFO'

export const resetOrderInfo = function(){
  return {
    type:RESET_ORDERINFO
  }
}

export function fetchOrderInfo(cartInfo,uid,cartService){
  return function(dispatch){
    dispatch(requestOrderInfo(cartInfo));
    dispatch(loadingShow())
    return getOrderInfo(cartInfo).then(res=>{
      dispatch(receiveOrderInfo(res.data));
      dispatch(loadingHide());
      dispatch(cartHidden(cartService))
      res.data.Success && dispatch(clearCartInfo(uid));
      hashHistory.push('/checkout');
    },error=>{
      dispatch(receiveErrorInfo(error));
      dispatch(loadingHide())
    })
  }
}
