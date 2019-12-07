import './polyfills';

// Warning: Don't Modify this file
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

import './index.scss';

// Create web component with target div inside it.
const container = document.createElement('shadow-host');

// Add shadow root to component.
container.attachShadow({ mode: 'open' });

document.body.appendChild(container);

// Select the web component, then the shadowRoot.
const target = document.querySelector('shadow-host').shadowRoot;

ReactDOM.render(<Root />, target);
