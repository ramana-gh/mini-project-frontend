import React, { useState } from 'react';
import axios from 'axios';
import { getUser } from '../../Utils/Common';

function ResetPassword(props) {
  const [loading, setLoading] = useState(false);
  const adminId = getUser().adminId;
  const password = useFormInput('');
  const repeatPassword = useFormInput('');
  const [error, setError] = useState(null);

  const handleResetPassword = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3001/admin/reset-password', { adminId, password: password.value, repeatPassword: repeatPassword.value })
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/admin/home');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="formfill">
      <div>
        <text>Password: </text>
        <input type="password" {...password}/>
      </div>
      <div>
        <text>Repeat Password: </text>
        <input type="password" {...repeatPassword}/>
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <div>
        <input type="button" className="button" value={loading ? 'Loading...' : 'Reset password'} onClick={handleResetPassword} disabled={loading}/><br />
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default ResetPassword;