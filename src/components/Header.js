import React from 'react';
import {NavLink} from 'react-router-dom'
import './Header.css'
import TimeProvider from '../domain/timeProvider'

export default class Header extends React.Component {
  state = {
    profile: { name: 'Jackson', birthday: {month: 10, day: 18}},
    today: new Date()
  }
  componentDidMount() {
    TimeProvider.getDatePromise().then(today => this.setState({today}))
  }
  profileCaption() {
    let {profile: {name}} = this.state
    return name === '' ? 'Profile' : `${name}${this._isBirthday() ? '🎂' : ''}`
  }
  _isBirthday(){
    let {today, profile: {birthday: {month, day}}} = this.state
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
