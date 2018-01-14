import React from 'react'
import State from './State'
import renderProps from '../utils/renderProps'

const Set = ({ initial = {}, onChange, render, children, ...props }) => (
  <State initial={{ ...initial }} onChange={ onChange } { ...props }>
    {({ state, setState }) => renderProps({ render, children }, {
      values: state,
      set: (key, value) => setState({ [key]: value }),
      over: (key, fn) => setState(s => ({ [key]: fn(s[key]) })),
      get: (key) => state[key],
    })}
  </State>
)

export default Set
