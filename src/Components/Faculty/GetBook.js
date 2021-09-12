import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken, getUser } from '../../Utils/Common';

function GetBook(props) {
  const name = useFormInput('');
  const params = useParams();
  const [authors, setAuthors] = useState([]);
  const edition = useFormInput('');
  const isbn = useFormInput(params.isbn);
  const totalCopies = useFormInput('');
  const publisher = useFormInput('');
  const rating = useFormInput('');
  const [tags, setTags] = useState([]);
  const tag = useFormInput([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(true);
  const [rateMode, setRateMode] = useState(false);
  const [tagMode, setTagMode] = useState(false);
  const url = 'https://department-library-backend.herokuapp.com';

  const handleFetch = () => {
    setViewMode(true);
    setRateMode(false);
    setTagMode(false);
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${url}/faculty/get-book/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      PopulateValues(response.data.book);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleFetchRating = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.get(`${url}/faculty/get-rating/${isbn.value}/${getUser().facultyId}`, {headers: {authorization: `Bearer ${token}`}})
    .then((response) => {
      rating.handleModify(response.data.rating);
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
    setTags([...book.tags]);
  }

  const handleRatingUpdate = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${url}/faculty/rate-book`, { isbn: isbn.value, rating: rating.value }, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      handleFetch();
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleTagsUpdate = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    axios.post(`${url}/faculty/tag-book`, { isbn: isbn.value, tags }, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      handleFetch();
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const initRateMode = () => {
    handleFetchRating();
    setViewMode(false);
    setTagMode(false);
    setRateMode(true);
  }

  const initTagMode = () => {
    setViewMode(false);
    setRateMode(false);
    setTagMode(true);
  }

  const handleTagAdd = () => {
    setTags([...tags,tag.value]);
    tag.handleModify('');
  }

  const handleTagRemove = index => {
    const list = [...tags];
    list.splice(index, 1);
    setTags(list);
  };

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
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}} >
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
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}} >
                  <span>
                    {x}
                    <i class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='formfill' hidden={!rateMode}>
          <div style={{'pointer-events': 'none'}}>
            <text>Book name: </text>
            <input type="text" {...name}/>
          </div>
          <div>
            <text>Edit Rating: </text>
            <input type="text" {...rating}/>
          </div>
          <div style={{'margin-top': '10px'}}>
            <input className='button' type="button" value={loading ? 'Loading...' : 'Update'} onClick={handleRatingUpdate} disabled={loading} /><br />
          </div>
        </div>
        <div className='formfill' hidden={!tagMode}>
          <div style={{'pointer-events': 'none'}}>
            <text>Book name: </text>
            <input type="text" {...name}/>
          </div>
          <div>
            <text>Add Tag: </text>
            <div>
              <input type="text" {...tag}/>
              <i onClick={handleTagAdd} class="fa fa-plus-circle" style={{ 'padding-left': '5px', 'cursor': 'pointer', 'font-size': '30px', 'color': 'white'}}/>
            </div>
          </div>
          <div style={{'padding': '0px 30px 5px 100px'}} >
            {tags.map((x, i) => {
              return (
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}} >
                  <span>
                    {x}
                    <i onClick={()=>handleTagRemove(i)} class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{'margin-top': '10px'}}>
            <input className='button' type="button" value={loading ? 'Loading...' : 'Update'} onClick={handleTagsUpdate} disabled={loading} /><br />
          </div>
        </div>
        <div>          
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        </div>
        <div style={{'position': 'absolute', 'top': '100px', 'right': '408px'}} >
          <div class='tooltip' onClick={handleFetch}>
            <i class="fa fa-eye" style={{ 'cursor': 'pointer', 'font-size': '20px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>View Book</p>
          </div>
          <div class='tooltip' onClick={initRateMode}>
            <i class="fa fa-star" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Rate Book</p>
          </div>
          <div class='tooltip' onClick={initTagMode}>
            <i class="fa fa-tag" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Tag Book</p>
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