import * as React from 'react'
//import productImg from '../../static/img/product01.png'

import {connect} from 'react-redux'
import { store } from '../../store/store'

import {modifyCartInfo} from '../../actions/addCartAction.js'
import img from '../../static/img/product.svg'

const mapStateToProps = (state,) => {
  return {
    cartList: state.cartInfo.cartList.Products,
    productList: state.productsInfo.productList.product,
    userInfo:state.userInfo.userInfo
  }
}


class CartList extends React.Component{
  modifyCartInfo(uid,pid,num){
    store.dispatch(modifyCartInfo(uid,pid,num))
  }
 
  render(){
    const {userInfo,cartList,productList} = this.props;
    const shopList = cartList.filter(r=>parseInt(r.Num) !==0).sort((a,b)=>{return parseInt(a.Pid)-parseInt(b.Pid)}).map((item,index)=>{
      const productInfo = productList.filter(r=>r.pid === item.Pid)[0];
      return (
        <div className='shopping-cart-list-item' key={item.Pid}>
          <div className='product-img'>
            <img src={productInfo.pid === 1?img : productInfo.url} alt=''/>
          </div>

          <div className='product-info'>
            <div className='name'>{productInfo.name}</div>
            <div className='price'>{'$ ' + productInfo.price.toFixed(2)}</div>
            <div className='account'>
              <span className='dec qtybtn' onClick={parseInt(item.Num)>0?()=>{this.modifyCartInfo(userInfo.UserID,item.Pid,parseInt(item.Num)-1)}:null}>-</span>
              <input type='text' value={item.Num} readOnly/>
              <span className='inc qtybtn' onClick={()=>{this.modifyCartInfo(userInfo.UserID,item.Pid,parseInt(item.Num)+1)}}>+</span>
              {item.Num > item.Stock? <span className='storeWarn'> storeWarn </span>:null}
            </div>
            
          </div>
        </div>
      )
    })
    return (
      <div className='shopping-cart-list'>
        {shopList}
      </div>
    )
}
}

export default connect(mapStateToProps)(CartList)