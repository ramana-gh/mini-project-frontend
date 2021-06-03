import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/Common';
import { NavLink } from 'react-router-dom';

function GetFavorites(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    setError(error);
    setLoading(loading);
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get('http://localhost:3001/student/get-favorites', {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      setBooks([...response.data.books]);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div onLoad={handleFetch}>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      <div className='books-fill' >
        <div>
          <h1 className="info" hidden={books.length>0?true:false}>You haven't favorited any books yet.</h1>
        </div>
        <div hidden={books.length>0?false:true}>
          {books.map((x, i) => {
            return (
              <div className="box" style={{'margin': '5px', 'width': '150px', 'background-color': '#555', 'border-radius': '5%', 'display': 'inline-block', 'word-wrap': 'break-word'}} >
                <NavLink exact activeClassName="active" to={"/student/get-book/"+x.isbn}>
                  <div><text style={{'width': '100%'}} >Name: {x.name}</text></div>
                  <div><text style={{'width': '100%'}} >Edition: {x.edition}</text></div>
                  <div><text style={{'width': '100%'}} >Authors: {x.authors}</text></div>
                  <div><text style={{'width': '100%'}} >Publisher: {x.publisher}</text></div>
                  <div><text style={{'width': '100%'}} >Rating: {x.rating}</text></div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GetFavorites;