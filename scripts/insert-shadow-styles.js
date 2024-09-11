const insert = (styleEl) => {
  const target = document.querySelector('shadow-host').shadowRoot;
  target.appendChild(styleEl);
};

export default insert;
