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

  componentDidUpdate(prevPros, prevState) {
    const keys = Object.keys(this.state)
    const changes = {}
    keys.forEach(key => {
      if (this.state[key] !== prevState[key]) {
        changes[key] = this.state[key]
      }
    })
    if (changes.length !== 0) {
      this.props.onChange(changes)
    }
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

  _setState = (updater, cb) =>{
    this.setState(updater, cb)
  }

  render() {
    return renderProps(this.props, {
      state: this.getState(),
      setState: this._setState,
    })
  }
}

export default State
