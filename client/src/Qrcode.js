import React, { useState,useEffect } from 'react';
import './index.css';
import parse from 'html-react-parser';

function Qrcode (props) {

    const [code,setCode]=useState();
    let [text,setText]=useState();
        const info=(e)=>{
            setText(e.target.value);
        }
    
        async function onSubmit(e){
            e.preventDefault();
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
       
        function iterateDots(){
            var el = document.getElementById("dots");
            var dotsStr = el.innerHTML;
            console.log(dotsStr);
            var dotsLen = dotsStr.length;
            console.log(dotsLen);
        
            var maxDots = 3;
            el.innerHTML = (dotsLen < maxDots ? dotsStr + '.' : dotsStr='');
        }
        
        function startLoading(){
            const intervalMs = 1000;
        
            let interval = setInterval(iterateDots, intervalMs);
        }  

    return (
    <div>
        <div className='margin-bottom'>
            <span className='title'>QR Code Generator</span>
        </div>
        {code?<img src={code} className='margin-bottom'></img>:<div className='margin-bottom'>Waiting for input<span id='dots' onLoad={startLoading()}></span></div>}
       <form onSubmit={onSubmit} method='POST' className='flex-center flex-col'>
           <input type="text" className='input' name="message" id="message" onChange={info} placeholder=" Enter text here"/>
           <button type='submit' className='submit button-text'>Submit text for qrCode</button>
       </form>       
    </div>);
}

export default Qrcode;