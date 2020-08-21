import * as React from 'react'

import {Navigation} from './navigate'

import logo from '../../static/img/logo.svg'
import userIcon from '../../static/img/user.svg'
import cartIcon from '../../static/img/cart.svg'
import {cartShow,loginShow} from '../../actions/actions.js'
import { connect } from 'react-redux'

const  mapDispatchToProps = (dispatch, ownProps) => {
	return {
		cartShow: (uid) => {
			dispatch(cartShow(uid))
		},
		loginShow: ()=>{
			dispatch(loginShow())
		}
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		userInfo: state.userInfo,
		cartInfo: state.cartInfo.cartList
	}
}
class HeaderContainer extends React.Component{
  render(){
		const {userInfo} = this.props;
		return (
			<div className='container'>  
				<div className='left'>
					<img src={logo} alt='logo' />
					<span>Tencent Cloud Mesh Demo</span>
				</div>
				<div className='center'>
					<Navigation />
				</div>
				<div className='right'>
					<div onClick={()=>{this.props.loginShow(userInfo.Info)}}>
						<div>
							<img src={userIcon} alt='Login in'/>
						</div>
							<div>{(userInfo.userInfo && Object.keys(userInfo.userInfo).length !== 0)?'user : '+userInfo.userInfo.Name:'Login in'}</div>
					</div>
					<div onClick={()=>{this.props.cartShow(userInfo.userInfo.UserID)}}>
						<div>
							<img src={cartIcon} alt='cart'/>
						</div>
						<div>Your Cart</div>
					</div>

				</div>
			</div>
		)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer);