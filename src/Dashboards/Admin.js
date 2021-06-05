import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import rgukt_logo from '../rgukt_logo.png'

import AdminRoute from '../Utils/AdminRoute';
import PublicRoute from '../Utils/PublicRoute';

import Home from '../Components/Admin/Home';
import Profile from '../Components/Admin/Profile';
import ResetPassword from '../Components/Admin/ResetPassword';
import GetBook from '../Components/Admin/GetBook';
import AddBook from '../Components/Admin/AddBook';
import SearchBooks from '../Components/Admin/SearchBooks';
import Orders from '../Components/Admin/Orders';

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

    axios.get(`http://localhost:3001/admin/verifyToken`, {headers: {authorization: `Bearer ${token}`}})
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
    <div className='Admin'>
      <Router>
        <div>
          
          <div className='content'>
            <Switch>
              <AdminRoute exact path='/admin/profile' component={Profile} />
              <AdminRoute exact path='/admin/logout' component={Public} />
              <PublicRoute exact path='/admin/delete' component={Public} />
              <PublicRoute exact path='/admin/reset' component={Public} />
              <AdminRoute exact path='/admin/reset-password' component={ResetPassword} />
              <AdminRoute exact path='/admin/home' component={Home} />
              <AdminRoute exact path='/admin/get-book/:isbn' component={GetBook} />
              <AdminRoute exact path='/admin/add-book' component={AddBook} />
              <AdminRoute exact path='/admin/search-books' component={SearchBooks} />
              <AdminRoute exact path='/admin/orders' component={Orders} />
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