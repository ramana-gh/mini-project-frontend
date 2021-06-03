import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser, getToken } from './Common';
 
function FacultyRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken()&&getUser().role === 'faculty' ? <Component {...props} /> : <Redirect to={{ pathname: '/faculty/login', state: { from: props.location } }} />}
    />
  )
}
 
export default FacultyRoute;