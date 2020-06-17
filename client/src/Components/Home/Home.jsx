import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import useStyles from './style/HomeStyle';
import Container from '@material-ui/core/Container';
import './style/Home.css';
// Service
import NewsService from '../../Service/NewsService';
// Components
import NewsHeadline from './NewsHeadlines';
import ListNewsComponent from './ListNewsComponent';

const Home = (props) => {
  const [newsHeadlines, setNewsHeadlines] = React.useState([]);
  const getNewsHeadlines = async () => {
    const newsResult = await NewsService.getNewsData();
    setNewsHeadlines(newsResult.data.articles);
  };
  React.useEffect(() => {
    getNewsHeadlines();
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container class="newsContainer container" maxWidth="sm">
          <Typography  component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <h1>Top Headlines in Egypt</h1>
            </Typography>
            <div class="dailyNews">
              <h3>Daily News</h3>
              <NewsHeadline {...props} newsHeadlines={newsHeadlines}/>
            </div>
          </Container>
        </div>
          <ListNewsComponent {...props} news={newsHeadlines} />
      </main>
    </React.Fragment>
  );
}
export default Home;