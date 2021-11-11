import { it, expect } from '@jest/globals';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './App';

it('should render the react component', () => {
  // setup a DOM element as a render target
  const container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<App />, container);
  });

  expect(container.textContent).toBe('React app rendered inside Shadow DOM');
});

it('should render the react component inside shadow root', () => {
  // Create web component with target div inside it.
  const container = document.createElement('shadow-host');
  // Add shadow root to component.
  container.attachShadow({ mode: 'open' });
  document.body.appendChild(container);
  // Select the web component, then the shadowRoot.
  const target = document.querySelector('shadow-host').shadowRoot;

  act(() => {
    ReactDOM.render(<App />, target);
  });

  expect(target.textContent).toBe('React app rendered inside Shadow DOM');
});

it('should have rendered the logo', () => {
  // setup a DOM element as a render target
  const container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<App />, container);
  });

  expect(container.querySelector('img').src).toBeTruthy();
});
