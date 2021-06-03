import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser, getToken } from './Common';

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: `/${getUser().role}/home` }} />}
    />
  )
}
 
export default PublicRoute;