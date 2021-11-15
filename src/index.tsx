import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import routes from './router';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {routes.map((r) =>
        Array.isArray(r.children) ? (
          <Route
            {...r}
            children={r.children.map((c) => (
              <Route {...c} key={c.path} />
            ))}
            key={r.path}
          />
        ) : (
          <Route {...r} key={r.path} />
        )
      )}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
