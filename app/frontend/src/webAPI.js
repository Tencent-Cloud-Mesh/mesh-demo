import axios from 'axios'

axios.defaults.withCredentials = true;

// get productInfo
export async function getProductList(){
  const productList = await axios.get('/product');
  return productList.data;
}

// get userInfo

export async function getUserInfo(uid){
  const userInfo = await axios.request({
    url:'/user',
    method:'GET',
    headers:{
      'UserID':uid,
    },
  })
  return userInfo;
}

// get cartInfo

export async function addCartInfo(uid,pid,num){
  const cartInfo = await axios.request({
    url:'/cart',
    method:'GET',
    headers:{
      UserID:uid,
      Pid:pid,
      Num:num
    },
  })

  return cartInfo;
}


// get orderInfo 

export async function getOrderInfo(cartInfo){
  const checkOutInfo = await axios.request({
    url:'/order',
    method:'POST',
    data:{
      Products:cartInfo,
    },
    withCredentials:true,
  })
  return checkOutInfo;
}

// clear cart

export async function clearCart(uid){
  const clearInfo = await axios.request({
    url:'/clear',
    method:'GET',
    headers:{
      UserID:uid
    }
  })
  return clearInfo
}

// get cartInfo 

export async function fetchCartInfo(uid){
  const cartInfo = await axios.request({
    url:'/list',
    method:'GET',
    headers:{
      UserID:uid
    }
  })
  return cartInfo;
}