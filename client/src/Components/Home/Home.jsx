import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './HomeStyle'
import Container from '@material-ui/core/Container';
import Moment from 'react-moment';
import './Home.css';
import { Link } from 'react-router-dom';
// Included Components
const Home = (props) => {
    const classes = useStyles();
  return (
    <React.Fragment>
      <main>
      {/* Header Component will be Here */}
      
        <div>
          <Container  class="newsContainer container" maxWidth="sm">
          <Typography  component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <h1>News Content</h1>
            </Typography>
            <div>
              <h3>Daily News</h3>
              {/* Daily News will Be Here */}
              {/* <UserEvents {...props}/> */}
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <h2>News You Many Interested In</h2>
          <Grid container spacing={4}>
            {[{id: 1,start_date: "Today", title:"Headline", description: "news Description"}].map((news) => (
              <Grid item key={news.id} xs={12} sm={6} md={6}>
                <Card className={classes.card} onClick={() => props.history.push(`/news/${news.id}`)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={news.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {news.title}
                    </Typography>
                    <Typography>
                    <p className="newsDate">
                      <Moment format="D MMM YYYY" withTitle>{news.start_date}</Moment>
                    </p>
                    </Typography>
                    <br/>
                    <Typography>
                    {news.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button size="small" color="primary">
                  <Link>Share</Link>
                </Button>
                <Button size="small" color="primary">
                  <Link to={`/news/${news.id}`}>See More..</Link>
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