import * as React from 'react'
import './header.css'
import HeaderContainer from './headerContainer'

export class Header extends React.Component {
  render(){
    return (
      <div className='header'>
        <HeaderContainer />
      </div>   
    ) 
  }
}

