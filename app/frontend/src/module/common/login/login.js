import * as React from 'react'
import './login.css'

import {loginHidden,deleteService} from '../../../actions/actions.js'
import { connect } from 'react-redux'
import {fetchUserInfo} from '../../../actions/fetchUserInfo.js'


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginHidden: (login,services) => {
      dispatch(loginHidden())
      if(!login){
        dispatch(deleteService(services))
      }
    },
    getUserInfo: (uid)=>{
      dispatch(fetchUserInfo(uid))
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.userInfo
  }
}
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId:'',
      inputCheck:true
    }
   
  }
  userNameChange = (event)=>{
    this.setState({
        userId:event.target.value,
        inputCheck:true
      }
  )
}
  getUserInfo(e){
    e.preventDefault();
    this.state.userId?this.props.getUserInfo(this.state.userId):this.setState({
      userId:this.state.userId,
      inputCheck:false
    });
  }
  render(){
    const {login,userInfo} = this.props.userInfo;
    return (
      <>
      <div className='login-wrap'>
        <div className='login-title' >Please Log In</div>
        <div className='close' onClick={()=>{this.props.loginHidden(login,userInfo.Info)}}>X</div>
        <form className="login-form">
          <input type="text" placeholder="username" value={this.state.userId} onChange={this.userNameChange} />
          <button onClick={this.getUserInfo.bind(this)}>login</button>
          {!login && <p className="message">Login failed! <span>The user is not registered.</span></p>}
          {!this.state.inputCheck && <p className="message">Your input is empty!</p>}
          
        </form>
      </div>
      <div className="login-mask"></div>
      </>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
