import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Moment from "react-moment";
import useStyles from './style/HomeStyle';
// Component
import AddRemoveUserFavorites from './AddRemoveUserFavorites';

const ListNewsComponent = (props) => {
    const news = props.news;
    const classes = useStyles();
    return(
        <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
            {news.map((news) => (
              <Grid item key={news.id} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardMedia
                  onClick={() => props.history.push(`/article/${news.id}`)}
                    className={classes.cardMedia}
                    image={news.urlToImage}
                    title={news.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {news.title}
                    </Typography>
                    <Typography variant="caption">
                      {news.description}
                      <p className="newsDate">
                      <Moment local="de" format="D MMM YYYY" withTitle>{news.publishedAt}</Moment>
                    </p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <AddRemoveUserFavorites news={news} />
                    <Button variant="contained" size="small" color="primary" onClick={() => props.history.push(`/article/${news.id}`)} >
                      See More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
} 
export default ListNewsComponent;