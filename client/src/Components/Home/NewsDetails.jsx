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
const cards = [1];

const NewsDetails = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        {/* News Image */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h4" align="center" color="error" gutterBottom>
              "بعد الحرارة الشديدة اليوم.. «الأرصاد» تصدر بيانًا عن طقس الغد - Al Masry Al Youm - المصري اليوم"
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            <CardMedia
                  className={classes.media}
                  image="https://www.skynewsarabia.com/images/v1/2020/06/17/1353468/1200/630/1-1353468.jpg"
                  title="بعد الحرارة الشديدة اليوم.. «الأرصاد» تصدر بيانًا عن طقس الغد - Al Masry Al Youm - المصري اليوم"
                  onClick={() => props.history.push(`/article/161`)}
                />
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* News Details */}
          <Grid container>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                  "بعد الحرارة الشديدة اليوم.. «الأرصاد» تصدر بيانًا عن طقس الغد - Al Masry Al Youm - المصري اليوم"
                      
                    </Typography>
                    <Typography>
                    وصفت منظمة الصحة العالمية، نجاح باحثين بريطانيين، في علاج حالات إصابة حرجة بفيروس كورونا المستجد، بدواء من عائلة "الستيرويدات"، بالإنجاز العلمي، فما هو هذا الدواء وكيف يعمل وماهي آثاره الجانبية ودواعي استعماله؟
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
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

export default NewsDetails;