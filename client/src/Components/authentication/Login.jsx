import React, { useState, useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './LoginStyle';
import AuthService from '../../Service/authService';
import { AuthContext } from "../../Context/AuthContext";
import Message from "../Message/UserMessage";
import AuthValidation from './AuthValidator';
const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const onChange = e =>{
      setUser({...user, [e.target.name] :e.target.value});
  }
  const onsubmit = async(e)=>{
    e.preventDefault();
    if(!AuthValidation.loginUserValidation(setErrors, user))
      return;
    AuthService.login(user).then(data => {
      const {access_token, user} = data;
      localStorage.setItem("token", access_token);
      authContext.setUser(user);
      authContext.setIsAuthenticated(true);
      props.history.push("/home");
    }).catch((err) => {
          if(err.response?.status === 400)
            setMessage({message: "Sorry Invalid Email or Password..", success:false});
    });
  }
  const classes = useStyles();

return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            {errors.email ? (
                            <Message
                                message={{
                                    message: errors.email,
                                    success: false,
                                }}
                            />
                        ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            {errors.password ? (
                            <Message
                                message={{
                                    message: errors.password,
                                    success: false,
                                }}
                            />
                        ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onsubmit}
            >
              Sign In
            </Button>
            <Grid container>
            {message ? <Message message={message} />: null}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Login;