import React from 'react'
import Api from "./api";

export default class AddBudget extends React.Component {
  state = {
    budget: {
      month: '',
      amount: 0
    },
    errors: {
      month: '',
      amount: ''
    }
  }
  _goToBudgetList() {
    this.props.history.push('/budgets')
  }

  save() {
    let {budget} = this.state
    let errors = {}
    let monthValid, amountValid
    if (budget.month === '') {
      errors.month = 'Month cannot be empty'
      monthValid = false
    } else if (!(/^\d{4}-\d{2}$/g).test(budget.month)) {
      errors.month = 'Invalid month format'
      monthValid = false
    } else {
      errors.month = ''
      monthValid = true
    }
    if (budget.amount === '') {
      errors.amount = 'Amount cannot be empty'
      amountValid = false
    } else if (isNaN(parseInt(budget.amount, 10)) || budget.amount < 0) {
      errors.amount = 'Invalid amount'
      amountValid = false
    } else {
      errors.amount = ''
      amountValid = true
    }
    if (!monthValid || !amountValid) {
      this.setState({errors})
      return
    }
    let budgets = Api.getBudgets()
    let existing = budgets.find(existedBudget => existedBudget.month === budget.month)
    if (existing) {
      Api.updateBudget(budget)
    } else {
      Api.addBudget(budget)
    }
    this._goToBudgetList()
  }
  cancel(){
    this._goToBudgetList()
  }

  handleChange(field) {
    let {budget} = this.state
    return event => this.setState({budget: Object.assign(budget, {[field]: event.target.value})})
  }

  render() {
    let {budget, errors} = this.state
    return (
      <div>
        <h2>Add Budget</h2>
        <div className="form-item">
          <div className="label">
            <label>Month</label>
          </div>
          <div className="editor">
            <input type="text" value={budget.month} onChange={this.handleChange('month')} placeholder="Month YYYY-MM"/>
          </div>
          <div className="error">
            <span>{errors.month}</span>
          </div>
        </div>
        <div className="form-item">
          <div className="label">
            <label>Amount</label>
          </div>
          <div className="editor">
            <input type="number" value={budget.amount} onChange={this.handleChange('amount')} placeholder="Amount"/>
          </div>
          <div className="error">
            <span>{errors.amount}</span>
          </div>
        </div>
        <div className="form-item">
          <button onClick={() => this.save()} className="button">Save</button>
          <button onClick={() => this.cancel()} className="button">Cancel</button>
        </div>
      </div>
    )
  }

}