import React from 'react'
import State from './State'
import renderProps from '../utils/renderProps'

const Counter = ({ count, initial = 0, onChange, ...props }) => (
  <State count={count} initial={{ count: initial }} onChange={ onChange }>
    {({ state, setState }) => renderProps(props, {
      count: state.count,
      inc: (value = 1) =>
        setState(({ count }) => ({ count: count + value })),
      dec: (value = 1) =>
        setState(({ count }) => ({ count: count - value })),
    })}
  </State>
)

export default Counter
