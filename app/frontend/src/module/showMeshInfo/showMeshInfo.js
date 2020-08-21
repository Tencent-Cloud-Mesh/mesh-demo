import * as React from 'react'
import './showMeshInfo.css'
import { connect } from 'react-redux'
import Draggable from 'react-draggable';

const  mapStateToProps = (state, ownProps) => {
  return {
    serviceInfo: state.serviceInfo,
  }
}


class ShowMeshInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isMeshInfoShow:true, 
      isDrag:false
    }
  }
  toggleMeshInfo(){
    this.setState({
      isMeshInfoShow:!this.state.isMeshInfoShow,
    })
  }
  hideMeshInfo(){
    this.setState({
      isMeshInfoShow:false,
    })
  }
  isDrag(){
    this.setState({
      isDrag:true
    })
  }
  isNotDrag(){
    this.setState({
      isDrag:false
    })
  }
  render(){

    const serviceShow = this.props.serviceInfo.map((s,i)=>{
      const serviceName = s.Service.split('-');
      return (
        <tbody key={serviceName[0]}>
          <tr>
            <td rowSpan='3'>{serviceName[0]}</td>
            <td>region</td>
            <td>{s.Region}</td>
          </tr>
          <tr>
            <td>version</td>
            <td>{serviceName[1]}</td>
          </tr>
          <tr>
            <td>pod name</td>
            <td>{s.Pod}</td>
          </tr>
        </tbody>
      )
    })

    return (
      <Draggable onDrag={this.isDrag.bind(this)}>
      <div className="meshInfo showButton" onClick={this.state.isDrag?(this.isNotDrag.bind(this)):this.toggleMeshInfo.bind(this)} >
        {this.state.isMeshInfoShow?(<div className='mesh-wrap'>
        <div className='close' onClick={this.hideMeshInfo.bind(this)}><span>X</span></div>
          <div className="table" >
            <table>             
              {serviceShow}
            </table>
          </div>
        </div>):null }
      </div>
      </Draggable>
    )
  }
}

export default connect(mapStateToProps)(ShowMeshInfo)