import React, { useRef, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AuthService from "../../Service/authService";
import Message from "../Message/UserMessage";
import AuthValidation from './AuthValidator';
import useStyles from './RegisterStyle';

const Register = (props) => {
    const [user, setUser] = useState({ name: "", email: "", date_of_birth: "1997-03-13"});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const classes = useStyles();
    let timerID = useRef(null);
    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const resetForm = () => {
        setUser({ username: "", email: "", date_of_birth: "" });
    };
    const onsubmit = async (e) => {
        e.preventDefault();
        if (!AuthValidation.registerUserValidation(setErrors, user))
            return;
        try {
            await AuthService.register(user);
            setMessage({message: "Congratulation! Please Check Your Mail now you will Redirect to Login..",success: true,});
            resetForm();
            timerID = setTimeout(() => props.history.push("/login"), 4000);
        }catch (err){
            setErrors({ uniqueEmail: "Sorry This Email Already Exist" });
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                name="name"
                                autoComplete="name"
                                onChange={onChange}
                            />
                        </Grid>
                        {errors.name ? (
                            <Message
                                message={{
                                    message: errors.name,
                                    success: false,
                                }}
                            />
                        ) : null}
                        <Grid item xs={12}  >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onChange}
                            />
                        </Grid>
                        {errors.email ? (
                            <Message
                                message={{
                                    message: errors.email,
                                    success: false,
                                }}
                            />
                        ) : null}
                        <Grid item xs={12}>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue={user.date_of_birth}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onsubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        {errors.uniqueEmail ? (
                            <Message
                                message={{
                                    message: errors.uniqueEmail,
                                    success: false,
                                }}
                            />
                        ) : null}
                        {message ? (
                            <Message
                                message={message}
                            />
                        ) : null}
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
export default Register;