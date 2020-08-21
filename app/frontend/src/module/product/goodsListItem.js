import * as React from 'react';
import { store } from '../../store/store';

import {LOGIN_SHOW} from '../../actions/actions.js'
import {modifyCartInfo} from '../../actions/addCartAction.js'
import { connect } from 'react-redux';

import img from '../../../src/static/img/product.svg'
const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.userInfo.userInfo,
  }
}

class GoodsListItem extends React.Component{
  getCartList(){
    const {productInfo,userInfo} = this.props;
    if(userInfo.UserID){
      store.dispatch(modifyCartInfo(userInfo.UserID,productInfo.pid,1))
    }else{
      store.dispatch({
        type:LOGIN_SHOW
      })
    }
  }
  render(){
    const {productInfo} = this.props;
    const imgUrl = this.props.index === 0?img:productInfo.url;

    return (
      <div className="goods-list-item">
        <div className="goods-img">
          <img src={imgUrl} alt="" />
        </div>
        <div className="goods-body">
          <p className="goods-category">Category</p>
            <h3 className="goods-name"><a href="#">{productInfo.name}</a></h3>
          <h4 className="goods-price">{'$'+productInfo.price}<del className="goods-old-price">{'$'+productInfo.price}</del></h4>
        </div>
        <div className="add-to-cart">
          <button className="add-to-cart-btn" onClick={this.getCartList.bind(this)}> add to cart</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(GoodsListItem)
