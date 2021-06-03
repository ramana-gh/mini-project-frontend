import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/Common';

function Orders(props) {
  const name = useFormInput('');
  const days = useFormInput('');
  const reason = useFormInput('');
  const isbn = useFormInput('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(0);
  const [extend, setExtend] = useState(false);
  const [flag, setFlag] = useState(1);

  const handleFetchNewOrders = () => {
    setSelected(1);
    setExtend(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`https://department-library.herokuapp.com/student/get-new-orders`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setOrders(response.data.orders);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleFetchExtendRequestedOrders = () => {
    setSelected(2);
    setExtend(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`https://department-library.herokuapp.com/student/get-extend-requested-orders`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setOrders(response.data.orders);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleFetchSubmissionNearingOrders = () => {
    setSelected(3);
    setExtend(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`https://department-library.herokuapp.com/student/get-submission-nearing-orders`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setOrders(response.data.orders);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleFetchAcceptedOrders = () => {
    setSelected(4);
    setExtend(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`https://department-library.herokuapp.com/student/get-accepted-orders`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setOrders(response.data.orders);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleFetchReturnedOrders = () => {
    setSelected(5);
    setExtend(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`https://department-library.herokuapp.com/student/get-returned-orders`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setOrders(response.data.orders);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleCancelOrder = (isbn, flag) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.delete(`https://department-library.herokuapp.com/student/cancel-order/${isbn}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      if (flag === 1) handleFetchNewOrders();
      else if (flag ===2) handleFetchExtendRequestedOrders();
      else if (flag ===3) handleFetchSubmissionNearingOrders();
      else if (flag ===4) handleFetchAcceptedOrders();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleInitOrderExtension = (newIsbn, newName, flag) => {
    isbn.handleModify(newIsbn);
    name.handleModify(newName);
    setFlag(flag);
    setExtend(true);
  }

  const handleRequestOrderExtension = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.patch('https://department-library.herokuapp.com/student/extend-order', {isbn: isbn.value, days: days.value, reason: reason.value}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      days.handleModify('');
      reason.handleModify('');
      setExtend(false);
      if (flag === 3) handleFetchSubmissionNearingOrders();
      else if (flag === 4) handleFetchAcceptedOrders();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
      <div onLoad={handleFetchNewOrders}>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div className='header-full'>
            <div className='order-menu'>
                <div className='order-menu-item' onClick={handleFetchNewOrders} style={{ 'background-color': selected===1?'rgb(105, 4, 105)':''}}>New Orders</div>
                <div className='order-menu-item' onClick={handleFetchExtendRequestedOrders} style={{ 'background-color': selected===2?'rgb(105, 4, 105)':''}}>Extend Requested Orders</div>
                <div className='order-menu-item' onClick={handleFetchSubmissionNearingOrders} style={{ 'background-color': selected===3?'rgb(105, 4, 105)':''}}>Submission Nearing Orders</div>
                <div className='order-menu-item' onClick={handleFetchAcceptedOrders} style={{ 'background-color': selected===4?'rgb(105, 4, 105)':''}}>Accepted Orders</div>
                <div className='order-menu-item' onClick={handleFetchReturnedOrders} style={{ 'background-color': selected===5?'rgb(105, 4, 105)':''}}>Returned Orders</div>
            </div>
        </div>
        <div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <div><h1 className="info" hidden={!selected===0?true:false}>Select Any Tab.</h1></div>
            <div><h1 className="info" hidden={orders.length>0?true:false}>No Orders.</h1></div>
            <div hidden={extend}>
                {orders.map((x, i) => {
                return (
                    <div className="box" style={{'margin': '5px', 'width': '150px', 'background-color': '#555', 'border-radius': '5%', 'display': 'inline-block', 'word-wrap': 'break-word'}} >
                        <div><text style={{'width': '100%'}} >Book Name: {x.name}</text></div>
                        <div><text style={{'width': '100%'}} >Edition: {x.edition}</text></div>
                        <div><text style={{'width': '100%'}} >Authors: {x.authors}</text></div>
                        <div><text style={{'width': '100%'}} >Days: {x.days}</text></div>
                        <div hidden={selected===1?false:true}>
                            <input className='red-button' type="button" value={loading ? 'Loading...' : 'Cancel Order'} onClick={()=>handleCancelOrder(x.isbn, 1)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                        <div hidden={selected===2?false:true}>
                            <input className='red-button' type="button" value={loading ? 'Loading...' : 'Cancel Order'} onClick={()=>handleCancelOrder(x.isbn, 2)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                        <div hidden={selected===3?false:true}>
                            <input className='blue-button' type="button" value={loading ? 'Loading...' : 'Extend Order'} onClick={()=>handleInitOrderExtension(x.isbn, x.name, 3)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                            <input className='red-button' type="button" value={loading ? 'Loading...' : 'Cancel Order'} onClick={()=>handleCancelOrder(x.isbn, 3)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                        <div hidden={selected===4?false:true}>
                            <input className='blue-button' type="button" value={loading ? 'Loading...' : 'Extend Order'} onClick={()=>handleInitOrderExtension(x.isbn, x.name, 4)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                            <input className='red-button' type="button" value={loading ? 'Loading...' : 'Cancel Order'} onClick={()=>handleCancelOrder(x.isbn, 4)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                    </div>
                );
                })}
            </div>
            <div className='formfill' hidden={!extend}>
              <div style={{'pointer-events': 'none'}}>
                <text>Book name: </text>
                <input type="text" {...name}/>
              </div>
              <div>
                <text>Days: </text>
                <input type="text" {...days}/>
              </div>
              <div>
                <text>Reason: </text>
                <input type="text" {...reason}/>
              </div>
              <div style={{'margin-top': '10px'}}>
                <input className='button' type="button" value={loading ? 'Loading...' : 'Extend'} onClick={handleRequestOrderExtension} disabled={loading} /><br />
              </div>
            </div>
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

export default Orders;