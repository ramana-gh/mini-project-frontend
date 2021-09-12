import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken } from '../../Utils/Common';

function GetBook(props) {
  const name = useFormInput('');
  const params = useParams();
  const [authors, setAuthors] = useState([]);
  const author = useFormInput([]);
  const edition = useFormInput('');
  const isbn = useFormInput(params.isbn);
  const totalCopies = useFormInput('');
  const publisher = useFormInput('');
  const [tags, setTags] = useState([]);
  const tag = useFormInput([]);
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
    axios.get(`https://department-library.herokuapp.com/admin/get-book/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
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

  const PopulateValues = (book) => {
    name.handleModify(book.name);
    setAuthors([...book.authors]);
    edition.handleModify(book.edition);
    totalCopies.handleModify(book.totalCopies);
    publisher.handleModify(book.publisher);
    setTags([...book.tags]);
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
    axios.patch('https://department-library.herokuapp.com/admin/update-book', { name: name.value, authors, edition: edition.value, isbn: isbn.value, totalCopies: totalCopies.value, publisher: publisher.value, tags }, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      handleFetch();
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
    setLoading(true);
    axios.delete(`https://department-library.herokuapp.com/admin/delete-book/${isbn.value}`, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/admin/search-books');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const initUpdate = () => {
    setEditMode(true);
  }

  const handleAuthorAdd = () => {
    setAuthors([...authors,author.value]);
    author.handleModify('');
    alert(authors);
  }

  const handleAuthorRemove = index => {
    const list = [...authors];
    list.splice(index, 1);
    setAuthors(list);
    alert(authors);
  };

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
        <div className='formfill' style={{'pointer-events': editMode?'auto':'none'}}>
          <p style={{ color: 'red', margin: '0px 0px 10px 0px', textAlign: 'center' }} hidden={!editMode}>Note: All fields are mandatory.</p>
          <div>
            <text>Book name: </text>
            <input type="text" {...name}/>
          </div>
          <div>
            <text>Authors: </text>
            <div hidden={!editMode} >
              <input id = 'authorsInput' type="text" {...author}/>
              <i onClick={handleAuthorAdd} class="fa fa-plus-circle" style={{ 'padding-left': '5px', 'cursor': 'pointer', 'font-size': '30px', 'color': 'white'}}/>
            </div>
          </div>
          <div style={{'padding': '0px 30px 5px 100px'}} >
            {authors.map((x, i) => {
              return (
                <div className="box" style={{'margin-top': '10px', 'color': 'white', 'display': 'inline-block'}} >
                  <span>
                    {x}
                    <i onClick={()=>handleAuthorRemove(i)} class="fa fa-remove" style={{ 'cursor': 'pointer', 'font-size': '15px'}}/>
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
            <div hidden={!editMode} >
              <input id = 'tagsInput' type="text" {...tag}/>
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
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input className='button' type="button" hidden={!editMode} value={loading ? 'Loading...' : 'Update'} onClick={handleUpdate} disabled={loading} /><br />
        </div>
        <div style={{'position': 'absolute', 'top': '100px', 'right': '408px'}} >
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
          <div class='tooltip' onClick={handleFetch}>
            <i class="fa fa-eye" style={{ 'cursor': 'pointer', 'font-size': '20px', 'color': 'black'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>View Book</p>
          </div>
          <div class='tooltip' onClick={initUpdate}>
            <i class="fa fa-edit" style={{ 'cursor': 'pointer', 'font-size': '22px', 'color': 'white'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Edit Book</p>
          </div>
          <div class='tooltip' onClick={()=>{
              if (window.confirm("Are you sure to delete book?\nThis cannot be undone.")) {
                handleDelete();
              } else {
                alert('Operation canceled.');
              }
              }}>
            <i class="fa fa-trash" style={{ 'cursor': 'pointer', 'font-size': '24px', 'color': 'red'}}/>
            <p style={{margin: '0px'}} class='tooltiptext'>Delete Book</p>
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