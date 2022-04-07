import { useState } from 'react';
import './App.css';
import * as yup from "yup";
import { useForm, SubmitHandler,} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';


function OneTimepass() {
  return (
      

    <div className='registerotp'>
         <div className="otpheader" > <h1>Please enter your 6 digit otp below : -</h1> </div>

         
      
         <div id="otp" className="field"> 
         <input className="field" type="text" id="first"  maxLength={1} />
         <input className="field" type="text" id="second" maxLength={1}/> 
         <input className="field" type="text" id="third"  maxLength={1}/>
         <input className="field" type="text" id="fourth" maxLength={1} />
         <input className="field" type="text" id="fifth"  maxLength={1}/> 
         <input className="field" type="text" id="sixth"  maxLength={1}/> 

       
           </div>

           <button   className="otpbutton"   type="submit"  > 
          Validate
        </button>
        <div className="eula"> Note : One time password will be expired within 30 seconds</div>

         
    </div>
    
  )
}

export default OneTimepass;
