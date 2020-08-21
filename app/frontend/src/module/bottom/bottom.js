import React from 'react'
import './bottom.css'
import { connect } from 'react-redux'

import {loginShow, cartShow} from '../../actions/actions.js'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loginShow: () => {
			dispatch(loginShow())
		},
		cartShow: (uid) => {
			dispatch(cartShow(uid))
		}
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		userInfo: state.userInfo,
	}
}
class Bottom extends React.Component{
  render(){
    return (
      <footer className="bottom">
        <div className="section">
				<div className="container">
							<div className="footer">
								<h3 className="footer-title">ABOUT SERVICE MESH</h3>
								<ul className="footer-links">
									<li>connect</li>
									<li>secure</li>
									<li>control</li>
									<li>observe</li>
								</ul>
							</div>
							<div className="footer">
								<h3 className="footer-title">INFORMATION</h3>
								<ul className="footer-links">
									<li>Copyright © 2020 Tencent TCM Team</li>
									<li>腾讯云服务网格</li>
								</ul>
							</div>

							<div className="footer">
								<h3 className="footer-title">SERVICE</h3>
								<ul className="footer-links">
									<li onClick={()=>{this.props.loginShow()}}>MyAccount</li>
									<li onClick={()=>{this.props.cartShow(this.props.userInfo.userInfo.UserID)}}>ViewCart</li>
								</ul>
							</div>
			  </div>
      </div>
		</footer>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bottom)