import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import Profile from './Profile'
import BudgetList from './BudgetList'
import AddBudget from './AddBudget'
import Page from './Page'

const layout = Component => (props) =>
  <Page>
    <Component {...props}/>
  </Page>

export default () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/budgets" />
      <Route exact path="/profile" component={layout(Profile)}/>
      <Route exact path="/budgets" component={layout(BudgetList)}/>
      <Route exact path="/budgets/add" component={layout(AddBudget)}/>
    </Switch>
  )
}
