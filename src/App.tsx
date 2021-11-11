import logo from './logo.png';
import './App.css';
import VersionBadge from './components/version-badge';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>bk.kohai.dev</code>, the site is building.
        </p>
        <p>
          欢迎访问 <code>bk.kohai.dev</code>，网站建设中。
        </p>
        <a className="App-link" href="https://github.com/kohaiy/lite-bookkeeping-fe" target="_blank" rel="noopener noreferrer">
          Visit on GitHub
        </a>
      </header>
      <VersionBadge />
    </div>
  );
};

export default App;
