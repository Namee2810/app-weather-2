import 'antd/dist/antd.css';
import Loading from 'components/Loading';
import "globals/styles/style.scss";
import HomePage from 'pages/HomePage';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
