import {getUserInfo} from '../webAPI.js'
import {loginHidden,addService,loginFailed,loadingHide,loadingShow} from './actions.js'

export const REQUEST_USERINFO = 'REQUEST_USERINFO'

export const requestUserInfo = (uid)=>{
  return {
    type : REQUEST_USERINFO,
    uid : uid,
  }
}

// 接受请求

export const RECEIVE_USERINFO = 'RECEIVE_USERINFO'

export const receiveUserInfo = function(json){
  return {
    type:RECEIVE_USERINFO,
    data:json,
    receivedAt:Date.now()
  }
}

export function fetchUserInfo(uid){
  return function(dispatch){
    dispatch(requestUserInfo(uid));
    dispatch(loadingShow());
    return getUserInfo(uid).then(res=>{
      if(res.data.Name){
        dispatch(receiveUserInfo(res));
        dispatch(addService(res.data.Info))
        dispatch(loginHidden())
        dispatch(loadingHide());
        const storage = window.sessionStorage;
        storage.setItem('UserInfo',JSON.stringify(res));
      }else{
        dispatch(addService(res.data.Info));
        dispatch(loginFailed(res.data.Info));
        dispatch(loadingHide())
      }

    },error=>{
      console.log(error);
    })
  }
}
