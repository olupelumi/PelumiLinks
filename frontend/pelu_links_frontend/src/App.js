import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'


const UrlBlock = ({shortcut, long_url}) =>
{
return (
  <>
  <div>
    {shortcut}
  </div>
  <div>
    {long_url}
  </div>
  </>
)}

function App() {
  // TODO: create ui to show shortcuts and longurls,
  // Then think about how to make the fetched information persist
  // Create a popup for when I want to update a shortcut/url 

  const [urls, setUrls] = useState([]);


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
    {urls.map(
      url => <UrlBlock shortcut={url.shortcut} long_url={url.long_url}/>
    )}
    </>
  );
}

export default App;
