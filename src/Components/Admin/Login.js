import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';

function Login(props) {
  const adminId = useFormInput('');
  const password = useFormInput('');
  const repeatPassword = useFormInput('');
  const otp = useFormInput('');
  const [requestId, setRequestId] = useState('');
  const [message, setMessage] = useState(null);
  const [mobile, setMobile] = useState(0);
  const [myTimeout, setMyTimeout] = useState(null);
  const [myInterval, setMyInterval] = useState(null);
  const [loginState, setLoginState] = useState(false);
  const [forgotState, setForgotState] = useState(true);
  const [otpState, setOtpState] = useState(true);
  const [resetState, setResetState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let time = null;
  const url = 'https://department-library-backend.herokuapp.com';

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(`${url}/admin/login`, { adminId: adminId.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      alert(response.data.message);
      setTimeout(() => {
        alert('Session expired.\nPlease Login again.');
        props.history.push('/admin/logout');
      }, 3600000);
      props.history.push('/admin/home');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const setView = (login, forgot, otp, reset) => {
    setLoginState(login);
    setForgotState(forgot);
    setOtpState(otp);
    setResetState(reset);
  }

  const handleForgotClick = () => {
    setMessage('Enter ID to continue.');
    setView(true, false, true, true);
  }

  const handleForgotPassword = () => {
    setError(null);
    setLoading(true);
    axios.post(`${url}/admin/forgot-password`, { adminId: adminId.value })
    .then(response => {
      setLoading(false);
      setMobile(response.data.mobile);
      handleSendOtp(response.data.mobile);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleSendOtp = (mobile) => {
    setError(null);
    setLoading(true);
    clearTimeout(myTimeout);
    clearInterval(myInterval);
    axios.post(`${url}/admin/send-otp`, { mobile })
    .then(response => {
      setLoading(false);
      setRequestId(response.data.request_id);
      handleSetRequestId(response.data.request_id);
      const msg = `Verify OTP sent to *******${mobile%1000} to proceed.`; 
      time = 60;
      setMyInterval(setInterval(()=>{
        if (time < 2)
          clearInterval(myInterval);
        else
          setMessage(msg+' '+--time+' seconds left.');
      }, 1000));
      setMyTimeout(setTimeout(() => {
        setMessage('Timeout! Try Again.');
        clearInterval(myInterval);
      }, 60000));
      setView(true, true, false, true);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleSetRequestId = (reqId) => {
    setRequestId(reqId);
  }

  const handleResendOtp = () => {
    handleSendOtp(mobile);
  }

  const handleVerifyOtp = () => {
    setError(null);
    setLoading(true);
    axios.post(`${url}/admin/verify-otp`, { otp: otp.value, requestId })
    .then(response => {
      setLoading(false);
      if (response.status === 200) {
        clearTimeout(myTimeout);
        clearInterval(myInterval);
        time = null;
        setMessage(null);
        alert(response.data.message);
        setView(true, true, true, false);
      }
      else {
        setMessage('Verification failed!');
      }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleResetPassword = () => {
    setError(null);
    setLoading(true);
    axios.post(`${url}/admin/reset-password`, { adminId: adminId.value, password: password.value, repeatPassword: repeatPassword.value })
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/admin/reset');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="formfill">
      <div hidden={!loginState?false:!forgotState?false:true} >
        <text>Admin ID: </text>
        <input type="text" {...adminId}/>
      </div>
      <div hidden={!loginState?false:!resetState?false:true} >
        <text>Password: </text>
        <input type="password" {...password}/>
      </div>
      <div hidden={resetState} >
        <text>Repeat Password: </text>
        <input type="password" {...repeatPassword}/>
      </div>
      <div hidden={otpState} >
        <text>OTP: </text>
        <input type="text" {...otp}/>
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <div hidden={loginState} >
        <input type="button" className="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}/><br />
      </div>
      <div hidden={loginState}>
        <input type="button" className="smallButton" value='Forgot password' onClick={handleForgotClick}/><br />
      </div>
      <div hidden={forgotState}>
        <input type="button" className="button" value={loading ? 'Loading...' : 'Continue'} onClick={handleForgotPassword} disabled={loading}/><br />
      </div>
      <div hidden={otpState}>
        <input type="button" className="button" value={loading ? 'Loading...' : 'Verify OTP'} onClick={handleVerifyOtp} disabled={loading}/><br />
      </div>
      <div hidden={otpState}>
        <input type="button" className="smallButton" value='Resend OTP' onClick={handleResendOtp} disabled={loading}/><br />
      </div>
      <div  hidden={resetState}>
        <input type="button" className="button" value={loading ? 'Loading...' : 'Reset password'} onClick={handleResetPassword} disabled={loading}/><br />
      </div>
      {message && <><small style={{ color: 'white' }}>{message}</small><br /></>}<br />
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

export default Login;