import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser, getToken } from './Common';
 
function StudentRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken()&&getUser().role === 'student' ? <Component {...props} /> : <Redirect to={{ pathname: '/student/login', state: { from: props.location } }} />}
    />
  )
}
 
export default StudentRoute;