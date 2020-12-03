import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import { Link } from "react-router-dom";

import AuthService from "../../services/auth-service"

import "./Register.css";

const useStyles = makeStyles({
  button: {
    height: 48,
    width: 200,
    padding: '0 30px',
  },
  input: {
    width: 200,
    margin: '10px 0 0 0'
  }
});

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [token, setToken] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const onChangelastName = (e) => {
    setLastName(e.target.value)
  }

  const onChangeToken = (e) => {
    setToken(e.target.value)
  }

  const handleRegister = (e) => {
    e.preventDefault()

    setMessage("")
    setSuccessful(false)

    AuthService.register(
      username,
      email,
      password,
      firstName,
      lastName,
      token
    ).then(
      (response) => {
        setMessage(response.data.message)
        setSuccessful(true)
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setMessage(resMessage)
        setSuccessful(false)
      }
    )
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
      <ValidatorForm className="signup__form" onSubmit={handleRegister}>
        {message && (
          successful ? (
            <>
              <Alert severity="success" role="alert">
                {message}
              </Alert>
              <Link to="/login">
                <Button variant="contained" color="primary" type="submit">Login</Button>
              </Link>
            </>
          ) : (
              <Alert severity="error" role="alert">
                {message}
              </Alert>
            )
        )}
        {!successful && (
          <div className="test">
            <TextValidator
              label="First Name"
              className={classes.input}
              onChange={onChangeFirstName}
              name="first name"
              value={firstName}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextValidator
              className={classes.input}
              label="First Name"
              onChange={onChangelastName}
              name="first name"
              value={lastName}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextValidator
              className={classes.input}
              label="Username"
              onChange={onChangeUsername}
              name="username"
              value={username}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextValidator
              className={classes.input}
              label="Email"
              onChange={onChangeEmail}
              name="email"
              value={email}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Not a valid email']}
            />
            <TextValidator
              className={classes.input}
              label="Password"
              onChange={onChangePassword}
              type="password"
              name="password"
              value={password}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextValidator
              className={`mb-20 ${classes.input}`}
              label="Token"
              onChange={onChangeToken}
              name="token"
              value={token}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <Button color="primary" variant="contained" className={classes.button} type="submit">Sign Up</Button>
          </div>
        )}
        {/* <Button style={{ display: "none" }} /> */}
      </ValidatorForm>
    </Grid>
  )
}

export default Register
