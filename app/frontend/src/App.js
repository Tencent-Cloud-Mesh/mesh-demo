import React from 'react';
import {Header} from './module/common/header.js'
import Product from './module/product/product.js'
import {Cart} from './module/cart/cart.js'
import CheckOut from './module/checkout/checkout.js' 
import Login from './module/common/login/login.js'
import Bottom from './module/bottom/bottom.js'
import ShowMeshInfo from './module/showMeshInfo/showMeshInfo.js'
import {LoadingPrompt} from './module/common/loading/loading.js'

import {Router,Route,hashHistory,Redirect} from 'react-router'

import {connect} from 'react-redux'
import { store } from './store/store.js';
import {receiveUserInfo} from './actions/fetchUserInfo.js'
import { addService } from './actions/actions.js'
const mapStateToProps = (state)=>{
  return {
    isLoginShow:state.isLoginShow,
    isCartShow:state.isCartShow,
    isLoadingShow:state.isLoadingShow
  }
}

const routes = (
  <Router history={hashHistory}>
    <Route path='/productList' component={Product} />
    <Route path='/checkout' component={CheckOut} />
    <Redirect from = '/' to = '/productList' />
    <Redirect from = '/*' to = '/' />
  </Router>
)

class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isCartShow : false,
  //     isLoginShow : false,
  //     productList :[],
  //   }
  // }
  componentDidMount(){
    if(window.sessionStorage.UserInfo){
      const userInfo = JSON.parse(window.sessionStorage.getItem("UserInfo"))
      store.dispatch(receiveUserInfo(userInfo))
      store.dispatch(addService(userInfo.data.Info))
    }
  }
  render(){
    const {isCartShow,isLoginShow,isLoadingShow} = this.props;

    return (
      <div className="App">
        <Header />
        <ShowMeshInfo />
        {isCartShow? <Cart />:null}
        {isLoginShow? <Login />:null}
        {isLoadingShow? <LoadingPrompt />:null}
        {routes}
        <Bottom />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
