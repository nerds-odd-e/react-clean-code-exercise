import React from 'react'
import AddBudget from '../../components/AddBudget'
import Api from '../../api'
import {shallow} from 'enzyme'

describe('add budget', () => {
  let wrapper
  let history = {push: () => {}}
  let push = jest.spyOn(history, 'push')
  beforeEach(() => {
    wrapper = shallow(<AddBudget history={history}/>)
    push.mockClear()
  })

  it('default value', () => {
    expect(wrapper.state().budget).toEqual({month: '', amount: 0})
  })
  it('default errors should be empty', () => {
    expect(wrapper.state().errors).toEqual({month: '', amount: ''})
  })
  describe('save budget', () => {
    let addBudget = Api.addBudget = jest.fn()
    let getBudgets  = Api.getBudgets = jest.fn()
    let updateBudget  = Api.updateBudget = jest.fn()
    beforeEach(() => {
      addBudget.mockClear()
      updateBudget.mockClear()
    })
    describe('validation failed', () => {
      let validation_failed_with = (field, message) => {
        expect(wrapper.state().errors[field]).toEqual(message)
        expect(Api.addBudget).not.toHaveBeenCalled()
        expect(push).not.toHaveBeenCalled()
      };
      it('month should not be empty', () => {
        wrapper.setState({budget: {month: ''}})
        wrapper.instance().save()
        validation_failed_with('month', 'Month cannot be empty');
      })
      it('month format should be YYYY-MM', () => {
        wrapper.setState({budget: {month: 'INVALID'}})
        wrapper.instance().save()
        validation_failed_with('month', 'Invalid month format');
      })
      it('amount should not be empty', () => {
        wrapper.setState({budget: {amount: ''}})
        wrapper.instance().save()
        validation_failed_with('amount', 'Amount cannot be empty');
      })
      it('amount should be a number', () => {
        wrapper.setState({budget: {amount: 'NOT A NUMBER'}})
        wrapper.instance().save()
        validation_failed_with('amount', 'Invalid amount');
      })
      it('amount should be a number', () => {
        wrapper.setState({budget: {amount: -1}})
        wrapper.instance().save()
        validation_failed_with('amount', 'Invalid amount');
      })
    })
    it('add a budget', () => {
      getBudgets.mockReturnValue([])
      let budget = {month: '2019-01', amount: 1000}
      wrapper.setState({budget})
      wrapper.instance().save()
      expect(addBudget).toHaveBeenCalledWith(budget)
    })
    it('update the existing budget if budget of month exists', () => {
      getBudgets.mockReturnValue([{month: '2019-01', amount: 500}])
      let budget = {month: '2019-01', amount: 1000}
      wrapper.setState({budget})
      wrapper.instance().save()
      expect(updateBudget).toHaveBeenCalledWith(budget)
    })
    it('redirect to budget list page', () => {
      getBudgets.mockReturnValue([])
      let budget = {month: '2019-01', amount: 1000}
      wrapper.setState({budget})
      wrapper.instance().save()
      expect(push).toHaveBeenCalledWith('/budgets')
    })
  })
  it('cancel', () => {
    wrapper.instance().cancel()
    expect(push).toHaveBeenCalledWith('/budgets')
  })
})
