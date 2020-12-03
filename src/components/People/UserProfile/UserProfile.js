import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import Loader from '../../Loader/Loader'
import backend from "../../../api";
import base64js from 'base64-js'
import Button from "@material-ui/core/Button"
import './UserProfile.css'

const UserProfile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true)
  const { user } = useParams();

  useEffect(() => {
    async function fetchData() {
      const request = await backend.get(`api/user/profile/${user}`)
      setUserProfile(request.data)
      setLoading(false)
      return request
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (userProfile[0]?.avatar) {
      const avatar = base64js.fromByteArray(userProfile[0].avatar.data)
      setAvatar('data:image/png;base64,' + avatar);
    } else {
      setAvatar('https://images.vexels.com/media/users/3/140800/isolated/preview/86b482aaf1fec78a3c9c86b242c6ada8-man-profile-avatar-by-vexels.png')
    }
  }, [userProfile])

  if (loading) return (
    <Loader />
  )

  return (
    <div className="bg-container">
      <section>
        <div className="userprofile__header-container">
          <img src={avatar} alt={userProfile.firstName} />
          <h3>{userProfile[0]?.firstName} {userProfile[0]?.lastName}</h3>
          {userProfile[0] &&
            userId !== userProfile[0]._id &&
            <Link to="/chat">
              <Button className="msg__btn" variant="contained">Message</Button>
            </Link>}
          {userProfile[0] &&
            userId === userProfile[0]._id &&
            <Link to="/profile">
              <Button className="edit__btn" variant="contained">Edit Profile</Button>
            </Link>}
        </div>
        <main className="main__container">
          <section className="events__container">
            <h1 className="heading">{userProfile[0]?.firstName}'s Upcoming Events</h1>
            <div className="event__container">
              <div className="date__container">
                <h1>14</h1>
                <p>DEC</p>
              </div>
              <div className="event__description">
                <h1>Christmas choir</h1>
                <p>Christmas choir at 8pm - everyone welcome</p>
              </div>
            </div>
            <div className="event__container">
              <div className="date__container">
                <h1>20</h1>
                <p>DEC</p>
              </div>
              <div className="event__description">
                <h1>Walk in the park</h1>
                <p>Group walk activity</p>
              </div>
            </div>
            <div className="event__container">
              <div className="date__container">
                <h1>31</h1>
                <p>OCT</p>
              </div>
              <div className="event__description">
                <h1>Halloween party 2021</h1>
                <p>Dress as you please - Costume-Competition</p>
              </div>
            </div>
          </section>
          <section className="groups__container">
            <h1 className="heading">Groups</h1>
            <div className="group__container">
              <div className="group">
                <div className="group__text">
                  <h1>Coffe Club</h1>
                  <p>For people who can't wake up without a good cup of coffee</p>
                </div>
                <div className="group__actions">
                  <Button variant="contained" color="primary">Join</Button>
                </div>
              </div>
              <div className="group">
                <div className="group__text">
                  <h1>Football</h1>
                  <p>Football group</p>
                </div>
                <div className="group__actions">
                  <Button variant="contained" color="primary">Join</Button>
                </div>
              </div>
            </div>
          </section>
          <section className="profile__info">
            <h1 className="heading">Profile Information</h1>
            <ul className="profile__container">
              <li><strong>Age:</strong> 30</li>
              <li><strong>Description:</strong> Cool person who never lies, I like sausage</li>
              <li><strong>Gender:</strong> {userProfile[0]?.gender ?? "Not sure"}</li>
              <li><strong>City:</strong> Bergen</li>
              <li><strong>Disability:</strong> Hearing Impairment</li>
              <li><strong>Gender Interest:</strong> Bisexual</li>
              <li><strong>Hobbies:</strong> Reading, Basketball, Netflix & Chill</li>
              <li><strong>Interests:</strong> {userProfile[0]?.interests}</li>
            </ul>
          </section>
          <section className="friends__main-container">
            <h1 className="heading">Friends</h1>
            <div className="friends__container">
              <div className="friend__container">
                <img src="https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg" alt="" />
                <div className="friend__text">
                  <h1>Hermione Granger</h1>
                  <p>15 mutual friends</p>
                </div>
              </div>
              <div className="friend__container">
                <img src="https://i.pinimg.com/originals/8b/73/6d/8b736d5a0dcbca0e7c9f922c705cb0fd.jpg" alt="" />
                <div className="friend__text">
                  <h1>Draco Malfoy</h1>
                  <p>10 mutual friends</p>
                </div>
              </div>
              <div className="friend__container">
                <img src="https://pm1.narvii.com/6822/f684352038d30466b8df6bb7dfbee9e632638003v2_hq.jpg" alt="" />
                <div className="friend__text">
                  <h1>Luna Lovegood</h1>
                  <p>7 mutual friends</p>
                </div>
              </div>
              <div className="friend__container">
                <img src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/47/1542891042-ron-weasley.jpg?crop=0.587xw:1.00xh;0.121xw,0&resize=480:*" alt="" />
                <div className="friend__text">
                  <h1>Ron Weasley</h1>
                  <p>81 mutual friends</p>
                </div>
              </div>
              <div className="friend__container">
                <img src="https://i.pinimg.com/originals/21/e8/21/21e82131698187d712bd5452086f8526.jpg" alt="" />
                <div className="friend__text">
                  <h1>Dobby</h1>
                  <p>77 mutual friends</p>
                </div>
              </div>
              <div className="friend__container">
                <img src="data:image/jpeg;base64,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" alt="" />
                <div className="friend__text">
                  <h1>Harry Potter</h1>
                  <p>101 mutual friends</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}

export default UserProfile
