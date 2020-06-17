import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './style/HomeStyle';
import Container from '@material-ui/core/Container';
import NavBar from '../Navbar/Navbar';
import NewsHeadline from './NewsHeadlines';
import Moment from "react-moment";
import './style/Home.css';
// Service
import NewsService from '../../Service/NewsService';
import AddRemoveUserFavorites from './AddRemoveUserFavorites';

const Home = (props) => {
  const [newsHeadlines, setNewsHeadlines] = React.useState([]);
  const [userFavorites, setUserFavorites] = React.useState([]);

  const getUserFavorites = async () => {
    const userFavoritesData = await NewsService.getUserFavorites();
    setUserFavorites(userFavoritesData.data.userFavorites);
  }
  const getNewsHeadlines = async () => {
    const newsResult = await NewsService.getNewsData();
    setNewsHeadlines(newsResult.data.articles);
  };
  const addToFavorites = (articleId) => {
    NewsService.addToFavorites(articleId);
    getUserFavorites();
  }
  const removeFromFavorites = (articleId) => {
    NewsService.removeFromFavorites(articleId);
    getUserFavorites();
  }
  React.useEffect(() => {
    getNewsHeadlines();
    getUserFavorites();
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container class="newsContainer container" maxWidth="sm">
          <Typography  component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <h1>News Content</h1>
            </Typography>
            <div class="dailyNews">
              <h3>Daily News</h3>
              <NewsHeadline {...props} userFavorites={userFavorites} newsHeadlines={newsHeadlines} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {newsHeadlines.map((news) => (
              <Grid item key={news.id} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardMedia
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
                  <AddRemoveUserFavorites userFavorites={userFavorites} news={news} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
                    <Button size="small" color="primary" onClick={() => props.history.push(`/article/${news.id}`)} >
                      See More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
export default Home;