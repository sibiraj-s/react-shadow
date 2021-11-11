const babelRc = (api) => {
  const { env } = api;

  const isEnvDevelopment = env() === 'development';
  const isEnvTest = env() === 'test';
  const isEnvProduction = !isEnvDevelopment && !isEnvTest;

  return {
    presets: [
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        '@babel/preset-env',
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Use corejs@3
          corejs: 3,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      isEnvTest && [
        // Latest stable ECMAScript features
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      // include plugin required here
    ].filter(Boolean),
  };
};

module.exports = babelRc;
