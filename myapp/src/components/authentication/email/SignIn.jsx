import React, { useState } from 'react'
import { AuthState } from '../../context/authContext';
import { toast, Toast } from 'react-toastify';

const SignIn = () => {
    const { setToggle, setPresentUser, setAllUsers, allusers  } = AuthState();
    const [show,setShow] = useState(false);

    const [user,setUser] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        pic:"",
        errors:{}

    })

    
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

    setUser({ ...user, errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

     const handleSubmit = async(e) =>{
       e.preventDefault();
        console.log(JSON.parse(localStorage.getItem("users")))
        if(validate()){
       const presentUsers = JSON.parse(localStorage.getItem("users"));
       console.log(presentUsers);
       const presentUser = presentUsers.find(u=>u.email===user.email);
       console.log(presentUser);
        setAllUsers(!allusers);
       if(presentUser){
        toast.success("login successfull",{
          position:'top-center'
        })
        
       }else{
        console.log("Please Sign In")
        toast.error("Please Sign Up",{
            position:"top-center"
        })
       }
      }else{
        toast.error(Object.values(user.errors)[0],{
          position:'top-center'
        })
      }
     }


  return (
    <div>
       <div>
        
      <form
      onSubmit={handleSubmit}
      className='h-full text-white flex flex-col space-y-10 px-24 py-10 gold-white-gradient '>
       
       <div>
        <label htmlFor="email_name" className=' block text-md font-medium mb-2'>Email</label>
        <input type="email"
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950 shadow-md shadow-gray-500'
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
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950 shadow-md shadow-gray-500'
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
        className='w-full rounded-md p-1 bg-gray-800 focus: ring-gray-950 shadow-md shadow-gray-500'
         onChange={(e)=>setUser({
            ...user,
            confirmPassword:e.target.value
        })}
         placeholder='enter your Password here'/>
       </div>
       
       <button type='submit' 
       className='py-2 px-3 w-48 rounded-xl bg-black cursor-pointer'
       >Sign In</button>
       <p className='bg-violet-800 text-white text-md py-2 px-3 cursor-pointer' onClick={()=>setToggle(false)}>Register</p>
      </form>
    </div>
    </div>
  )
}

export default SignIn
