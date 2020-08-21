import * as React from 'react'
import './cart.css'

// import {addCartInfo} from '../../webAPI.js'

import CartHeader from './cartHeader.js'
import CartList from './cartList.js'
import CartBottom from './cartBottom.js'

export class Cart extends React.Component{

  render(){
    return (
      <>
        <div className="cart">
          <CartHeader />
          <CartList />
          <CartBottom />
        </div>
        <div className="cart-mask">
        </div>
      </>
    )
}
}