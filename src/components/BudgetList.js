import React from 'react'
import Api from "../api";

export default class BudgetList extends React.Component {
  state = {
    headers: [
      "Month",
      "Amount"
    ],
    budgets: []
  }

  componentDidMount() {
    this.setState({budgets: Api.getBudgets()})
  }

  gotoAddBudget() {
    this.props.history.push('/budgets/add')
  }

  render() {
    return (
      <div style={{fontSize: 14 + 'px'}}>
        <h2>Budgets</h2>
        <div style={{
          display: 'flex',
          height: 33 + 'px',
          borderTop: '1px solid lightgrey',
          borderBottom: '1px solid lightgrey'
        }}>
          {this.state.headers.map(header =>
            <div key={header} style={{display: 'flex', position: 'relative'}}>
              <div style={{display: 'block', height: 32 + 'px', width: 200 + 'px', borderRight: '1px solid lightgrey'}}>
                <div style={{alignItems: 'center', fontWeight: 'bolder'}}>{header}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{position: 'relative'}}>
          {this.state.budgets.map((budget, index) =>
            <div key={index} style={{display: 'flex', borderBottom: '1px solid lightgrey'}}>
              {Object.keys(budget).map(key =>
                <div key={key}
                     style={{
                       width: 200 + 'px',
                       display: 'block',
                       borderRight: '1px solid lightgrey',
                       minHeight: 32 + 'px'
                     }}>
                  <span style={{lineHeight: 1.5}}>{budget[key]}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div onClick={() => this.gotoAddBudget()} style={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          height: 32 + 'px',
          paddingLeft: 8 + 'px',
          paddingBottom: 2 + 'px',
          color: 'grey',
          borderBottom: '1px solid lightgrey'
        }}>
          ＋Add New Budget
        </div>
      </div>
    )
  }
}