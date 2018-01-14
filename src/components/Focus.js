import React, { Component } from 'react'
import State from './State'
import renderProps from '../utils/renderProps'

class Focus extends Component {
  render() {
    const { onChange, ...props } = this.props
    return (
      <State initial={{ focused: false }} onChange={ onChange }>
        {({ state, setState }) => renderProps(props, {
          isFocus: state.focused,
          focused: state.focused,
          bindFocus: {
            onFocus: () => setState({ focused: true }),
            onBlur: () => setState({ focused: false }),
          },
        })}
      </State>
    )
  }
}

export default Focus
