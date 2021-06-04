import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Admin from './Dashboards/Admin';
import Faculty from './Dashboards/Faculty';
import Student from './Dashboards/Student';
import Public from './Dashboards/Public';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
            <Switch>
                <Route path='/admin' component={Admin} />
                <Route path='/faculty' component={Faculty} />
                <Route path='/student' component={Student} />
                <Route path='/' component={Public} />
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