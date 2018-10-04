import React from 'react'
import merge from 'lodash/merge'
import Api from "../api";

export default class Profile extends React.Component {
  state = {
    profile: {
      name: '',
      birthday: {
        year: 1980,
        month: 1,
        day: 1
      }
    }
  }

  handleNameChange(event) {
    this.setState({profile: merge({}, this.state.profile, {name: event.target.value})})
  }

  handleYearChange(event) {
    this.setState({profile: merge({}, this.state.profile, {birthday: {year: event.target.value}})})
  }

  handleMonthChange(event) {
    this.setState({profile: merge({}, this.state.profile, {birthday: {month: event.target.value}})})
  }

  handleDayChange(event) {
    this.setState({profile: merge({}, this.state.profile, {birthday: {day: event.target.value}})})
  }

  save() {
    Api.updateProfile(this.state.profile)
  }

  componentDidMount() {
    this.setState({profile: Api.getProfile()})
  }

  render() {
    let {profile: {name, birthday: {year, month, day}}} = this.state
    return (
      <div>
        <h2>Profile</h2>
        <div className="form-item">
          <div className="label">
            <label>Name: </label>
          </div>
          <div className="editor">
            <input value={name} onChange={event => this.handleNameChange(event)} placeholder="Name"/>
          </div>
        </div>
        <div className="form-item">
          <div className="label">
            <label>Birthday: </label>
          </div>
          <div className="editor">
            <input value={year} onChange={event => this.handleYearChange(event)} placeholder="YYYY"/>/
            <input value={month} onChange={event => this.handleMonthChange(event)} placeholder="MM"/>/
            <input value={day} onChange={event => this.handleDayChange(event)} placeholder="DD"/>
          </div>
        </div>
        <div className="form-item">
          <button onClick={() => this.save()} className="button">Save</button>
        </div>
      </div>
    )
  }
}