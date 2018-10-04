import React, {Component} from 'react'
import Header from "./Header";
export default class Page extends Component {
  render(){
    return (
      <div>
        <Header/>
        <div style={{textAlign: 'center'}}>
        {this.props.children}
        </div>
      </div>
      )
  }
}