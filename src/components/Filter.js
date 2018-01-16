import React from 'react';
import State from './State'
import renderProps from '../utils/renderProps'

const Filter =({
  defaultQuery='',
  filterFunc,
  items=[],
  query,
  onChange,
  ...props
}) =>
  <State initial={{query: defaultQuery}} onChange={onChange} query={query} >
    {({state, setState}) => renderProps(props, {
      filteredItems: filterFunc(items, state.query),
      refine: query => setState({ query }),
      query: state.query,
    })}
  </State>

export default Filter
