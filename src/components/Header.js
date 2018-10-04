import React from 'react';
import {NavLink} from 'react-router-dom'
import './Header.css'

export default class Header extends React.Component {
  state = {
    profile: { name: '', birthday: {month: 0, day: 0}}
  }
  profileCaption() {
    let {profile: {name}} = this.state
    return name === '' ? 'Profile' : `${name}${this._isBirthday() ? '🎂' : ''}`
  }
  _isBirthday(){
    let today = new Date()
    let {profile: {birthday: {month, day}}} = this.state
    return today.getMonth() === month - 1 && today.getDate() === day
  }
  render() {
    return (
      <header className="clearfix">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile" style={{float: 'right'}}>{this.profileCaption()}</NavLink>
      </header>
    )
  }
}
