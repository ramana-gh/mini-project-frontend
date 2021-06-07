import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import rgukt_logo from '../rgukt_logo.png'
import PublicRoute from '../Utils/PublicRoute';
import AdminRoute from '../Utils/AdminRoute';
import FacultyRoute from '../Utils/FacultyRoute';
import StudentRoute from '../Utils/StudentRoute';

import Home from '../Components/Public/Home';
import About from '../Components/Public/About';
import Contact from '../Components/Public/Contact';
import Delete from '../Components/Public/Delete';
import Reset from '../Components/Public/Reset';

import AdminRegister from '../Components/Admin/Register';
import AdminLogin from '../Components/Admin/Login';
import AdminLogout from '../Components/Admin/Logout';
import FacultyRegister from '../Components/Faculty/Register';
import FacultyLogin from '../Components/Faculty/Login';
import FacultyLogout from '../Components/Faculty/Logout';
import StudentRegister from '../Components/Student/Register';
import StudentLogin from '../Components/Student/Login';
import StudentLogout from '../Components/Student/Logout';

// import Admin from '../Dashboards/Admin';
// import Faculty from '../Dashboards/Faculty';
// import Student from '../Dashboards/Student';

import AdminHome from '../Components/Admin/Home';
import AdminProfile from '../Components/Admin/Profile';
import AdminResetPassword from '../Components/Admin/ResetPassword';
import AdminGetBook from '../Components/Admin/GetBook';
import AdminAddBook from '../Components/Admin/AddBook';
import AdminSearchBooks from '../Components/Admin/SearchBooks';
import AdminOrders from '../Components/Admin/Orders';

import FacultyHome from '../Components/Faculty/Home';
import FacultyProfile from '../Components/Faculty/Profile';
import FacultyResetPassword from '../Components/Faculty/ResetPassword';
import FacultyGetBook from '../Components/Faculty/GetBook';
import FacultySearchBooks from '../Components/Faculty/SearchBooks';

import StudentHome from '../Components/Student/Home';
import StudentProfile from '../Components/Student/Profile';
import StudentResetPassword from '../Components/Student/ResetPassword';
import StudentGetBook from '../Components/Student/GetBook';
import StudentSearchBooks from '../Components/Student/SearchBooks';
import StudentGetFavorites from '../Components/Student/GetFavorites';
import StudentOrders from '../Components/Student/Orders';

import NotFound from '../Components/Public/NotFound';
import { getToken, getUser, setUserSession, removeUserSession } from '../Utils/Common';

function Dashboard() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.get(`http://localhost:3001/${getUser().role}/verifyToken`, {headers: {authorization: `Bearer ${token}`}})
      .then(response => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });
    }
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className='Public'>
      <Router>
        <div>
            <div className='header'>
              <div>
                <div className='header-top-left'>
                  <NavLink exact activeClassName="active" to={`/${getToken()?getUser().role:''}/home`}>
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
                        <ul hidden={getToken()!==null}>
                          <NavLink  className='white' exact activeClassName="active" to="/home">
                            <div className='menu-item'>Home</div>
                          </NavLink>
                        </ul>
                        <ul hidden={getToken()===null}>
                          <NavLink  className='white' exact activeClassName="active" to={`/${getToken()?getUser().role:''}/home`}>
                            <div className='menu-item'>Home</div>
                          </NavLink>
                        </ul>
                        {getToken() && <ul hidden={getToken()===null}>
                          <NavLink  className='white' exact activeClassName="active" to={`/${getToken()?getUser().role:''}/search-books`}>
                            <div className='menu-item'>Search</div>
                          </NavLink>
                        </ul>}
                        {getToken() && <ul hidden={!(getToken()!==null&&getUser().role==='admin')}>
                          <NavLink  className='white' exact activeClassName="active" to={`/${getToken()?getUser().role:''}/add-book`}>
                            <div className='menu-item'>Add Book</div>
                          </NavLink>
                        </ul>}
                        {getToken() && <ul hidden={!(getToken()!==null&&getUser().role!=='faculty')}>
                          <NavLink  className='white' exact activeClassName="active" to={`/${getToken()?getUser().role:''}/orders`}>
                            <div className='menu-item'>Orders</div>
                          </NavLink>
                        </ul>}
                        {getToken() && <ul hidden={!(getToken()!==null&&getUser().role==='student')}>
                          <NavLink  className='white' exact activeClassName="active" to={`/${getToken()?getUser().role:''}/get-favorites`}>
                            <div className='menu-item'>Favorites</div>
                          </NavLink>
                        </ul>}
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
                      {!getToken() && <ul hidden={getToken()!==null}>
                        <div class="dropdown">
                          <button class="dropbtn">Log in</button>
                          <div class="dropdown-content">
                            <NavLink activeClassName="active" to="/admin/login">Admin</NavLink>
                            <NavLink activeClassName="active" to="/faculty/login">Faculty</NavLink>
                            <NavLink activeClassName="active" to="/student/login">Student</NavLink>
                          </div>
                        </div> 
                      </ul>}
                      {!getToken() && <ul hidden={getToken()!==null}>
                        <div class="dropdown">
                          <button class="dropbtn">Register</button>
                          <div class="dropdown-content">
                            <NavLink activeClassName="active" to="/admin/register">Admin</NavLink>
                            <NavLink activeClassName="active" to="/faculty/register">Faculty</NavLink>
                            <NavLink activeClassName="active" to="/student/register">Student</NavLink>
                          </div>
                        </div> 
                      </ul>}
                      {getToken() && <ul hidden={getToken()===null}>
                        <div class="dropdown">
                          <button class="dropbtn">{getToken()?getUser().name:''}</button>
                          <div class="dropdown-content">
                            <NavLink exact activeClassName="active" to="/admin/profile">Profile</NavLink>
                            <NavLink exact activeClassName="active" to="/admin/logout">Log out</NavLink>
                          </div>
                        </div> 
                      </ul>}
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <div className='content'>
              <Switch>
                <Redirect exact from="/" to="/home" />
                <PublicRoute exact path='/home' component={Home} />

                <AdminRoute exact path='/admin/profile' component={AdminProfile} />
                <AdminRoute exact path='/admin/reset-password' component={AdminResetPassword} />
                <AdminRoute exact path='/admin/home' component={AdminHome} />
                <AdminRoute exact path='/admin/get-book/:isbn' component={AdminGetBook} />
                <AdminRoute exact path='/admin/add-book' component={AdminAddBook} />
                <AdminRoute exact path='/admin/search-books' component={AdminSearchBooks} />
                <AdminRoute exact path='/admin/orders' component={AdminOrders} />

                <FacultyRoute exact path='/faculty/profile' component={FacultyProfile} />
                <FacultyRoute exact path='/faculty/home' component={FacultyHome} />
                <FacultyRoute exact path='/faculty/reset-password' component={FacultyResetPassword} />
                <FacultyRoute exact path='/faculty/get-book/:isbn' component={FacultyGetBook} />
                <FacultyRoute exact path='/faculty/search-books' component={FacultySearchBooks} />

                <StudentRoute exact path='/student/profile' component={StudentProfile} />
                <StudentRoute exact path='/student/home' component={StudentHome} />
                <StudentRoute exact path='/student/reset-password' component={StudentResetPassword} />
                <StudentRoute exact path='/student/get-book/:isbn' component={StudentGetBook} />
                <StudentRoute exact path='/student/search-books' component={StudentSearchBooks} />
                <StudentRoute exact path='/student/get-favorites' component={StudentGetFavorites} />
                <StudentRoute exact path='/student/orders' component={StudentOrders} />

                <Route exact path='/about' component={About} />
                <Route exact path='/contact' component={Contact} />
                <PublicRoute exact path='/admin/register' component={AdminRegister} />
                <PublicRoute exact path='/admin/login' component={AdminLogin} />
                <AdminRoute exact path='/admin/logout' component={AdminLogout} />
                <PublicRoute exact path='/admin/delete' component={Delete} />
                <PublicRoute exact path='/admin/reset' component={Reset} />
                <PublicRoute exact path='/faculty/register' component={FacultyRegister} />
                <PublicRoute exact path='/faculty/login' component={FacultyLogin} />
                <FacultyRoute exact path='/faculty/logout' component={FacultyLogout} />
                <PublicRoute exact path='/faculty/delete' component={Delete} />
                <PublicRoute exact path='/faculty/reset' component={Reset} />
                <PublicRoute exact path='/student/register' component={StudentRegister} />
                <PublicRoute exact path='/student/login' component={StudentLogin} />
                <StudentRoute exact path='/student/logout' component={StudentLogout} />
                <PublicRoute exact path='/student/delete' component={Delete} />
                <PublicRoute exact path='/student/reset' component={Reset} />
                {/* <AdminRoute path='/admin/home' component={Admin} /> */}
                {/* <FacultyRoute path='/faculty/home' component={Faculty} /> */}
                {/* <StudentRoute path='/student/home' component={Student} /> */}
                {/* <Route path='/admin' component={Admin} /> */}
                {/* <Route path='/faculty' component={Faculty} /> */}
                {/* <Route path='/student' component={Student} /> */}
                <Route component={NotFound} />
              </Switch>
            </div>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;