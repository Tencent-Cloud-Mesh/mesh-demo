import * as React from 'react'
import {connect} from 'react-redux'
import GoodsList from './goodsList.js'

import './product.css'
import { store } from '../../store/store.js'
import {fetchProductInfo} from '../../actions/fetchProductsInfo.js'
import {deleteService} from '../../actions/actions.js'

import ProductBanner from './banner.js'

const mapStateToProps = (state, ownProps) => {
  return {
    productList: state.productsInfo.productList,
  }
}

class Product extends React.Component{
  componentDidMount(){
    store.dispatch(fetchProductInfo())
  }
  componentWillUnmount() {
    store.dispatch(deleteService(this.props.productList.info))
  }
  render(){
    const {productList} = this.props;
    return (
      <div>
        {productList.url && productList.url !== 'xxx' && <ProductBanner url={productList.url}/>}
        <GoodsList />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Product)