import React, { useState } from 'react';
import axios from 'axios';
import { getToken, removeUserSession } from '../../Utils/Common';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  const studentId = useFormInput('');
  const name = useFormInput('');
  const joinYear = useFormInput('');
  const sem = useFormInput('');
  const Class = useFormInput('');
  const mobile = useFormInput('');
  const email = useFormInput('');
  const address = useFormInput('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleFetch = () => {
    setEditMode(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`https://department-library.herokuapp.com/student/get-profile`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      PopulateValues(response.data.user);
      setLoading(false);
      props.history.push('/student/profile');
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const PopulateValues = (student) => {
    studentId.handleModify(student.studentId);
    name.handleModify(student.name);
    joinYear.handleModify(student.joinYear);
    sem.handleModify(student.sem);
    Class.handleModify(student.class);
    mobile.handleModify(student.mobile);
    email.handleModify(student.email);
    address.handleModify(student.address);
  }

  const handleUpdate = () => {
    setEditMode(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.patch('https://department-library.herokuapp.com/student/update-profile', { studentId: studentId.value, name: name.value, mobile: mobile.value, email: email.value, address: address.value }, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/student/profile');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
    handleFetch();
  }

  const handleDelete = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    removeUserSession();
    setLoading(true);
    axios.delete('https://department-library.herokuapp.com/student/delete-account', {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/student/delete');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });

  }

  const initUpdate = () => {
    setEditMode(true);
  }

  return (
      <div onLoad={handleFetch}>
        <div className='formfill' style={{'pointer-events': editMode?'auto':'none'}}>
          <p style={{ color: 'red', margin: '0px 0px 10px 0px', textAlign: 'center' }}>Note: All fields are mandatory.</p>
          <div>
            <text>Student ID: </text>
            <input type="text" {...studentId}/>
          </div>
          <div>
            <text>Name: </text>
            <input type="text" {...name}/>
          </div>
          <div>
            <text>Join Year: </text>
            <input type="text" {...joinYear}/>
          </div>
          <div>
            <text>Semester: </text>
            <input type="text" {...sem}/>
          </div>
          <div>
            <text>Class: </text>
            <input type="text" {...Class}/>
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
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input className='button' type="button" hidden={!editMode} value={loading ? 'Loading...' : 'Update'} onClick={handleUpdate} disabled={loading} /><br />
        </div>
        <div style={{'position': 'absolute', 'top': '100px', 'right': '408px'}} >
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
          <div class='tooltip' onClick={handleFetch}>
            <i class="fa fa-eye" style={{ 'cursor': 'pointer', 'font-size': '20px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>View Profile</p>
          </div>
          <div class='tooltip' onClick={initUpdate}>
            <i class="fa fa-edit" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'white'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Edit Profile</p>
          </div>
          <div class='tooltip' onClick={()=>{
              if (window.confirm("Are you sure to delete your account?\nThis cannot be undone.")) {
                handleDelete();
              } else {
                alert('Operation canceled.');
              }
              }}>
            <i class="fa fa-trash" style={{ 'cursor': 'pointer', 'font-size': '24px', 'color': 'red'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Delete Account</p>
          </div>
        </div>
        <div className='info'  style={{color: 'Brown'}}>
          <p>Click <NavLink exact activeClassName="active" to="/student/reset-password">Here</NavLink> to change password.</p>
          <p>It is advised to change your password atleast once a month.</p>
        </div>
      </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  const handleModify = (val) => {
    setValue(val);
  }
  return {
    value,
    handleModify,
    onChange: handleChange
  }
}

export default Profile;