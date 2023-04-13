import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import {KeyboardArrowDown,  KeyboardArrowUp, Edit, Delete} from '@mui/icons-material';

const UrlRowCount = 6;

const UrlBlockMobile = ({shortcut, long_url, setShowEdit, setShowDelete, setShowInfo}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  var display_url;
  if (long_url.length > 15) {
    display_url = long_url.substring(0, 15).concat('...')
  } else {
    display_url = long_url
  }
    
  return (
  <>
  <div className='urlBlock Mobile'>
    <div className='shortcut'>
      {shortcut}
    </div>
    <div onClick={() => setShowInfo({shortcut, long_url})}>
      {display_url}
    </div>
    <div style={{cursor: 'pointer'}} onClick={()=> setIsOpen(!isOpen)}>
      {isOpen? <KeyboardArrowUp/>: <KeyboardArrowDown/>}
    </div>
  </div>
  { isOpen &&
  <div className='flex-center mobileModalActions'>
    <Edit className='clickable rightGutter' onClick={() => setShowEdit({ shortcut, long_url })}/> 
    <Delete className='clickable' onClick={() => setShowDelete({ shortcut, long_url })}/>
  </div>
  }
  </>)
}

const UrlBlockDesktop = ({shortcut, long_url, setShowEdit, setShowDelete, setShowInfo}) => {

  var display_url;
  if (long_url.length > 15) {
    display_url = long_url.substring(0, 15).concat('...')
  } else {
    display_url = long_url
  }

  return (
    <>
    <div className='urlBlock Desktop'>
      <div className='shortcut'>
        {shortcut}
      </div>
      <div onClick={() => setShowInfo({shortcut, long_url})}>
        {display_url}
      </div>
      <Edit className='clickable rightGutter' onClick={() => setShowEdit({ shortcut, long_url })}/>
      <Delete className='clickable' onClick={() => setShowDelete({ shortcut, long_url })}/>
    </div>
    </>
  )
}

const UrlBlock = ({shortcut, long_url, setShowEdit, setShowDelete, setShowInfo}) =>
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
  {isMobile? (<UrlBlockMobile shortcut={shortcut} long_url={long_url} setShowEdit={setShowEdit} setShowDelete={setShowDelete} setShowInfo={setShowInfo}/>):
  <UrlBlockDesktop shortcut={shortcut} long_url={long_url} setShowEdit={setShowEdit} setShowDelete={setShowDelete} setShowInfo={setShowInfo}/>
  }
  </>
)}

const UrlInfo = ({shortcut, long_url, setShowInfo}) => {

  return (
    <>
    <div className="modalOverlay" onClick={() => setShowInfo(false)}></div>
    <div className='modal'>
      <div className="modalHeader">
        <span>Edit Pelumi Link</span>
      </div>
      <div className="modalContent">
        <div>
          Shortcut: 
        </div>
        <input disabled={true} value={shortcut} />
        <div>
          Long Url: 
        </div>
        <textarea disabled={true} rows={UrlRowCount} value={long_url}></textarea>
      </div>
    </div>
    </>
  )
}

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
      <div className="modalHeader">
        <span>Edit Pelumi Link</span>
      </div>
      <div className="modalContent">
        <div>
          Shortcut: 
        </div>
        <input disabled={true} value={shortcut} />
        <div>
          Long Url: 
        </div>
        <textarea maxlength={120} rows={UrlRowCount} value={longUrl} onChange={(e)=> setLongUrl(e.target.value)}></textarea>
      </div>
      <div className="modalActions">
        <button style={{marginRight:'10px'}} className='actionBtn leftBtn'  onClick={() => setShowEdit(false)}>Cancel</button>
        <button className='actionBtn rightBtn' onClick={() => {updateURl(); setShowEdit(false)}}>Save</button>
      </div> 
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
    <div>
    <div className="modalOverlay" onClick={() => setShowDelete(false)}></div>
    <div className='modal'>
      <div className="modalHeader">
        <span>Are you sure you want to delete?</span>
      </div>
      <div>
        <div className='bottomGutter'>
          Shortcut: {shortcut}
        </div>
        <div>
          Long Url: {long_url}
        </div>
      </div>
      <div className="modalActions">
        <button style={{marginRight:'10px'}} className='actionBtn leftBtn'  onClick={() => setShowDelete(false)}>Cancel</button>
        <button className='actionBtn rightBtn' onClick={() => {deleteURl(); setShowDelete(false)}}>Delete</button>
      </div> 
  </div>
  </div>
) 
}

const UrlCreate = ({setUrls, setShowCreate}) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [showError, setShowError] = useState(false);

  const errorCheck = (shortcut) => {
    if (shortcut.length > 7) {
      setShowError(true)
    } else {
      setShortcut(shortcut)
      setShowError(false)
    }
  }

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
      <div className="modalHeader">
        <span>Create Pelumi Link</span>
      </div>
      <div className="modalContent">
         <div> Shortcut:</div> 
         <input value={shortcut} onChange={(e)=> errorCheck(e.target.value)}></input>
        { showError &&
        <div className='errorText'>
          A shortcut can't be longer than 7 characters
        </div>
        }
        <div>
          Long Url: 
        </div>
        <textarea maxlength={120} rows={UrlRowCount} value={longUrl} onChange={(e)=> setLongUrl(e.target.value)}></textarea>
      </div>
      <div className="modalActions">
        <button style={{marginRight:'10px'}} className='actionBtn leftBtn'  onClick={() => setShowCreate(false)}>Cancel</button>
        <button className='actionBtn rightBtn' onClick={() => {createURl(); setShowCreate(false)}}>Save</button>
      </div> 
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
  const [showInfo, setShowInfo] = useState(false)

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
      url => <UrlBlock key={url.shortcut} shortcut={url.shortcut} long_url={url.long_url} setShowEdit={setShowEdit} setShowDelete={setShowDelete} setShowInfo={setShowInfo}/>
    )}
    {showEdit && <UrlEdit shortcut={showEdit.shortcut} long_url={showEdit.long_url} setShowEdit={setShowEdit} setUrls={setUrls}/>}
    {showCreate && <UrlCreate setUrls={setUrls} setShowCreate={setShowCreate}/>}
    {showDelete && <UrlDelete shortcut={showDelete.shortcut} long_url={showDelete.long_url} setShowDelete={setShowDelete} setUrls={setUrls}/>}
    {showInfo && <UrlInfo shortcut={showInfo.shortcut} long_url={showInfo.long_url} setShowInfo={setShowInfo} />}
    <div className='createBtnContainer'><button className='createBtn clickable' onClick={() => setShowCreate(true)}> Create new Pelumi link</button></div>
    
    </Page>
  );
}

export default App;
