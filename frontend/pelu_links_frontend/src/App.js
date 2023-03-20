import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'


const UrlBlock = ({shortcut, long_url, setShowEdit}) =>
{
return (
  <div className='urlBlock'>
  <div>
    {shortcut}
  </div>
  <div>
    {long_url}
  </div>
 <button onClick={()=> setShowEdit({shortcut, long_url})}>
  edit
  </button> 
  </div>
)}

const UrlEdit = ({shortcut, long_url, setShowEdit}) => {
  const [longUrl, setLongUrl] = useState(long_url)
  return (
    <div>
      <div>
        Shortcut: {shortcut}
      </div>
      <div>
        Long Url: <input value={longUrl} onChange={(e)=> setLongUrl(e.target.value) }></input>
      </div>
      <button onClick={() => setShowEdit(false)}>close</button>
    </div>
  ) 
}

const Page = (props) => {
  return (
    <div style={{margin: 'auto 20px auto 20px'}}>
      {props.children}
    </div>
  )
}

function App() {
  // Add a size length for shortcuts and show the long urls up to a certain length
  // Then think about how to make the fetched information persist
  // Create a popup for when I want to update a shortcut/url
  // Make the ui actially look nice 

  const [urls, setUrls] = useState([]);
  const [showEdit, setShowEdit] = useState(false)

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
    <Page>
    <h1>Pelumi Links</h1>
    <div className='urlTableHeader'>
      <div>Shortcuts</div><div>Long Urls</div>
    </div>
    {urls.map(
      url => <UrlBlock key={url.shortcut} shortcut={url.shortcut} long_url={url.long_url} setShowEdit={setShowEdit}/>
    )}
    {showEdit && <UrlEdit shortcut={showEdit.shortcut} long_url={showEdit.long_url} setShowEdit={setShowEdit}/>}
    </Page>
  );
}

export default App;
