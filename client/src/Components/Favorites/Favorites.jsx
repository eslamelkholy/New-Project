import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from '../Navbar/Navbar';
import useStyles from './style/FavoritesStyle';
// Service & Context
import { AuthContext } from '../../Context/AuthContext';
import ListNewsComponent from '../Home/ListNewsComponent';
const Favorites = (props) => { 
    const {userFavorites} = useContext(AuthContext);
    const classes = useStyles();
    return (
        <React.Fragment>
            <NavBar/>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Favorites Album
                    </Typography>
                </Container>
                </div>
                <ListNewsComponent news={userFavorites}/>
            </main>
        </React.Fragment>
  );
}
export default Favorites;