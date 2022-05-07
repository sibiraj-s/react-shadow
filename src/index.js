import './polyfills.js';

// Warning: Don't Modify this file
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root.js';

import './index.scss';

// Create web component with target div inside it.
const host = document.createElement('shadow-host');

// Add shadow root to component.
host.attachShadow({ mode: 'open' });

document.body.appendChild(host);

// Select the web component, then the shadowRoot.
const container = document.querySelector('shadow-host').shadowRoot;
const root = createRoot(container);

const Main = () => {
  return (
    <StrictMode>
      <Root />
    </StrictMode>
  );
};

root.render(<Main />);
