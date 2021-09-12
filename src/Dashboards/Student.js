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
          <div className='header'>
            <div>
              <div className='header-top-left'>
                <NavLink exact activeClassName="active" to="/student/home">
                <li>
                  <ul><img src={rgukt_logo} alt='rgukt_logo' /></ul>
                  <ul><p className='sep'>|</p></ul>
                  <ul>
                  <div className='app-name'>
                    <h1 className='white'>RGUKT Basar</h1>
                    <h2 className='white'>Department Library</h2>
                    <p className='white'>(Computer Science and Engineering)</p>
                  </div>
                  </ul>
                </li>
                </NavLink>
              </div>
              <div>
                <div className='header-bottom-right'>
                  <div className='menu'>
                    <ul>
                      <ul>
                        <NavLink  className='white' exact activeClassName="active" to="/student/home">
                          <div className='menu-item'>Home</div>
                        </NavLink>
                      </ul>
                      <ul>
                        <NavLink  className='white' exact activeClassName="active" to="/student/search-books">
                          <div className='menu-item'>Search</div>
                        </NavLink>
                      </ul>
                      <ul>
                        <NavLink  className='white' exact activeClassName="active" to="/student/orders">
                          <div className='menu-item'>Orders</div>
                        </NavLink>
                      </ul>
                      <ul>
                        <NavLink  className='white' exact activeClassName="active" to="/student/get-favorites">
                          <div className='menu-item'>Favorites</div>
                        </NavLink>
                      </ul>
                      <ul>
                        <NavLink className='white' activeClassName="active" to="/about">
                          <div className='menu-item'>About</div>
                        </NavLink>
                      </ul>
                      <ul>
                        <NavLink className='white' activeClassName="active" to="/contact">
                          <div className='menu-item'>Contact</div>
                        </NavLink>
                      </ul>
                    </ul>
                  </div>
                </div>
                <div className='header-top-right'>
                    <li>
                      <ul>
                        <div class="dropdown">
                          <button class="dropbtn">{getUser().name}</button>
                          <div class="dropdown-content">
                            <NavLink exact activeClassName="active" to="/student/profile">Profile</NavLink>
                            <NavLink exact activeClassName="active" to="/student/logout">Log out</NavLink>
                          </div>
                        </div> 
                      </ul>
                    </li>
                  </div>
              </div>
            </div>
          </div>
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