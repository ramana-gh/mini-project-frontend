import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';

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

import Admin from '../Dashboards/Admin';
import Faculty from '../Dashboards/Faculty';
import Student from '../Dashboards/Student';

import NotFound from '../Components/Public/NotFound';

import { getUser, getToken } from '../Utils/Common';

function Dashboard() {
  return (
    <div className='Public'>
      <Router>
        <div>
            <div className='header'>
              <div>
                <div className='header-top-left'>
                  <NavLink exact activeClassName="active" to="/home">
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
                          <NavLink  className='white' exact activeClassName="active" to="/home">
                            <div className='menu-item'>Home</div>
                          </NavLink>
                        </ul>
                        <ul>
                          {getToken() && <NavLink  className='white' exact activeClassName="active" to={`/${getUser().role}/search-books`}>
                            <div className='menu-item'>Search</div>
                          </NavLink>}
                        </ul>
                        <ul>
                        {getToken() && getUser().role === 'admin' && <NavLink  className='white' exact activeClassName="active" to={`/${getUser().role}/add-book`}>
                            <div className='menu-item'>Add Book</div>
                          </NavLink>}
                        </ul>
                        <ul>
                        {getToken() && getUser().role !== 'faculty' && <NavLink  className='white' exact activeClassName="active" to={`/${getUser().role}/orders`}>
                            <div className='menu-item'>Orders</div>
                          </NavLink>}
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
                            <button class="dropbtn">Log in</button>
                            <div class="dropdown-content">
                              <NavLink activeClassName="active" to="/admin/login">Admin</NavLink>
                              <NavLink activeClassName="active" to="/faculty/login">Faculty</NavLink>
                              <NavLink activeClassName="active" to="/student/login">Student</NavLink>
                            </div>
                          </div> 
                        </ul>
                        <ul>
                          <div class="dropdown">
                            <button class="dropbtn">Register</button>
                            <div class="dropdown-content">
                              <NavLink activeClassName="active" to="/admin/register">Admin</NavLink>
                              <NavLink activeClassName="active" to="/faculty/register">Faculty</NavLink>
                              <NavLink activeClassName="active" to="/student/register">Student</NavLink>
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
                <Redirect exact from="/" to="/home" />
                <PublicRoute exact path='/home' component={Home} />
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
                <AdminRoute path='/admin/home' component={Admin} />
                <FacultyRoute path='/faculty/home' component={Faculty} />
                <StudentRoute path='/student/home' component={Student} />
                <Route path='/admin' component={Admin} />
                <Route path='/faculty' component={Faculty} />
                <Route path='/student' component={Student} />
                <Route component={NotFound} />
              </Switch>
            </div>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;