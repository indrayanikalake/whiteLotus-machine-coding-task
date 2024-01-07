import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AuthState } from '../../context/authContext';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { cloudinaryId, firebaseAuth } from '../../../data';


const SIgnUp = () => {
    const [show,setShow] = useState(false);
   const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        pic:"",
        errors: {}, 

    })
  
     const { setToggle, setAllUsers, allusers } = AuthState();
     

  

  const validate = () => {
    const errors = {};

    // Email validation
    if (!user.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!user.password.trim()) {
      errors.password = 'Password is required';
    } else
 
if (user.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!user.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Profile picture validation (optional)
  

    setUser({ ...user, errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };


    const postDetails = (pic)=>{
        
          setLoading(true);
         if(pic === undefined){
            toast.error('Select an image.',{
            position:"top-center"
        })
        return;
         }

         if(pic.type === 'image/jpeg' || pic.type === 'image/jpg' || pic.type === 'image/png' ){
            const data = new FormData();
            data.append("file",pic);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","ds3ryg3iy");
            fetch(cloudinaryId,{
                method:"post",
                body:data
            }).then((res)=>res.json())
            .then(data=>{
                setUser({
                    ...user,
                    pic:data.url.toString()
                }
                    
                )
               
                console.log(data.url.toString());
                setLoading(false);
            })
         }else{
             toast.error('Please select an image',{
               position:"top-center"
        })
         }
    }

    const handleSubmit = async(e) =>{
       e.preventDefault();
       console.log(user);
       const payload ={...user,returnSecureToken:true};
       
  
       if(validate()){
        try{
        const response = await axios.post(firebaseAuth,payload)
        console.log(JSON.parse(response.config.data)); 
        
       
         let users = JSON.parse(localStorage.getItem("users")) || [];
         users.push(JSON.parse(response.config.data));
         localStorage.setItem("users", JSON.stringify(users));
         toast.success("Registration successfull",{
          position:"top-center"
         })
        
      }catch(error){
            console.log(error)
        }
       }else{
        console.log(user.errors)
        console.log(Object.values(user.errors)[0]);
        toast.error(Object.values(user.errors)[0],{
            position:"top-center"
        })
       }
       
       
    }
    
  /*  
useEffect(() => {
    console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  toast.success("user is registered successfully",{
    position:"top-center"
  })
}, [users]); */

  return (
    <div>
      <form
      onSubmit={handleSubmit}
      className='h-full text-white flex flex-col space-y-5 px-20 py-10 gold-white-gradient'>
        <div>
        <label htmlFor="name" className=' block text-md font-medium mb-2'>User Name</label>
        <input type="text"
        value={user.name}
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950'
        onChange={(e)=>setUser({
            ...user,
            name:e.target.value
        })}
         placeholder='enter your name here'/>
       </div>
       <div>
        <label htmlFor="email_name" className=' block text-md font-medium mb-2'>Email</label>
        <input type="email"
        value={user.email}
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950'
        onChange={(e)=>setUser({
            ...user,
            email:e.target.value
        })}
         placeholder='enter your email here'/>
       </div>
       <div>
        <label htmlFor="password" className='block text-md font-medium mb-2'>Password</label>
        <input
        type={show?'text':'password'} 
          
         value={user.password}
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950'
        onChange={(e)=>setUser({
            ...user,
            password:e.target.value
        })}
         placeholder='enter your password here'/>
       </div>
       <div>
        <label htmlFor="confirm_password" className='block text-md font-medium mb-2'>Confirm Password</label>
        <input
         type={show?'text':'password'}
         value={user.confirmPassword}
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950'
         onChange={(e)=>setUser({
            ...user,
            confirmPassword:e.target.value
        })}
         placeholder='enter your Password here'/>
       </div>
       <div>
        <label htmlFor="email_name" className='block text-md font-medium mb-2'>Upload Profile Photo</label>
        <input type="file" accept='image/*' 
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950'
        onChange={(e)=>postDetails(e.target.files[0])}
        placeholder='enter your email here'/>
       </div>
       {
        loading && <p>Loading...</p>
       }
       <button type='submit' 
       className='py-2 px-3 w-48 rounded-xl bg-black cursor-pointer'
       >Sign Up</button>
       <p className=' text-md text-white cursor-pointer' onClick={()=>setToggle(true)}>Already a User? Login</p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SIgnUp
