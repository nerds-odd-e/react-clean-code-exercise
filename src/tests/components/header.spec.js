import {shallow} from 'enzyme'
import React from 'react'
import Header from '../../components/Header'
import TimeProvider from '../../domain/timeProvider'

describe('Header', () => {
  const wrapper = shallow(<Header />)
  it('show cake on birthday', () => {
    TimeProvider.now = () => new Date(2018, 9, 18)  //jest.fn().mockReturnValue(new Date(2018, 9, 18))
    expect(wrapper.instance().profileCaption()).toEqual('Jackson🎂')
  })
  it('hide cake if not birthday', () => {
    TimeProvider.now = () => new Date(2018, 9, 17)  //jest.fn().mockReturnValue(new Date(2018, 9, 17))
    expect(wrapper.instance().profileCaption()).toEqual('Jackson')
  })
})