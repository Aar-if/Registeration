import React from 'react'
import './App.css';



function Password() {
  return (
    <div  className='registerotp'>

            <div className="passwordheader" > <h1>Create a Password</h1> </div>
            <input className="password" type="text"  placeholder='enter your password'  />
            <div className="passwordheader" > <h1>Confirm Pasword</h1> </div>
            <input className="password" type="text"   placeholder='must be same as above'/>
            <br></br>
            <button  className="passwordbutton"   type="submit"  > 
                        Save
            </button>

            <div className="eula"> Note : Password must be between 8 - 20 characters </div>
    
            
    </div>

  
   

    
  )
}

export default Password;
