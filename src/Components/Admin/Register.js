import React, { useState } from 'react';
import axios from 'axios';

function Register(props) {
  const adminId = useFormInput('');
  const name = useFormInput('');
  const mobile = useFormInput('');
  const email = useFormInput('');
  const address = useFormInput('');
  const password = useFormInput('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3001/admin/register', { adminId: adminId.value, name: name.value, mobile: mobile.value, email: email.value, address: address.value, password: password.value })
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/admin/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className='formfill'>
      <p style={{ color: 'red', margin: '0px 0px 10px 0px', textAlign: 'center' }}>Note: All fields are mandatory.</p>
      <div>
        <text>Admin ID: </text>
        <input type="text" {...adminId}/>
      </div>
      <div>
        <text>Name: </text>
        <input type="text" {...name}/>
      </div>
      <div>
        <text>Mobile: </text>
        <input type="text" {...mobile}/>
      </div>
      <div>
        <text>Email: </text>
        <input type="text" {...email}/>
      </div>
      <div>
        <text>Address: </text>
        <input type="text" {...address}/>
      </div>
      <div>
        <text>Password: </text>
        <input type="password" {...password}/>
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input className='button' type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => setValue(e.target.value);
  return {
    value,
    onChange: handleChange
  }
}

export default Register;