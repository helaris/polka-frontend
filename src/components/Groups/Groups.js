import React, { useState, useEffect } from "react"
import GroupItem from "./GroupItem"
import GroupPage from "./GroupPage"
import Loader from '../Loader/Loader'
import backend from "../../api"

import GroupBiker from "../../assets/bikes-group.png"

import "./Groups.css"

function Groups({ userId }) {
  const [groupName, setGroupName] = useState([])
  const [clickedGroup, setClickedGroup] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    setLoading(true)
    const request = await backend.get("api/group")
    setGroupName(request.data)
    setLoading(false)
    return request
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getGroup = async (name) => {
    const request = await backend.get(`api/group/${name}`)
    setClickedGroup(request.data)
  }

  const addMember = async () => {
    const request = await backend.put("api/group/member", {
      userId,
      groupId: clickedGroup[0]._id
    })
  }

  const deleteMember = async () => {
    const request = await backend.put("api/group/", {
      userId,
      groupId: clickedGroup[0]._id
    },
    )
    await fetchData()
  }

  if(loading) return (
    <Loader />
  )

  return (
    <section className="group__frame">
      <div className="group__header">
        <h1>Join new groups</h1>
        <img src={GroupBiker} alt="group image" />
      </div>
      <section className="group__section">
        {clickedGroup.length === 0 ? (
          <ul className="group__containers">
            {groupName.map((group) => (
              <GroupItem getGroup={getGroup}
                groupName={group}
                addMember={addMember} />
            ))}
          </ul>
        ) : (
            <ul className="group__containers">
              {clickedGroup && clickedGroup.map((group) => (
                <GroupPage
                  setClickedGroup={setClickedGroup}
                  groupName={group}
                  addMember={addMember}
                  deleteMember={deleteMember}
                  userId={userId} />
              ))}
            </ul>
          )}
      </section>
    </section>
  )
}

export default Groups
