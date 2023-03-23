import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'


const UrlBlock = ({shortcut, long_url, setShowEdit, setShowDelete}) =>
{
  const [isOpen, setIsOpen] = useState(false)
return (
  <>
  <div className='urlBlock'>
    <div>
      {shortcut}
    </div>
    <div>
      {long_url}
    </div>
    <div style={{cursor: 'pointer'}} onClick={()=> setIsOpen(!isOpen)}>
      {isOpen ? '-': '+'}
    </div>
  </div>
  { isOpen &&
  <div>
      <button onClick={() => setShowEdit({ shortcut, long_url })}>
        edit
      </button>
      <button onClick={() => setShowDelete({ shortcut, long_url })}>
        delete
      </button>
  </div>
  }
  </>
)}

const UrlEdit = ({shortcut, long_url, setShowEdit, setUrls}) => {
  const [longUrl, setLongUrl] = useState(long_url)
  const updateURl = () => {
    axios.put(`http://127.0.0.1:3000/urls/${shortcut}`, {long_url: longUrl})
      .then(response => {
        setUrls(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div>
      <div>
        Shortcut: {shortcut}
      </div>
      <div>
        Long Url: <input value={longUrl} onChange={(e)=> setLongUrl(e.target.value)}></input>
  
      </div>
      <button onClick={() => {updateURl(); setShowEdit(false)}}>Update</button>
      <button onClick={() => setShowEdit(false)}>close</button>
    </div>
  ) 
}
const UrlDelete = ({shortcut, long_url, setShowDelete, setUrls}) => {
  const deleteURl = () => {
    axios.delete(`http://127.0.0.1:3000/urls/${shortcut}`)
      .then(response => {
        setUrls(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      Are you sure you want to delete?
      <div>
        Shortcut: {shortcut}
      </div>
      <div>
        Long Url: {long_url}
      </div>
      <button onClick={() => {deleteURl(); setShowDelete(false)}}>Yes</button>
      <button onClick={() => setShowDelete(false)}>No</button>
    </div>
  ) 
}

const UrlCreate = ({setUrls, setShowCreate}) => {
  const [longUrl, setLongUrl] = useState("")
  const [shortcut, setShortcut] = useState("")

  const createURl = () => {
    axios.post(`http://127.0.0.1:3000/urls/`, {shortcut: shortcut, long_url: longUrl})
      .then(response => {
        setUrls(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <div>
        Shortcut:<input value={shortcut} onChange={(e)=> setShortcut(e.target.value)}></input> 
      </div>
      <div>
        Long Url: <input value={longUrl} onChange={(e)=> setLongUrl(e.target.value)}></input>
      </div>
      <button onClick={() => {createURl(); setShowCreate(false);}}>Create</button>
      <button onClick={() => setShowCreate(false)}> Close </button> 
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
  // Create - done
  // Read - done
  // Update - done
  // Delete - create a separate div - done 
  // Make the ui actially look nice - design both desktop and mobile views -look at some design references
  // Responsive Design - Mobile first perhaps
    // Add a size length for shortcuts and show the long urls up to a certain length
    // Add Material ui icons
    // Create an accordon component on mobile
    // Have the accordion component turn into a full row when on desktop
  // Update the readme
  // Reaorganize where code lives in the files

  const [urls, setUrls] = useState([]);
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
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
      url => <UrlBlock key={url.shortcut} shortcut={url.shortcut} long_url={url.long_url} setShowEdit={setShowEdit} setShowDelete={setShowDelete}/>
    )}
    {showEdit && <UrlEdit shortcut={showEdit.shortcut} long_url={showEdit.long_url} setShowEdit={setShowEdit} setUrls={setUrls}/>}
    {showCreate && <UrlCreate setUrls={setUrls} setShowCreate={setShowCreate}/>}
    {showDelete && <UrlDelete shortcut={showDelete.shortcut} long_url={showDelete.long_url} setShowDelete={setShowDelete} setUrls={setUrls}/>}
    <button onClick={() => setShowCreate(true)}> Create new Pelumi link</button>
    </Page>
  );
}

export default App;
