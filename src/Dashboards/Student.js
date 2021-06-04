import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import rgukt_logo from '../rgukt_logo.png'

import PublicRoute from '../Utils/PublicRoute';
import StudentRoute from '../Utils/StudentRoute';

import Home from '../Components/Student/Home';
import Profile from '../Components/Student/Profile';
import ResetPassword from '../Components/Student/ResetPassword';
import GetBook from '../Components/Student/GetBook';
import SearchBooks from '../Components/Student/SearchBooks';
import GetFavorites from '../Components/Student/GetFavorites';
import Orders from '../Components/Student/Orders';

import About from '../Components/Public/About';
import Contact from '../Components/Public/Contact';

import Public from '../Dashboards/Public';

import { getUser, getToken, removeUserSession, setUserSession } from '../Utils/Common';

function Dashboard() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:3001/student/verifyToken`, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    })
    .catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className='Student'>
      <Router>
        <div>
          <div className='content'>
            <Switch>
              <StudentRoute exact path='/student/profile' component={Profile} />
              <StudentRoute exact path='/student/logout' component={Public} />
              <PublicRoute exact path='/student/delete' component={Public} />
              <PublicRoute exact path='/student/reset' component={Public} />
              <StudentRoute exact path='/student/home' component={Home} />
              <StudentRoute exact path='/student/reset-password' component={ResetPassword} />
              <StudentRoute exact path='/student/get-book/:isbn' component={GetBook} />
              <StudentRoute exact path='/student/search-books' component={SearchBooks} />
              <StudentRoute exact path='/student/get-favorites' component={GetFavorites} />
              <StudentRoute exact path='/student/orders' component={Orders} />
              <Route exact path='/about' component={About} />
              <Route exact path='/contact' component={Contact} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;