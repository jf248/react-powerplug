import React from 'react'
import State from './State'
import renderProps from '../utils/renderProps'

const Focus = ({ onChange, ...props }) => (
  <State initial={{ focused: false }} onChange={ onChange }>
    {({ state, setState }) => renderProps(props, {
      isFocus: state.focused,
      focused: state.focused,
      bindFocus: {
        onFocusIn: () => setState({ focused: true }),
        onFocusOut: () => setState({ focused: false }),
      },
    })}
  </State>
)

export default Focus
