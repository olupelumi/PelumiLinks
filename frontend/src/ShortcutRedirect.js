import { useParams, } from "react-router-dom";
import {useEffect} from 'react'
import axios from "axios";

const ShortcutRedirect
 = () => {
    const {shortcut} = useParams()
    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/urls/${shortcut}`, {shortcut: shortcut})
      .then(response => {
        if (response.data.long_url.includes('http')) {
            window.location.replace(response.data.long_url);
        } else {
            window.location.replace(`http://${response.data.long_url}`);
        }
        
      })
      .catch(error => {
        console.error(error);
      });
    }, [shortcut]);

    return ( 
        <div>Redirecting....</div>
     );
}
 
export default ShortcutRedirect;
