// Warning: Don't Modify this file
import React from 'react';

// lazy load the app to make sure
const App = React.lazy(() => import('./App.jsx'));

const Root = () => <React.Suspense fallback={null}><App /></React.Suspense>;

export default Root;
