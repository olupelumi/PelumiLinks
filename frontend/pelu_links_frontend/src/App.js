import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  // TODO: fetch shorcut information, create ui to show shortcuts and longurls,
  // Have the proper shortcuts and urls actually show up in the ui
  // Then think about how to make the fetched information persist

  const [urls, setUrls] = useState();

  // TODO fix cors error from the below code

  useEffect(() => {
    axios.get('http://127.0.0.1:3000')
      .then(response => {
        setUrls(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <>
    <h1>Pelumi Links</h1>
    <div>
      hi there
      <input></input>
      <input></input>
    </div>
    </>
  );
}

export default App;
