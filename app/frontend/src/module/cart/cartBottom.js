import * as React from 'react'

import {fetchOrderInfo} from '../../actions/fetchOrderActions.js'
import { store } from '../../store/store.js';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    cartInfo: state.cartInfo.cartList,
    productList: state.productsInfo.productList.product,
    userInfo: state.userInfo.userInfo,
    orderInfo: state.orderInfo
  }
}

class CartBottom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checkCartEmpty:false,
    }
  }
  checkout(){
    if(this.props.cartInfo.Products.filter(r=>parseInt(r.Num) !== 0).length){
      const cartInfo = this.props.cartInfo.Products.map(item=>{
        const productInfo = this.props.productList.find(p=>p.pid === item.Pid);
        return Object.assign({},{Pid:item.Pid,Num:item.Num,Price:productInfo.price});
      })
      store.dispatch(fetchOrderInfo(cartInfo,this.props.userInfo.UserID,this.props.cartInfo.Info))
      // store.dispatch(cartHidden(this.props.cartInfo.Info))
    }else{
      this.setState({
        checkCartEmpty:true,
      })
    }


  }
  render(){
    const totalPrice = this.props.cartInfo.Products.reduce((prev,next)=>{
      const productInfo = this.props.productList.find(p=>p.pid === next.Pid)
      return prev + next.Num * productInfo.price;
    },0)
    
    return (
      <div className='cart-bottom'>
        <div className='total-price'>
          {'SubTotal: $ ' + totalPrice.toFixed(2)}
        </div>
          <button className='checkout-btn' onClick={this.checkout.bind(this)}>
            CHECKOUT
          </button>
        {this.state.checkCartEmpty ? <div style={{color:'red'}}>Your cart is empty.</div>:null}
        {this.props.orderInfo.didInvalidate ? <div style={{color:'red'}}>Time-out. The server didn't respond in time.</div>:null }
      </div>

    )
  }
}

export default connect(mapStateToProps)(CartBottom)