import './polyfills.js';

// Warning: Don't Modify this file
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root.js';

import './index.scss';

// Create web component with target div inside it.
const container = document.createElement('shadow-host');

// Add shadow root to component.
container.attachShadow({ mode: 'open' });

document.body.appendChild(container);

// Select the web component, then the shadowRoot.
const target = document.querySelector('shadow-host').shadowRoot;
const root = createRoot(target);

const Main = () => {
  return (
    <StrictMode>
      <Root />
    </StrictMode>
  );
};

root.render(<Main />);
