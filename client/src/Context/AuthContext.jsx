import React, { createContext, useState , useEffect, Fragment} from 'react';
import AuthService from '../Service/authService';
import NewsService from '../Service/NewsService';
export const AuthContext = createContext();

export default ({ children }) =>{
    const [user, setUser] = useState(null);
    const [userFavorites, setUserFavorites] = React.useState([]);
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const[isLoaded, setIsLoaded] = useState(false);

    const getUserFavorites = async () => {
        const userFavoritesData = await NewsService.getUserFavorites();
        setUserFavorites(userFavoritesData.data.userFavorites);
     }
    useEffect(() => {
        getUserFavorites();
        AuthService.isAuthenticated().then(data =>{
            setIsAuthenticated(data.isAuthenticated)
            setUser(data.user);
            setIsLoaded(true)
        });
    },[]);
    return(
        <Fragment>
            {!isLoaded ? <h1>Loading</h1> 
            : <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, userFavorites, setUserFavorites, getUserFavorites}}>
                {children}
            </AuthContext.Provider>}
        </Fragment>
    )
}
