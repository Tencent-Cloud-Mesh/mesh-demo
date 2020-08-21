import {getProductList} from '../webAPI.js'
import {addService,loadingShow,loadingHide} from '../actions/actions.js'
// 发送请求
export const REQUEST_PRODUCTINFO = "REQUEST_PRODUCTINFO"

export const requestProduct = {
  type:REQUEST_PRODUCTINFO,
}

//接受请求

export const RECEIVE_PRODUCTINFO = "RECEIVE_PRODUCTINFO"

export const receiveProduct = function(json){
  return {
    type:RECEIVE_PRODUCTINFO,
    data:json,
    receivedAt:Date.now()
  }
}

export function fetchProductInfo(){
  return function (dispatch){
    dispatch(requestProduct);
    dispatch(loadingShow())
    return getProductList().then(res=>
      {
        dispatch(receiveProduct(res));
        dispatch(addService(res.info));
        dispatch(loadingHide())
      },error=>{
        console.log(error);
        dispatch(loadingHide())
      })
  }
}