import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Focus, State, Toggle } from  '../src';

import './index.css';

const styles = {
  uncontrolled: {
    borderStyle: 'solid',
    padding: '5px',
    margin: '5px',
  },
  controlled: {
    borderStyle: 'solid',
    borderColor: 'red',
    padding: '5px',
    margin: '5px',
  },
};

const StateExample = ({ text, onChange }) =>
  <State
    text={text}
    initial={{text: ''}}
    onChange={onChange}
    render={
      ({state, setState}) =>
        <div style={styles.uncontrolled}>
          <div>Current state is: <strong>{state.text}</strong></div>
          <input
            placeholder="Type away..."
            value={state.text}
            onChange={event => {setState({text: event.target.value});}}
          />
        </div>
    }
  />;


storiesOf('State', module)
  .add('uncontrolled', () =>
    <StateExample
      onChange={action('onChange')}
    />
  )
  .add('controlled', () =>
    <State
      onChange={action('onChange')}
      initial={{text: ''}}
      render={
        ({state, setState}) =>
          <div style={styles.controlled}>
            <div>You can control the state from out here too</div>
            <input
              placeholder="Type here..."
              value={state.text}
              onChange={event => {setState({text: event.target.value});}}
            />
            <StateExample
              text={state.text}
              onChange={state => setState(state)}
            />
          </div>
      }
    />
  );

const ToggleExample = ({on, onChange}) =>
  <Toggle
    initial={false}
    on={on}
    onChange={onChange}
    render={
      ({ on, toggle }) =>
        <div style={styles.uncontrolled}>
          <input type="checkbox" checked={on} onClick={toggle}/>
          <button onClick={toggle}>Click to toggle</button>
        </div>
    }
  />;

storiesOf('Toggle', module)
  .add('uncontrolled', () =>
    <ToggleExample onChange={action('onChange')}/>
  )
  .add('controlled', () =>
    <Toggle
      initial={true}
      onChange={action('controller onChange')}
      render={
        ({ on, toggle }) =>
          <div style={styles.controlled}>
            <button onClick={toggle}>Click to control the Toggle</button>
            <ToggleExample
              on={on}
              onChange={(state) => {action('controlled onChange')(state); toggle()}}
            />
          </div>
      }
    />
  );

const FocusExample = ({ focusProps, onChange }) =>
  <Focus
    onChange={onChange}
    focusProps={focusProps}
    render={
      ({  getFocusProps, focus, focused, }) =>
        <div style={styles.uncontrolled}>
          <div>
            You are {focused ? '' : 'not'} focused on the input.
          </div>
          <div>
            <button onClick={focus}>Click to focus on the input</button>
          </div>
          <input
            { ...getFocusProps({
              placeholder: 'Focus on me...',
              onFocus: action('onFocus'),
              onBlur: action('onBlur')
            }) }
          />
        </div>
    }
  />;

storiesOf('Focus', module)
  .add('uncontrolled', () =>
    <FocusExample onChange={action('onChange')} />
  )
  .add('controlled', () =>
    <Focus
      onChange={action('controller onChange')}
      render={
        ({  getFocusProps, focus, focused }) =>
          <div style={styles.controlled}>
            <div>
              You are {focused ? '' : 'not'} focused on the controlled Focus
              element.
            </div>
            <button onClick={focus}>
              Click to focus on the contolled Focus element
            </button>
            <FocusExample
              focusProps={
                getFocusProps({
                  onFocus: action('controlled onFocus'),
                  onBlur: action('controlled onBlur'),
                })
              }
              onChange={action('controlled onChange')}
            />
          </div>
      }
    />
  );
