/* eslint-disable */
import React, { useState } from "react"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link, Redirect } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';
import AuthService from "../../services/auth-service"

import "./Login.css";

const useStyles = makeStyles({
  button: {
    height: 48,
    width: 200,
    padding: '0 30px',
    background: '#4fb3bf',
  },
  buttonOne: {
    height: 48,
    width: 200,
    padding: '0 30px',
    background: '#e7e7e7',
  },
  input: {
    width: 200,
    margin: '10px 0 0 0'
  }
});

const Login = ({ setUserId }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = e => {
    e.preventDefault();

    setMessage("");

    AuthService.login(username, password).then(
      () => {
        const user = AuthService.getCurrentUser();
        setUserId(user.id);
        setLoggedIn(true)
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  }

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '85vh' }}
    >
      {loggedIn && <Redirect to={`/people/${username}`}/>}
      <ValidatorForm className="login__form" onSubmit={handleLogin} >
        {message && (
          <Alert severity="error">
            {message}
          </Alert>
        )}
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        /> */}
        <TextValidator
          className={classes.input}
          label="Username"
          onChange={onChangeUsername}
          name="username"
          variant="filled"
          value={username}
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <TextValidator
          className={`mb-20 ${classes.input}`}
          label="Password"
          onChange={onChangePassword}
          type="password"
          name="password"
          variant="filled"
          value={password}
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit">
          Login
          </Button>
        {/* <Button m={2} style={{ display: "none" }} /> */}
        <Link className="register" to="/register">
      <Button
          className={`${classes.buttonOne} register`}
          variant="contained">
          Sign up
          </Button>
          </Link>
      </ValidatorForm>
    </Grid>
  )
}

export default Login
