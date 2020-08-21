import * as React from 'react'
import hide from '../../static/img/hide.svg'
import {connect} from 'react-redux'
import {cartHidden} from '../../actions/actions.js'
import {resetOrderInfo} from '../../actions/fetchOrderActions.js'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cartHidden: (info) => {
      // hashHistory.getCurrentLocation().path === "checkout" ? dispatch(info.filter(i=>i.Name.indexOf("cart") !== -1)):dispatch(cartHidden(info));
      dispatch(cartHidden(info));
      dispatch(resetOrderInfo())
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartInfo: state.cartInfo.cartList,
  }
}

class CartHeader extends React.Component{
  render(){
    return (
      <div className='cart-header'>
        <div className='left' onClick={()=>{this.props.cartHidden(this.props.cartInfo.Info)}}>
          <img src={hide} alt=''/>
        </div>
        <div className='center'>
          Cart
        </div>
        <div className='right'></div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartHeader)