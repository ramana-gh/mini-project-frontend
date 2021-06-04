import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import rgukt_logo from '../rgukt_logo.png'

import PublicRoute from '../Utils/PublicRoute';
import FacultyRoute from '../Utils/FacultyRoute';

import Home from '../Components/Faculty/Home';
import Profile from '../Components/Faculty/Profile';
import ResetPassword from '../Components/Faculty/ResetPassword';
import GetBook from '../Components/Faculty/GetBook';
import SearchBooks from '../Components/Faculty/SearchBooks';

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

    axios.get(`http://localhost:3001/faculty/verifyToken`, {headers: {authorization: `Bearer ${token}`}})
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
    <div className='Faculty'>
      <Router>
        <div>
          <div className='content'>
            <Switch>
              <FacultyRoute exact path='/faculty/profile' component={Profile} />
              <FacultyRoute exact path='/faculty/logout' component={Public} />
              <PublicRoute exact path='/faculty/delete' component={Public} />
              <PublicRoute exact path='/faculty/reset' component={Public} />
              <FacultyRoute exact path='/faculty/home' component={Home} />
              <FacultyRoute exact path='/faculty/reset-password' component={ResetPassword} />
              <FacultyRoute exact path='/faculty/get-book/:isbn' component={GetBook} />
              <FacultyRoute exact path='/faculty/search-books' component={SearchBooks} />
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