import './App.css';
import React, {useState, useEffect } from 'react';

var CryptoJS = require("crypto-js");
const KEY = process.env.REACT_APP_KEY
const IV = process.env.REACT_APP_IV



function App() {

  const [count, setCount] = useState("");

    useEffect(() => {
    // Access count value from session storage
    var authToken = sessionStorage.getItem("authToken");
    if (authToken == null) {
      
      const curDT= new Date().toISOString();      
      console.log("Current Date Time = " + curDT);
        var data = curDT;
        var key = CryptoJS.enc.Utf8.parse(KEY);
        var iv = CryptoJS.enc.Utf8.parse(IV);

        console.log(key.toString());
        console.log(iv.toString());
      
        // Encrypt
        var encryptedData = CryptoJS.AES.encrypt(data, key, 
          { iv: iv,
           padding: CryptoJS.pad.Pkcs7,
           mode: CryptoJS.mode.CBC
          });
          
        // log encrypted data
        console.log('Encrypted Data -');
        console.log(encryptedData.toString());
      
        // Decrypt        
        
        var decryptedData = CryptoJS.AES.decrypt(encryptedData, key, 
                                    { iv: iv,
                                     padding: CryptoJS.pad.Pkcs7,
                                     mode: CryptoJS.mode.CBC
                                    }).toString(CryptoJS.enc.Utf8);
      
        //log decrypted Data

        console.log('Decrypted Data -')
        console.log(decryptedData.toString(CryptoJS.enc.Utf8));
      
        authToken = encryptedData;
    } 
    // Update session storage
    sessionStorage.setItem("authToken", authToken);
    setCount(authToken);
  }, []); //No dependency to trigger in each page load
  return (
    <div className="App">
      <header className="App-header">
        <div>Auth Token - {sessionStorage.getItem("authToken")}</div>        
      </header>
    </div>
  );
}
export default App;
