import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState();
    const [toggle, setToggle] = useState(false);
    const [presentUser, setPresentUser] = useState(false);
    const [allusers, setAllUsers] = useState(false);
    

    return(
        <AuthContext.Provider value={{setUserInfo, userInfo, toggle, setToggle,
        presentUser, setPresentUser, allusers,setAllUsers}}>
              {children}
        </AuthContext.Provider>
    )
}

export const AuthState = () =>{
    return useContext(AuthContext);
}

export default AuthContextProvider;