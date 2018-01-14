import React from 'react'
import State from './State'
import renderProps from '../utils/renderProps'

const Toggle = ({ initial = false, on, onChange, ...props }) => (
  <State initial={{ on: initial }} on={on} onChange={ onChange }>
    {({ state, setState }) => renderProps(props, {
      on: state.on,
      off: !state.on,
      toggle: () => setState(s => ({ on: !s.on })),
      setOn: (on) => setState({ on }),
    })}
  </State>
)

export default Toggle
