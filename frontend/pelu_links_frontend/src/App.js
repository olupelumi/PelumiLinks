import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import {KeyboardArrowDown,  KeyboardArrowUp, Edit, Delete} from '@mui/icons-material';

const UrlBlockMobile = ({shortcut, long_url, setShowEdit, setShowDelete}) => {
  const [isOpen, setIsOpen] = useState(false)
    
  return (
  <>
  <div className='urlBlock Mobile'>
    <div className='shortcut'>
      {shortcut}
    </div>
    <div>
      {long_url}
    </div>
    <div style={{cursor: 'pointer'}} onClick={()=> setIsOpen(!isOpen)}>
      {isOpen? <KeyboardArrowUp/>: <KeyboardArrowDown/>}
    </div>
  </div>
  { isOpen &&
  <div>
    <Edit className='clickable' onClick={() => setShowEdit({ shortcut, long_url })}/> 
    <Delete className='clickable' onClick={() => setShowDelete({ shortcut, long_url })}/>
  </div>
  }
  </>)
}

const UrlBlockDesktop = ({shortcut, long_url, setShowEdit, setShowDelete}) => {

  return (
    <>
    <div className='urlBlock Desktop'>
      <div className='shortcut'>
        {shortcut}
      </div>
      <div>
        {long_url}
      </div>
      <Edit className='clickable' onClick={() => setShowEdit({ shortcut, long_url })}/>
      <Delete className='clickable' onClick={() => setShowDelete({ shortcut, long_url })}/>
    </div>
    </>
  )
}

const UrlBlock = ({shortcut, long_url, setShowEdit, setShowDelete}) =>
{
  const [isMobile, setIsMobile] = useState(false) 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(()=> {
    window.addEventListener('resize', handleResize)
  }, [])

return (
  <>
  {isMobile? (<UrlBlockMobile shortcut={shortcut} long_url={long_url} setShowEdit={setShowEdit} setShowDelete={setShowDelete}/>):
  <UrlBlockDesktop shortcut={shortcut} long_url={long_url} setShowEdit={setShowEdit} setShowDelete={setShowDelete}/>
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
    <>
    <div className="modalOverlay" onClick={() => setShowEdit(false)}></div>
    <div className='modal'>
      <div>
        Shortcut: {shortcut}
      </div>
      <div>
        Long Url: <input value={longUrl} onChange={(e)=> setLongUrl(e.target.value)}></input>
      </div>
      <button onClick={() => {updateURl(); setShowEdit(false)}}>Update</button>
      <button onClick={() => setShowEdit(false)}>close</button>
    </div>
    </>
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
    <>
    <div className="modalOverlay" onClick={() => setShowDelete(false)}></div>
    <div className='modal'>
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
    </>
  ) 
}

const UrlCreate = ({setUrls, setShowCreate}) => {
  const [longUrl, setLongUrl] = useState("")
  const [shortcut, setShortcut] = useState("")

  const createURl = () => {
    axios.post(`http://127.0.0.1:3000/urls/`, {shortcut: shortcut, long_url: longUrl})
      .then(response => {
        setUrls(response.data);
        console.log('response.data', response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
    <div className="modalOverlay" onClick={() => setShowCreate(false)}></div>
    <div className='modal'>
      <div>
        Shortcut:<input value={shortcut} onChange={(e)=> setShortcut(e.target.value)}></input> 
      </div>
      <div>
        Long Url: <input value={longUrl} onChange={(e)=> setLongUrl(e.target.value)}></input>
      </div>
      <button onClick={() => {createURl(); setShowCreate(false);}}>Create</button>
      <button onClick={() => setShowCreate(false)}> Close </button> 
    </div>
    </>
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
  const [urls, setUrls] = useState([]);
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    axios.get('http://127.0.0.1:3000')
      .then(response => {
        setUrls(response.data);
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
    <div className='createBtnContainer'><button className='createBtn clickable' onClick={() => setShowCreate(true)}> Create new Pelumi link</button></div>
    
    </Page>
  );
}

export default App;
