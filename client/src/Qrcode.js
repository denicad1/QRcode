import React, { useState, useEffect } from 'react';
import './index.css';
import parse from 'html-react-parser';


function Qrcode (props) {

    const [code,setCode]=useState();
    let htmlString="...";
    let element='...';

    useEffect(()=>{
        async function qr(){
            await fetch("/code").then(res=>{
                console.log('fetch');
              return res.text();
                
                
             
            }).then(img=>{
               

                setCode(parse(img));
                
            });
        }
       
       qr();
    },[]);
   
    
    return (
    
    <div id='root' className='size'>
       {code}
    </div>);
}

export default Qrcode;