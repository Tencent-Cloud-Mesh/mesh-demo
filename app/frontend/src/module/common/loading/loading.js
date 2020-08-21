import * as React from 'react'
import img from '../../../static/img/loading.gif'
import './loading.css'
export class LoadingPrompt extends React.Component{
  render(){
    return (
      <div className='loading'>
        <img src={img} alt=''/>
      </div>
    )
  }
}