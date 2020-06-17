import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from '../Navbar/Navbar';
import useStyles from './style/NewsDetailsStyle';
// Service
import NewsService from '../../Service/NewsService';
import AddRemoveUserFavorites from './AddRemoveUserFavorites';

const NewsDetails = (props) => {
    const [news, setNews] = React.useState({});
    const classes = useStyles();
    const getNewsDetails = async() => {
        const newsResult = await NewsService.getNewsDetails(props.match.params.id);
        setNews(newsResult.data.article);
    }
    React.useEffect(() => {
        getNewsDetails();
    }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        {/* News Image */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h4" align="center" color="error" gutterBottom>
              {news.title}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            <CardMedia
                  className={classes.media}
                  image={news.urlToImage}
                  title={news.title}
                  onClick={() => props.history.push(`/article/${news.id}`)}
                />
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <AddRemoveUserFavorites news={news} />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* News Details */}
          <Grid container>
              <Grid item key={news.id} xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {news.title}                      
                    </Typography>
                    <Typography>
                    {news.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" size="small" color="primary" onClick={() => props.history.push(`/`)}>
                      Browse More News
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default NewsDetails;