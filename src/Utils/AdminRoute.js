import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser, getToken } from './Common';
 
function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken()&&getUser().role === 'admin' ? <Component {...props} /> : <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />}
    />
  )
}
 
export default AdminRoute;