import React, { useState } from 'react';
import axios from 'axios';
import { getUser, removeUserSession } from '../../Utils/Common';
import { baseUrl } from '../../shared/baseUrl';

function Logout(props) {
  const [loading, setLoading] = useState(false);
  const adminId = getUser().adminId;
  const [error, setError] = useState(null);

  removeUserSession();

  const handleLogout = () => {
    setError(error);
    setLoading(loading);
    axios.post(`${baseUrl}/admin/logout`, { adminId }).then(response => {
      setLoading(false);
      props.history.push('/admin/logout');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return <div><h1  style={{color: 'yellow'}} className="info" onLoad={handleLogout} >You are logged out.</h1></div>
}

export default Logout;