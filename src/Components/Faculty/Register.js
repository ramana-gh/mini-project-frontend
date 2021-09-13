import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

function Register(props) {
  const facultyId = useFormInput('');
  const name = useFormInput('');
  const qualification = useFormInput('');
  const subjectsTaught = useFormInput('');
  const mobile = useFormInput('');
  const email = useFormInput('');
  const address = useFormInput('');
  const password = useFormInput('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setError(null);
    setLoading(true);
    axios.post(`${baseUrl}/faculty/register`, { facultyId: facultyId.value, name: name.value, qualification: qualification.value, subjectsTaught: subjectsTaught.value, mobile: mobile.value, email: email.value, address: address.value, password: password.value })
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/faculty/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className='formfill'>
      <div>
        <text>Faculty ID: </text>
        <input type="text" {...facultyId}/>
      </div>
      <div>
        <text>Name: </text>
        <input type="text" {...name}/>
      </div>
      <div>
        <text>Qualification: </text>
        <input type="text" {...qualification}/>
      </div>
      <div>
        <text>Subjects Taught: </text>
        <input type="text" {...subjectsTaught}/>
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
      <input className="button" type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
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