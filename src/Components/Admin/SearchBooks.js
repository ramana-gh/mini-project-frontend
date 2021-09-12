import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/Common';
import { NavLink } from 'react-router-dom';

function SearchBooks(props) {
  const name = useFormInput('');
  const [ratings, setRatings] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [editions, setEditions] = useState([]);
  const [selectedEditions, setSelectedEditions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = 'https://department-library-backend.herokuapp.com';
  
  const handleInit = () => {
    const token = getToken();
    setLoading(true);
    axios.get(`${url}/admin/get-filters`, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      setRatings([...response.data.ratings]);
      setEditions([...response.data.editions]);
      setTags([...response.data.tags]);
      setAuthors([...response.data.authors]);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleSearch = () => {
    const token = getToken();
    setLoading(true);

    let tagArr = [], authorArr = [], editionArr = [], ratingArr = [];
    for (let r of selectedTags) { while (Array.isArray(r)) r = r[0]; tagArr = [...tagArr, r]; }
    for (let r of selectedAuthors) { while (Array.isArray(r)) r = r[0]; authorArr = [...authorArr, r]; }
    for (let r of selectedEditions) { while (Array.isArray(r)) r = r[0]; editionArr = [...editionArr, r]; }
    for (let r of selectedRatings) { while (Array.isArray(r)) r = r[0]; ratingArr = [...ratingArr, r]; }
    
    axios.post(`${url}/admin/search-books`, {name: name.value, tags: tagArr, authors: authorArr, editions: editionArr, ratings: ratingArr}, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      setBooks([...response.data.books]);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleRatingAdd = index => {
    const list = [...ratings];
    const value = list.splice(index, 1);
    setRatings(list);
    setSelectedRatings([...selectedRatings,value]);
  }

  const handleRatingRemove = index => {
    const list = [...selectedRatings];
    const value = list.splice(index, 1);
    setSelectedRatings(list);
    setRatings([...ratings,value]);
  };

  const handleEditionAdd = index => {
    const list = [...editions];
    const value = list.splice(index, 1);
    setEditions(list);
    setSelectedEditions([...selectedEditions,value]);
  }

  const handleEditionRemove = index => {
    const list = [...selectedEditions];
    const value = list.splice(index, 1);
    setSelectedEditions(list);
    setEditions([...editions,value]);
  };

  const handleTagAdd = index => {
    const list = [...tags];
    const value = list.splice(index, 1);
    setTags(list);
    setSelectedTags([...selectedTags,value]);
  }

  const handleTagRemove = index => {
    const list = [...selectedTags];
    const value = list.splice(index, 1);
    setSelectedTags(list);
    setTags([...tags,value]);
  };

  const handleAuthorAdd = index => {
    const list = [...authors];
    const value = list.splice(index, 1);
    setAuthors(list);
    setSelectedAuthors([...selectedAuthors,value]);
  }

  const handleAuthorRemove = index => {
    const list = [...selectedAuthors];
    const value = list.splice(index, 1);
    setSelectedAuthors(list);
    setAuthors([...authors,value]);
  };

  return (
    <div className='books-fill' onLoad={handleInit} >
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      <div style={{'margin-left': '420px'}} >
        <input type="text" placeholder="Enter book name..." {...name}/>
        <input className='search-button' type="button" value={loading ? 'Loading...' : 'Search'} onClick={handleSearch} disabled={loading} /><br />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      </div>
      <div style={{'margin-left': '320px'}} >
        <text>Filters: </text>
        <div>
          <div class="filter-dropdown" style={{'margin-left': '5px', 'z-index': '1'}} >
            <button class="filter-dropbtn">Rating</button>
            <div class="filter-dropdown-content">
              {ratings.map((x, i) => {
                return (
                  <div className="box" >
                    <text onClick={()=>handleRatingAdd(i)} >{x}</text>
                  </div>
                );
              })}
            </div>
          </div> 
          <div class="filter-dropdown" style={{'margin-left': '5px', 'z-index': '1'}} >
            <button class="filter-dropbtn">Edition</button>
            <div class="filter-dropdown-content">
              {editions.map((x, i) => {
                return (
                  <div className="box" >
                    <text onClick={()=>handleEditionAdd(i)} >{x}</text>
                  </div>
                );
              })}
            </div>
          </div> 
          <div class="filter-dropdown" style={{'margin-left': '5px', 'z-index': '1'}} >
            <button class="filter-dropbtn">Tag</button>
            <div class="filter-dropdown-content">
              {tags.map((x, i) => {
                return (
                  <div className="box" >
                    <text onClick={()=>handleTagAdd(i)} >{x}</text>
                  </div>
                );
              })}
            </div>
          </div> 
          <div class="filter-dropdown" style={{'margin-left': '5px', 'z-index': '1'}} >
            <button class="filter-dropbtn">Author</button>
            <div class="filter-dropdown-content">
              {authors.map((x, i) => {
                return (
                  <div className="box" >
                    <text onClick={()=>handleAuthorAdd(i)} >{x}</text>
                  </div>
                );
              })}
            </div>
          </div> 
        </div>
        <div>
          <div style={{'margin-left': '0px', 'position': 'relative', 'display': 'inline-block', 'min-width': '110px'}} >
            {selectedRatings.map((x, i) => {
              return (
                <div className="box" style={{'margin': '5px', 'width': '100px'}} >
                  <span>
                    {x}
                    <i onClick={()=>handleRatingRemove(i)} class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{'margin-left': '5px', 'position': 'relative', 'display': 'inline-block', 'min-width': '110px'}} >
            {selectedEditions.map((x, i) => {
              return (
                <div className="box" style={{'margin': '5px', 'width': '100px'}} >
                  <span>
                    {x}
                    <i onClick={()=>handleEditionRemove(i)} class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{'margin-left': '5px', 'position': 'relative', 'display': 'inline-block', 'min-width': '110px'}} >
            {selectedTags.map((x, i) => {
              return (
                <div className="box" style={{'margin': '5px', 'width': '100px'}} >
                  <span>
                    {x}
                    <i onClick={()=>handleTagRemove(i)} class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{'margin-left': '5px', 'position': 'relative', 'display': 'inline-block', 'min-width': '110px'}} >
            {selectedAuthors.map((x, i) => {
              return (
                <div className="box" style={{'margin': '5px', 'width': '100px'}} >
                  <span>
                    {x}
                    <i onClick={()=>handleAuthorRemove(i)} class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {books.map((x, i) => {
          return (
            <div className="box" style={{'margin': '5px', 'width': '150px', 'background-color': '#555', 'border-radius': '5%', 'display': 'inline-block', 'word-wrap': 'break-word'}} >
              <NavLink exact activeClassName="active" to={"/admin/get-book/"+x.isbn}>
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

export default SearchBooks;