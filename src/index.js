import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Public from './Dashboards/Public';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
            <Switch>
                <Route component={Public} />
            </Switch>
            <div className='footer'>
                <p>&copy; {new Date().getFullYear()} RGUKT Basar. All rights reserved.</p>
            </div>
        </div>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));