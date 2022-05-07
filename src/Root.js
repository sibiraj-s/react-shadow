// Warning: Don't Modify this file
import { lazy, Suspense } from 'react';

// lazy load the app to make sure
const App = lazy(() => import('./App.jsx'));

const Root = () => <Suspense fallback={null}><App /></Suspense>;

export default Root;
