import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import GetNewsService from '../../Service/GetNewsService';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import 'moment/locale/ar-sa';
// Styles
import TabPanel from './style/TabPanel';
import a11yProps from './style/scrollStyle';
import useStyles from './style/headLinesStyle';
const NewsHeadline = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [newsHeadlines, setNewsHeadlines] = React.useState([]);
  const getNewsHeadlines = async () => {
    const newsResult = await GetNewsService();
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
          <TabPanel value={value} index={index} {...props}>
            <Card onClick={() => props.history.push(`/news/1`)} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={news.urlToImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                <div className="eventRecords">
                <div class="profile-cover__info">
                  <ul class="nav myRecordsList">
                    <li className="eventList">
                      <strong> <StarBorderIcon fontSize={"large"} color={"error"} /></strong> 
                    </li>
                  </ul>
                </div>
                  </div>
                  <Typography gutterBottom variant="h5" component="h2">
                    {news.description}
                    <p className="newsDate">
                      <Moment locale="ar-sa" format="D MMM YYYY" withTitle>{news.publishedAt}</Moment>
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
