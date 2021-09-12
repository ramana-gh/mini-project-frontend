import React, { useState } from 'react';
import axios from 'axios';
import { getUser, removeUserSession } from '../../Utils/Common';

function Logout(props) {
  const [loading, setLoading] = useState(false);
  const facultyId = getUser().facultyId;
  const [error, setError] = useState(null);

  removeUserSession();

  const handleLogout = () => {
    setError(error);
    setLoading(loading);
    axios.post('http://localhost:3001/faculty/logout', { facultyId }).then(response => {
      setLoading(false);
      removeUserSession();
      props.history.push('/faculty/logout');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return <div><h1 style={{color: 'yellow'}} className="info" onLoad={handleLogout} >You are logged out.</h1></div>
}

export default Logout;