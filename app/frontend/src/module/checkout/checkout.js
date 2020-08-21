import * as React from 'react'
import './checkout.css'
import { connect } from 'react-redux'
import { store } from '../../store/store'
import {addService,deleteService} from '../../actions/actions.js'


const mapStateToProps = (state, ownProps) => {
  return {
    productList: state.productsInfo.productList.product,
    orderInfo: state.orderInfo.orderInfo,
    // userInfo: state.userInfo && state.userInfo.userInfo
  } 
}

class CheckOut extends React.Component{
  componentDidMount(){
    store.dispatch(addService(this.props.orderInfo.Info))
  }
  componentWillUnmount(){
    store.dispatch(deleteService(this.props.orderInfo.Info))
  }
  render(){
    const {productList,orderInfo} = this.props;
    const cartInfo = orderInfo && orderInfo.Products && orderInfo.Products.filter(r=>parseInt(r.Num) !== 0).map(c=>{
      const product = productList.find(p=>p.pid === c.Pid);
      return (
        <li key={product.pid}>{product.name}<span>{'$' + (product.price*c.Num).toFixed(2)}</span></li>
      )
    })

    return (
      <div className='check-out'>
        <div className="checkout-order">
          <div className='title'>Your Order</div>
          {orderInfo.Success ? (
          <>
            <div className="checkout-order-products">Products <span>Total</span></div>
            <ul>
                {cartInfo}
            </ul>
            <div className='checkout-fee'>
              <div className="checkout-order-subtotal">Subtotal <span>{'$ ' + (orderInfo.Subtotal || 0).toFixed(2)}</span></div>
              <div className={orderInfo.Point?'checkout-shipping line-through':'checkout-shipping'} >
                Shipping<span>{'$' + (orderInfo.Shopping || 0).toFixed(2)}</span>
              </div>           
            </div>

            <div className="checkout-order-total">Total <span>{'$' + (orderInfo.Total || 0).toFixed(2)}</span></div></>):(<div>The product is out of stock! Please reorder.</div>)}
          {/* <button type="submit" class="site-btn">PLACE ORDER</button> */}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CheckOut)