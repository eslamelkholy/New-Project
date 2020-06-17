import React, { Fragment, useContext } from 'react';
import Button from "@material-ui/core/Button";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
// Service & Context
import { AuthContext } from '../../Context/AuthContext';
import NewsService from '../../Service/NewsService';
const AddRemoveUserFavorites = (props) => {
    const news = props.news;
    const {userFavorites} = useContext(AuthContext);
    const { getUserFavorites } = useContext(AuthContext);
    const addToFavorites = (articleId) => {
      NewsService.addToFavorites(articleId);
      getUserFavorites();
    }
    const removeFromFavorites = (articleId) => {
      NewsService.removeFromFavorites(articleId);
      getUserFavorites();
  }
    return(
        <Fragment>
        {
            userFavorites.includes(news.title) ? 
            <Button size="small" variant="contained" color="primary" onClick={() => removeFromFavorites(news.id)} startIcon={<StarIcon />}>
              Remove Favorites
            </Button>
            :
            <Button size="small" variant="contained" color="primary" onClick={() => addToFavorites(news.id)} startIcon={<StarBorderIcon />}>
              Add Favorites
            </Button>
        }
        </Fragment>
    )
}

export default AddRemoveUserFavorites;