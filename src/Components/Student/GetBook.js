import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken } from '../../Utils/Common';

function GetBook(props) {
  const name = useFormInput('');
  const params = useParams();
  const [authors, setAuthors] = useState([]);
  const edition = useFormInput('');
  const isbn = useFormInput(params.isbn);
  const totalCopies = useFormInput('');
  const publisher = useFormInput('');
  const days = useFormInput('');
  const reason = useFormInput('');
  const [ratings, setRatings] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(true);
  const [addOrderMode, setAddOrderViewMode] = useState(false);
  const [extendOrderMode, setExtendOrderMode] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [unordered, setUnordered] = useState(true);
  const [ordered, setOrdered] = useState(false);
  const [extended, setExtended] = useState(false);

  const handleFetch = () => {
    setViewMode(true);
    setAddOrderViewMode(false);
    setExtendOrderMode(false);
    setError(error);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`http://localhost:3001/student/get-book/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      handleFetchFavorite();
      handleFetchOrder();
      PopulateValues(response.data.book);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const PopulateValues = (book) => {
    name.handleModify(book.name);
    setAuthors([...book.authors]);
    edition.handleModify(book.edition);
    totalCopies.handleModify(book.totalCopies);
    publisher.handleModify(book.publisher);
    let r = [];
    for (let i = 0; i < book.rating; ++i)
      r = [...r, i];
    setRatings(r);
    setTags([...book.tags]);
  }

  const handleFetchFavorite = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get(`http://localhost:3001/student/check-favorite/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setFavorite(response.data.value);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later. favorite");
    });
  }

  const handleFetchOrder = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`http://localhost:3001/student/get-order/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setUnordered(response.data.order.returned||response.data.order.canceled);
      setOrdered(!(response.data.order.returned||response.data.order.canceled)&&!response.data.order.extended);
      setExtended(!(response.data.order.returned||response.data.order.canceled)&&response.data.order.extended);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later. order");
    });
  }

  const handleAddFavorite = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post('http://localhost:3001/student/add-favorite', {isbn: isbn.value}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      handleFetch();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleRemoveFavorite = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.delete(`http://localhost:3001/student/remove-favorite/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      handleFetch();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleAddOrder = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post('http://localhost:3001/student/order-book', {isbn: isbn.value, days: days.value}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      days.handleModify('');
      reason.handleModify('');
      handleFetch();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) {
        setError(error.response.data.message);
        alert(error.response.data.message);
        handleFetch();
      } else setError("Something went wrong. Please try again later.");
    });
  }

  const handleExtendOrder = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.patch('http://localhost:3001/student/extend-order', {isbn: isbn.value, days: days.value, reason: reason.value}, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      days.handleModify('');
      reason.handleModify('');
      handleFetch();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleRemoveOrder = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.delete(`http://localhost:3001/student/cancel-order/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      setLoading(false);
      alert(response.data.message);
      handleFetch();
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const initAddOrderMode = () => {
    setViewMode(false);
    setAddOrderViewMode(true);
    setExtendOrderMode(false);
  }

  const initExtendOrderMode = () => {
    setViewMode(false);
    setAddOrderViewMode(false);
    setExtendOrderMode(true);
  }

  return (
      <div onLoad={handleFetch}>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div className='formfill' hidden={!viewMode} style={{'pointer-events': 'none'}}>
          <div>
            <text>Book name: </text>
            <input type="text" {...name}/>
          </div>
          <div>
            <text>Authors: </text>
          </div>
          <div>
            {authors.map((x, i) => {
              return (
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}}>
                  <span>
                    {x}
                    <i class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{'display': 'inline-block'}} >
            <text>Edition: </text>
            <input type="text" {...edition}/>
          </div>
          <div>
            <text>Rating: </text>
          </div>
          <div>
            {ratings.map((x, i) => {
              return (
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}}>
                  &#x2b50;
                </div>
              );
            })}
          </div>
          <div style={{'display': 'inline-block'}} >
            <text>ISBN: </text>
            <input type="text" {...isbn}/>
          </div>
          <div>
            <text>Total copies: </text>
            <input type="text" {...totalCopies}/>
          </div>
          <div>
            <text>Publisher: </text>
            <input type="text" {...publisher}/>
          </div>
          <div>
            <text>Tags: </text>
          </div>
          <div style={{'padding': '0px 30px 5px 100px'}} >
            {tags.map((x, i) => {
              return (
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}}>
                  <span>
                    {x}
                    <i class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        </div>
        <div className='formfill' hidden={!addOrderMode}>
          <div style={{'pointer-events': 'none'}}>
            <text>Book name: </text>
            <input type="text" {...name}/>
          </div>
          <div>
            <text>Days: </text>
            <input type="text" {...days}/>
          </div>
          <div style={{'margin-top': '10px'}}>
            <input className='button' type="button" value={loading ? 'Loading...' : 'Order'} onClick={handleAddOrder} disabled={loading} /><br />
          </div>
        </div>
        <div className='formfill' hidden={!extendOrderMode}>
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
            <input className='button' type="button" value={loading ? 'Loading...' : 'Extend'} onClick={handleExtendOrder} disabled={loading} /><br />
          </div>
        </div>
        <div style={{'position': 'absolute', 'top': '100px', 'right': '408px'}} >
          <div class='tooltip' onClick={handleFetch}>
            <i class="fa fa-eye" style={{ 'cursor': 'pointer', 'font-size': '20px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>View Book</p>
          </div>
          <div hidden={favorite} class='tooltip' onClick={handleAddFavorite}>
            <i class="fa fa-star" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Add Favorite</p>
          </div>
          <div hidden={!favorite} class='tooltip' onClick={handleRemoveFavorite}>
            <i class="fa fa-star" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'yellow'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Remove Favorite</p>
          </div>
          <div hidden={!unordered} class='tooltip' onClick={initAddOrderMode}>
            <i class="fa fa-shopping-cart" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Add Order</p>
          </div>
          <div hidden={!ordered} class='tooltip' onClick={initExtendOrderMode}>
            <i class="fa fa-shopping-cart" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'blue'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Extend Order</p>
          </div>
          <div hidden={!extended} class='tooltip' onClick={handleRemoveOrder}>
            <i class="fa fa-shopping-cart" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'orange'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Cancel Order</p>
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

export default GetBook;