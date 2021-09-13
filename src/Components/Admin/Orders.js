import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/Common';
import { baseUrl } from '../../shared/baseUrl';

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(0);

  const handleFetchNewOrders = () => {
    setSelected(1);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${baseUrl}/admin/get-new-orders`, {headers: {authorization: `Bearer ${token}`}})
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
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${baseUrl}/admin/get-extend-requested-orders`, {headers: {authorization: `Bearer ${token}`}})
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
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${baseUrl}/admin/get-submission-nearing-orders`, {headers: {authorization: `Bearer ${token}`}})
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
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${baseUrl}/admin/get-accepted-orders`, {headers: {authorization: `Bearer ${token}`}})
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
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${baseUrl}/admin/get-returned-orders`, {headers: {authorization: `Bearer ${token}`}})
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

  const handleAcceptOrder = (isbn, orderedBy, name) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${baseUrl}/admin/accept-order`, {isbn, studentId: orderedBy}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      handleFetchNewOrders();
      const message = `Dear student. Order accepted for the following book:\nBook Name: ${name}\nISBN: ${isbn}.`;
      handleSendMessage(orderedBy, message);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 403) setError('Already accepted.');
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleAcceptExtendOrder = (isbn, orderedBy, name) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${baseUrl}/admin/accept-extend-order`, {isbn, studentId: orderedBy}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      handleFetchExtendRequestedOrders();
      const message = `Dear student. Order extension accepted for the following book:\nBook Name: ${name}\nISBN: ${isbn}.`;
      handleSendMessage(orderedBy, message);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleRejectExtendOrder = (isbn, orderedBy, name) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${baseUrl}/admin/reject-extend-order`, {isbn, studentId: orderedBy}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      const message = `Dear student. Order extension rejected for the following book:\nBook Name: ${name}\nISBN: ${isbn}.`;
      handleFetchExtendRequestedOrders();
      handleSendMessage(orderedBy, message);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleSubmissionAlert = (isbn, orderedBy, name) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${baseUrl}/admin/send-message`, {studentId: orderedBy}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      const message = `Dear Student submission nearing for the following book:\nBook Name: ${name}\nISBN: ${isbn}.\nSubmission due in 5 days.`;
      handleSendMessage(orderedBy, message);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleBookReturned = (isbn, orderedBy) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${baseUrl}/admin/book-returned`, {isbn, studentId: orderedBy}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      handleFetchAcceptedOrders();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleSendMessage = (id, message) => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${baseUrl}/admin/send-message`, {studentId: id, message}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message[0]);
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
            <div><h1 style={{color: 'yellow'}} className="info" hidden={orders.length>0?true:false}>No Orders.</h1></div>
            <div>
                {orders.map((x, i) => {
                return (
                    <div className="box" style={{'margin': '5px', 'width': '150px', 'background-color': '#555', 'border-radius': '5%', 'display': 'inline-block', 'word-wrap': 'break-word'}} >
                        <div><text style={{'width': '100%'}} >Book Name: {x.name}</text></div>
                        <div><text style={{'width': '100%'}} >Edition: {x.edition}</text></div>
                        <div><text style={{'width': '100%'}} >Authors: {x.authors}</text></div>
                        <div><text style={{'width': '100%'}} >Ordered By: {x.orderedBy}</text></div>
                        <div><text style={{'width': '100%'}} >Days: {x.days}</text></div>
                        <div hidden={selected===1?false:true}>
                            <input className='green-button' type="button" value={loading ? 'Loading...' : 'Accept Order'} onClick={()=>handleAcceptOrder(x.isbn, x.orderedBy, x.name)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                        <div hidden={selected===2?false:true}>
                            <input className='green-button' type="button" value={loading ? 'Loading...' : 'Accept Extension'} onClick={()=>handleAcceptExtendOrder(x.isbn, x.orderedBy, x.name)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                            <input className='red-button' type="button" value={loading ? 'Loading...' : 'Reject Extension'} onClick={()=>handleRejectExtendOrder(x.isbn, x.orderedBy, x.name)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                        <div hidden={selected===3?false:true}>
                            <input className='red-button' type="button" value={loading ? 'Loading...' : 'Send Alert'} onClick={()=>handleSubmissionAlert(x.isbn, x.orderedBy, x.name)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                        <div hidden={selected===4?false:true}>
                            <input className='green-button' type="button" value={loading ? 'Loading...' : 'Book Returned'} onClick={()=>handleBookReturned(x.isbn, x.orderedBy)} disabled={loading} style={{'margin': '5px', 'width': '90%'}}/><br />
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
      </div>
  );
}

export default Orders;