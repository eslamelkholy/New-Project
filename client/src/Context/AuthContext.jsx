import React, { createContext, useState , useEffect, Fragment} from 'react';
import AuthService from '../Service/authService';

export const AuthContext = createContext();

export default ({ children }) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const[isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenticated(true)
            setIsLoaded(true)
        });
    },[]);
    return(
        <Fragment>
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>
        </Fragment>
    )
}
