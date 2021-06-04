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
          {/* <div className='header'>
            <div>
              <div className='header-top-left'>
                <NavLink exact activeClassName="active" to="/faculty/home">
                <li>
                  <ul><img src={rgukt_logo} alt='rgukt_logo' /></ul>
                  <ul><p className='sep'>|</p></ul>
                  <ul>
                  <div className='app-name'>
                    <h1 className='white'>RGUKT Basar</h1>
                    <h2 className='white'>Department Library</h2>
                    <p className='white'>(Computer Science Engineering)</p>
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
                        <NavLink  className='white' exact activeClassName="active" to="/faculty/home">
                          <div className='menu-item'>Home</div>
                        </NavLink>
                      </ul>
                      <ul>
                        <NavLink  className='white' exact activeClassName="active" to="/faculty/search-books">
                          <div className='menu-item'>Search</div>
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
                            <NavLink exact activeClassName="active" to="/faculty/profile">Profile</NavLink>
                            <NavLink exact activeClassName="active" to="/faculty/logout">Log out</NavLink>
                          </div>
                        </div> 
                      </ul>
                    </li>
                  </div>
              </div>
            </div>
          </div>
           */}
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