import reactLogo from './assets/images/react.svg';
import './app.scss';

const Badges = () => (
  <div className='badges'>
    <a
      href='https://github.com/sibiraj-s/react-shadow/blob/master/LICENSE'
      target='_blank'
      rel='noopener noreferrer'
      className='badge-link'
    >
      <img src='https://badgen.net/github/license/sibiraj-s/react-shadow?color=cyan' alt='license' />
    </a>
    <a
      href='https://github.com/sibiraj-s/react-shadow'
      target='_blank'
      rel='noopener noreferrer'
      className='badge-link'
    >
      <img src='https://badgen.net/badge/github/react-shadow?icon=github&color=red' alt='react-shadow' />
    </a>
  </div>
);

const App = () => {
  return (
    <div className='__root'>
      <div className='container'>
        <img src={reactLogo} alt='react' className='logo' />
        <p>React app rendered inside Shadow DOM</p>
        <Badges />
      </div>
    </div>
  );
};

export default App;
