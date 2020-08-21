import * as React from 'react'
import GoodsListItem from './goodsListItem'

import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const {productsInfo} = state;
  const {
    productList,
  } = productsInfo || {productList:{}};
  return {
    productList
  }
}

class GoodsList extends React.Component {
  render(){
    
    const {product} = this.props.productList;
    const productList = product && product.map((product,index)=>{
      return (
        <GoodsListItem productInfo={product} key={product.pid} index={index}/>
      )
    })
    return (
      <div className="goods-list">
        {productList}
      </div>
    )
  }
}

export default connect(mapStateToProps)(GoodsList);