import React, { Fragment } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const AddRemoveUserFavorites = (props) => {
    const userFavorites = props.userFavorites;
    const news = props.news;
    const addToFavorites = props.addToFavorites;
    const removeFromFavorites = props.removeFromFavorites;
    
    return(
        <Fragment>
        {
            userFavorites.includes(news.title) ? 
            <Button size="small" color="primary" onClick={() => removeFromFavorites(news.id)} startIcon={<StarIcon />}>
              Remove Favorites
            </Button>
            :
            <Button size="small" color="primary" onClick={() => addToFavorites(news.id)} startIcon={<StarBorderIcon />}>
              Add Favorites
            </Button>
        }
        </Fragment>
    )
}

export default AddRemoveUserFavorites;