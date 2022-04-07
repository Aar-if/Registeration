import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import OneTimepass from './oneTimepass'
import Password from './password' 
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

ReactDOM.render(
  
  <BrowserRouter> 
           <Routes>
                  <Route path="/app" element ={<App />} />
                  <Route path="/onetimepass" element ={<OneTimepass />} />
                  <Route path="/password" element ={<Password />} />
           </Routes>
  </BrowserRouter> ,
                        
                
 
 
  document.getElementById('root')
);


reportWebVitals();
