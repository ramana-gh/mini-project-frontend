import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/Common';

function AddBook(props) {
  const name = useFormInput('');
  const author = useFormInput('');
  const [authors, setAuthors] = useState([]);
  const edition = useFormInput('');
  const isbn = useFormInput('');
  const totalCopies = useFormInput('');
  const publisher = useFormInput('');
  const tag = useFormInput('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = 'https://department-library-backend.herokuapp.com';

  const handleAddBook = () => {
    setError(null);
    setLoading(true);
    const token = getToken();
    axios.post(`${url}/admin/add-book`, { name: name.value, authors, edition: edition.value, isbn: isbn.value, totalCopies: totalCopies.value, publisher: publisher.value, tags }, {headers: {authorization: `Bearer ${token}`}})
    .then(response => {
      setLoading(false);
      alert(response.data.message);
      props.history.push('/admin/home');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleAuthorAdd = () => {
    setAuthors([...authors,author.value]);
    author.handleModify('');
  }

  const handleAuthorRemove = index => {
    const list = [...authors];
    list.splice(index, 1);
    setAuthors(list);
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
    <div className='formfill'>
      <p style={{ color: 'red', margin: '0px 0px 10px 0px', textAlign: 'center' }}>Note: All fields are mandatory.</p>
      <div>
        <text>Book name: </text>
        <input type="text" {...name}/>
      </div>
      <div>
        <text>Authors: </text>
        <input id = 'authorsInput' type="text" {...author}/>
        <i onClick={handleAuthorAdd} class="fa fa-plus-circle" style={{ 'padding-left': '5px', 'cursor': 'pointer', 'font-size': '30px', 'color': 'white'}}/>
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
      {/* <div id = 'authorsDiv' style={{'padding': '5px 30px 5px 100px'}} ></div> */}
      <div>
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
        <input id = 'tagsInput' type="text" {...tag}/>
        <i onClick={handleTagAdd} class="fa fa-plus-circle" style={{ 'padding-left': '5px', 'cursor': 'pointer', 'font-size': '30px', 'color': 'white'}}/>
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
      {/* <div id = 'tagsDiv' style={{'padding': '5px 30px 5px 100px'}} ></div> */}
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input className='button' type="button" value={loading ? 'Loading...' : 'Add Book'} onClick={handleAddBook} disabled={loading} /><br />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
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

export default AddBook;