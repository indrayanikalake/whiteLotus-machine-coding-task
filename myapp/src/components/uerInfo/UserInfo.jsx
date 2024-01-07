import React, { useEffect, useState } from 'react'
import { AuthState } from '../context/authContext'
import { Tilt } from 'react-tilt';

const UserInfo = () => {

  const {allusers,  setAllUsers} = AuthState()
  const usersInfo = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers]= useState([])
  useEffect(()=>{
   setUsers([usersInfo])
     },[allusers])
    
    console.log(JSON.parse(localStorage.getItem("users")))
   console.log(users);
   
    const handleDelete = (name) =>{
    
      console.log("hi");
      console.log(name);
        let availableUsers = users[0].filter((user, i) => user.name !== name); // Modify the original array

        localStorage.setItem('users', JSON.stringify(availableUsers)); 
      console.log(availableUsers)
      setAllUsers(!allusers)
      //localStorage.removeItem('users',users[id])
    }
    
  return (
    <div >
     
      {users.length>0? (
      <div  className=" ml-2 grid grid-cols-3 gap-4 mt-10 ">
       
        {users[0]?.map((user, idx)=>(
           <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
     > 
            <div key={idx} className='bg-image mb-6 relative rounded-4xl shadow-md shadow-gray-600'>
              
                
               
              <img src={user.pic} loading='lazy' alt="user_profile" className='rounded-4xl shadow-xl shadow-gray-500 p-5 w-[420px] h-[320px]  ' />
              <div className="absolute inset-0 bg-opacity-50"></div>
              <div className=" p-4">
               <p className="text-white text-2xl font-bold ">{user?.name}</p>
                </div>
               
            </div>
             <button type='button'
                  className=' p-4 text-white mr-0 h-11 bg-red-800 rounded-full  cursor-pointer'
                onClick={()=>handleDelete(user.name)}
                >X</button>
          </Tilt>
        ))
    }
        </div>
      ):<></>}
    </div>
  )
}

export default UserInfo
