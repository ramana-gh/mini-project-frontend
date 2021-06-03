import React, { useState } from 'react';
import axios from 'axios';
import { getToken, removeUserSession } from '../../Utils/Common';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  const facultyId = useFormInput('');
  const name = useFormInput('');
  const qualification = useFormInput('');
  const subjectsTaught = useFormInput('');
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
    axios.get(`http://localhost:3001/faculty/get-profile`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      PopulateValues(response.data.user);
      setLoading(false);
      props.history.push('/faculty/profile');
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const PopulateValues = (faculty) => {
    facultyId.handleModify(faculty.facultyId);
    name.handleModify(faculty.name);
    qualification.handleModify(faculty.qualification);
    subjectsTaught.handleModify(faculty.subjectsTaught);
    mobile.handleModify(faculty.mobile);
    email.handleModify(faculty.email);
    address.handleModify(faculty.address);
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
    axios.patch('http://localhost:3001/faculty/update-profile', { facultyId: facultyId.value, name: name.value, mobile: mobile.value, email: email.value, address: address.value }, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/faculty/profile');
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
    axios.delete('http://localhost:3001/faculty/delete-account', {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/faculty/delete');
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
          <p>Click <NavLink exact activeClassName="active" to="/faculty/reset-password">Here</NavLink> to change password.</p>
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