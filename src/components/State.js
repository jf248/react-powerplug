import { Component } from 'react'
import renderProps from '../utils/renderProps'
import noop from '../utils/noop'

class State extends Component {
  static defaultProps = {
    initial: {},
    onChange: noop,
  }

  state = {
    ...this.props.initial
  }

  _setState = (updater, cb = noop) => {
    this.setState(updater, () => {
      this.props.onChange(this.state)
      cb()
    })
  }

  isControlledProp = (key) => {
    return this.props[key] !== undefined
  }

  getState = () => {
    return Object.keys(this.state).reduce((state, key) => {
      state[key] = this.isControlledProp(key)
        ? this.props[key]
        : this.state[key]
      return state
    }, {})
  }

  render() {
    return renderProps(this.props, {
      state: this.getState(),
      setState: this._setState,
    })
  }
}

export default State
