import React, { useState,useEffect } from 'react';
import './index.css';
import parse from 'html-react-parser';

function Qrcode (props) {

    const [code,setCode]=useState();
    let [text,setText]=useState();
        const info=(e)=>{
            console.log(e.target.value);
            setText(e.target.value);
        }
    
        async function onSubmit(e){
            e.preventDefault();
            console.log('running');
            let phrase={
                message:text
            }
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(phrase)
            };
            await fetch("/code",requestOptions).then(res=>{
                console.log(res);
              return res.text();
            }).then(img=>{
                setCode(parse(img));
            });
        }
       

    return (
    <div>
       
       <form onSubmit={onSubmit} method='POST'>
           <input type="text" name="message" id="message" onChange={info} placeholder="enter text here"/>
           <button type='submit'>Submit text for qrCode</button>
       </form>
      {code?<img src={code}></img>:<div>Waiting for input</div>}
       
    </div>);
}

export default Qrcode;