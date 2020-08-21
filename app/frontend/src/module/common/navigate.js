import * as React from 'react'
import {hashHistory} from 'react-router'
export class Navigation extends React.Component {
  navigate(){
    hashHistory.push('/productList')
  }
  render(){
    return (
        <div className="nav">
            <ul className="main-nav nav navbar-nav">
              <li onClick={this.navigate.bind(this)}>Shop</li>
              <li>About</li>
              <li>Information</li>
              <li>Service</li>
            </ul>
        </div>
    )
  }
}