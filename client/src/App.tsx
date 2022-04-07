
import './App.css';                                                                       
import * as yup from "yup";                                                                 
import { useForm, SubmitHandler,} from "react-hook-form";                                      
import { yupResolver } from '@hookform/resolvers/yup';                                          
import Axios from 'axios';                                                                     
import { BrowserRouter, Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom'; 




const schema = yup.object().shape({
  firstName: yup.string().required("*first name required").min(3, "*should not be less than 3 characters"),
  lastName: yup.string().required("*last name required").min(3, "*should not be less than 3 characters"),
  email: yup.string().required("*email required").email("Enter a valid e-mail ID"),
  contact:yup.number()
  .typeError('you must specify a number')
  .test('len', 'Must be exactly 10 numbers', (val) => String(val).length === 10)
 ,
  pincode:yup.number().typeError('you must specify a number').test('len', 'Must be exactly 6 digits', (val) => String(val).length === 6),

});



 function App() {
   let navigate = useNavigate();
  const { register, handleSubmit,  formState: { errors } } = useForm({resolver: yupResolver(schema),});
  const onSubmit =handleSubmit( (data) =>{ console.log(data)  
    Axios.post ("http://localhost:3001/create",(data)).then((res)=>{console.log(res)
    console.log(res.data)

    if (res.data === "user already exists")
    {
      alert("The e-mail ID is already in use please try a different e-mail");
    }
    else
    {
      alert("An otp has been sent to your registered e-mail address ")    ;   
      navigate("/onetimepass");
    }
   });
  });

  



  return (
    <form onSubmit={onSubmit} autoComplete = "off">
      <div className="title"> <h2>Registeration Form</h2> </div>
      <div className="header">Fill in the below details to register your account </div>
      
      
      <div className="registerform">

      <label>First Name</label>
      <input {...register("firstName")}placeholder="Enter your first name" /> <p className="message" > {errors.firstName?.message} </p>
         
      <label>LastName</label>
      <input {...register("lastName")} placeholder="Enter your last name"  /> <p className="message"> {errors.lastName?.message} </p>

      <label>E-mail</label>
      <input {...register("email")} placeholder="Enter your e-mail address"/> <p className="message"> {errors.email?.message} </p>

      <label>Phone Number</label>
      <input {...register("contact")} placeholder="Enter your phone number"/> <p className="message"> {errors.contact?.message} </p>

      <label>Pincode</label>
      <input {...register("pincode")} placeholder="Enter your pincode"  />  <p className="message" > {errors.pincode?.message} </p>

      
       <button   className="registerbutton"   type="submit"  > 
          Register
        </button>
        <div className="eula"> Note : By registering you agree to the necessary terms and conditions required.</div>
       

      </div>
    
    </form>
  );
}


export default App;