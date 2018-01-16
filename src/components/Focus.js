import React, { Component } from 'react'
import State from './State'
import renderProps from '../utils/renderProps'
import noop from '../utils/noop'
import composeEventHandlers from '../utils/composeEventHandlers'

class Focus extends Component {
  static defaultProps = {
    focusProps: {
      ref: noop,
      onFocus: noop,
      onBlur: noop,
    },
  }

  focus = () => {
    this.focusEl.focus()
  }

  blur = () => {
    this.focusEl.blur()
  }

  focusRef = focusEl => {
    this.focusEl = focusEl
    this.props.focusProps.ref(focusEl)
  };

  renderFunc = ({ state, setState }) => {
    const { focusProps, render, children } = this.props
    const handleFocus = () => setState({ focused: true })
    const handleBlur = () => setState({ focused: false })
    const getFocusProps = (propsToMerge={}) => {
      return ({
        ...propsToMerge,
        ref: this.focusRef,
        onFocus: composeEventHandlers(
          propsToMerge.onFocus, focusProps.onFocus, handleFocus
        ),
        onBlur: composeEventHandlers(
          propsToMerge.onBlur, focusProps.onBlur, handleBlur
        ),
      });
    };

    return renderProps({render, children}, {
      getFocusProps,
      blur: this.blur,
      focus: this.focus,
      focused: state.focused,
    });
  }

  render() {
    return (
      <State
        initial={{ focused: false }}
        onChange={this.props.onChange}
        render={this.renderFunc}
      />
    )
  }
}

export default Focus
