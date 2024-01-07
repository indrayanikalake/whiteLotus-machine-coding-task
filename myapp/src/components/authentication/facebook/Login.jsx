import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
 
  const MyComponent = () => {
 
   
 
   
      return (
      <LoginSocialFacebook
        appId="1081400563210221"
        fields="id, first_name, picture"
        onResolve={(data)=>console.log("response>>>>>",data)}
        onReject={(error)=>console.log("error>>>>>>",error)}
      >
        <div className='lg:w-[350px] h-6 rounded-md '>
        <FacebookLoginButton />
        </div>
      </LoginSocialFacebook>
      )
    
  }
 
  export default MyComponent;
