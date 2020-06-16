import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from '../Navbar/Navbar';
import NewsHeadline from './NewsHeadlines';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Moment from "react-moment";
import './style/Home.css';
// Service
import GetNewsService from '../../Service/GetNewsService';
const Home = (props) => {
  const [newsHeadlines, setNewsHeadlines] = React.useState([]);
  const getNewsHeadlines = async () => {
    const newsResult = await GetNewsService();
    setNewsHeadlines(newsResult.data.articles);
  };
  React.useEffect(() => {
    getNewsHeadlines();
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
              <NewsHeadline {...props}/>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {newsHeadlines.map((news, index) => (
              <Grid item key={index} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={news.urlToImage}
                    title={news.title}
                  />
                  <CardContent className={classes.cardContent}>
                  
                    <Typography gutterBottom variant="h6" component="h2">
                    <div class="profile-cover__info inlineStart">
                  <ul class="nav myRecordsList">
                    <li className="eventList">
                      <strong> <StarBorderIcon fontSize={"large"} color={"error"} /></strong> 
                    </li>
                  </ul>
                </div>
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
                    <Button size="small" color="primary" startIcon={<StarBorderIcon />}>
                      Favorites
                    </Button>
                    <Button size="small" color="primary">
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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    marginTop:"-10px"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));