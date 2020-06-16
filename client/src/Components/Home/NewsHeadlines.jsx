import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axiosInstance from '../../Service/axiosInstance';
import { Link } from "react-router-dom";
import Moment from "react-moment";
const NewsHeadline = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [newsHeadlines, setNewsHeadlines] = React.useState([]);
  console.log(process.env.REACT_APP_NEWS_API_KEY);
  const url = 'http://newsapi.org/v2/top-headlines?' +
          'country=eg&' +
          'apiKey='+ process.env.REACT_APP_NEWS_API_KEY;
          
  const getNewsHeadlines = async () => {
    const newsResult = await axiosInstance.get(url);
    console.log(newsResult.data.articles);
    setNewsHeadlines(newsResult.data.articles);
  };
  React.useEffect(() => {
    getNewsHeadlines();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {newsHeadlines.map((news, index) => {
            return <Tab label={news.title} {...a11yProps(index)} />;
          })}
        </Tabs>
      </AppBar>
      {newsHeadlines.map((news, index) => {
        return (
          <TabPanel value={value} index={index}>
            <Card onClick={() => props.history.push(`/news/1`)} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  imageUrl={news.urlToImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                <div className="eventRecords">
                <div class="profile-cover__info">
                  <ul class="nav myRecordsList">
                    <li className="eventList">
                      <strong>{news.title}</strong>Title
                    </li>
                  </ul>
                </div>
                  </div>
                  <Typography gutterBottom variant="h5" component="h2">
                    {news.title}
                    <p className="eventDate">
                      <Moment format="D MMM YYYY" withTitle>today</Moment>
                    </p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {news.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link>Share</Link>
                </Button>
                <Button size="small" color="primary">
                  <Link to={news.url}>See More..</Link>
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
        );
      })}
    </div>
  );
};
export default NewsHeadline;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 100,
  },
}));
