import React, { useState,useEffect } from 'react';
import './index.css';
import parse from 'html-react-parser';

function Qrcode (props) {

    const [code,setCode]=useState();
    let [text,setText]=useState();
    
    
        async function qr(){
            console.log('running');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:  {message:text}
            };
            await fetch("/code",requestOptions).then(res=>{
              return res.text();
            }).then(img=>{
                setCode(parse(img));
            });
        }
       
        // useEffect(()=>{

        // },[code])

    return (
    <div>
       
       <input type="text" name="message" id="message" onChange={setText} placeholder="enter text here"/>
       <button onClick={qr}>Submit text for qrCode</button>
       
       {code}
    </div>);
}

export default Qrcode;