import React, { createContext, useState , useEffect, Fragment} from 'react';
import AuthService from '../Service/authService';
import NewsService from '../Service/NewsService';
export const AuthContext = createContext();

export default ({ children }) =>{
    const [user, setUser] = useState(null);
    const [userFavoritesId, setUserFavoritesId] = React.useState([]);
    const [userFavorites, setUserFavorites] = React.useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const[isLoaded, setIsLoaded] = useState(false);

    const getUserFavoritesData = async () => {
        const userFavoritesData = await NewsService.getUserFavorites();
        setUserFavorites(userFavoritesData.data.FavoritesData.Favorites);
        setUserFavoritesId(userFavoritesData.data.FavoritesData.UserFavoritesId);
     }
    useEffect(() => {
        getUserFavoritesData();
        AuthService.isAuthenticated().then(data =>{
            setIsAuthenticated(data.isAuthenticated)
            setUser(data.user);
            setIsLoaded(true)
        });
    },[]);
    return(
        <Fragment>
            {!isLoaded ? <h1>Loading</h1> 
            : <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, userFavoritesId, userFavorites, getUserFavoritesData}}>
                {children}
            </AuthContext.Provider>}
        </Fragment>
    )
}
