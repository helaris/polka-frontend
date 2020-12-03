import React, { useState, useEffect } from "react"
import backend from '../../api'
import "./Profile.css"
import Button from "@material-ui/core/Button"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import { Link } from "react-router-dom"
import userService from "../../services/user-service"
import base64js from 'base64-js'
import Upload from '../Upload/Upload'
import Loader from '../Loader/Loader'

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState({})
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")
  const [interests, setInterests] = useState("")
  const [gender, setGender] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [changed, setChanged] = useState(1)
  const [loading, setLoading] = useState(true)

  const addChange = (img) => {
    setAvatar(img)
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await backend.get(`api/user/${userId}`)
      setUserData(res.data)
      setFirstName(res.data.firstName)
      setEmail(res.data.email)
      setLastName(res.data.lastName)
      setUsername(res.data.username)
      setInterests(res.data.interests ?? null)
      setGender(res.data.gender ?? null)
      if (res.data.avatar) {
        const avatar = base64js.fromByteArray(res.data.avatar.data)
        setAvatar(avatar);
      }
      setLoading(false)
      // ... do something else with 'buffer'
    }
    getUser()
  }, [])

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

  const handleUpdate = (e) => {
    e.preventDefault()

    setMessage("")
    setSuccessful(false)

    userService.updateUser(userId, {
      username,
      email,
      firstName,
      lastName,
      interests,
      gender,
    }
    ).then(
      (response) => {
        setMessage("Profile sucessfully updated")
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

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const onChangeInterests = (e) => {
    setInterests(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const onChangelastName = (e) => {
    setLastName(e.target.value)
  }
  const onChangeGender = (e) => {
    setGender(e.target.value)
  }

  if (loading) return (
    <Loader />
  )

  return (
    <div className="userdata-container">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '85vh' }}
      >
        <section className="profile__input__container">
          {avatar && <img className="profile__image" src={'data:image/png;base64,' + avatar} />}
          <Upload userId={userId} addChange={addChange} />
        </section>
        <ValidatorForm className="profile__signup__form" onSubmit={handleUpdate}>
          {message && (
            successful ? (
              <div className="update__profile-message">
                <Alert severity="success" role="alert">
                  {message}
                </Alert>
                <Link to="/people">
                  <Button className="mt-10" variant="contained" color="primary" type="submit">Find friends</Button>
                </Link>
              </div>
            ) : (
                <Alert severity="error" role="alert">
                  {message}
                </Alert>
              )
          )}
          {!successful && (

            <div className="profile__edit_container">
              <section className="profile__input__container">
                <label className="edit-label">First name: </label>
                <TextValidator
                  onChange={onChangeFirstName}
                  inputProps={{ style: { textAlign: 'center' } }}
                  name="first name"
                  value={firstName}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </section>
              <section className="profile__input__container">
                <label className="edit-label">Last name</label>
                <TextValidator
                  onChange={onChangelastName}
                  inputProps={{ style: { textAlign: 'center' } }}
                  name="first name"
                  value={lastName}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </section>
              <section className="profile__input__container">
                <label className="edit-label">Username</label>
                <TextValidator
                  onChange={onChangeUsername}
                  inputProps={{ style: { textAlign: 'center' } }}
                  name="username"
                  value={username}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </section>
              <section className="profile__input__container">
                <label className="edit-label">Email</label>
                <TextValidator
                  onChange={onChangeEmail}
                  inputProps={{ style: { textAlign: 'center' } }}
                  name="email"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={['This field is required', 'Not a valid email']}
                />
              </section>
              <section className="profile__input__container">
                <label className="edit-label">Interests</label>
                <TextValidator
                  onChange={onChangeInterests}
                  inputProps={{ style: { textAlign: 'center' } }}
                  type="interests"
                  name="interests"
                  value={interests}
                />
              </section>
              <section className="profile__input__container">
                <label className="edit-label">Gender</label>
                <TextValidator
                  onChange={onChangeGender}
                  inputProps={{ style: { textAlign: 'center' } }}
                  type="gender"
                  name="gender"
                  value={gender}
                />
              </section>
              <section className="profile__input__container">
                <Button color="primary" variant="contained" type="submit">Submit changes</Button>
              </section>
            </div>
          )}
          {/* <Button style={{ display: "none" }} /> */}
        </ValidatorForm>
      </Grid>
    </div>
  )
}

export default Profile
