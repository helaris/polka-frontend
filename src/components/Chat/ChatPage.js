import React, { useState, useEffect } from 'react'
import ChatMessages from './ChatMessages'
import ChatContact from './ChatContact'
import ChatCreate from './ChatCreate'
import api from "../../api"
import CreateChatIcon from "@material-ui/icons/AddComment"
import {TextField } from '@material-ui/core'
import userService from '../../services/user-service'
import Loader from '../Loader/Loader'
import ChatIllustration from "../../assets/marginalia-online-cooperation.png"
import './ChatPage.css'

const ChatPage = ({ userId }) => {
  const [chats, setChats] = useState(undefined)
  const [clickedChatId, setClickedChatId] = useState(undefined)
  const [createChat, setCreateChat] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true);

  const getChats = async () => {
    if(userId) {
      setLoading(true)
      const res = await api.get(`api/chat/user/${userId}`)
      const chats = res.data.chats
      if(chats) setChats([...chats])
      setLoading(false)
    }
  }

  const handleSelectNewChat = async (id) => {
    await getChats();
    setClickedChatId(id)
  }

  const handleDeleteChat = async (id) => {
    await api.delete(`api/chat/${id}`);
    await getChats();
  }

  useEffect(() => {
    getChats()
  }, [userId])

  if(loading) return (
    <Loader />
  )

  return (
    <>
      <div className="group__header">
        <h1>Chat with friends</h1>
        <img src={ChatIllustration} alt="group image" />
      </div>
      <section className="chatpage__content__container">
        <section className="chatcard__container">
          <section className="chatcard__inputs">
            <TextField
              required
              className="chatcard__inputs__text"
              type="text"
              id="filled-required"
              label="search chat"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <CreateChatIcon
              className="chatcard__inputs__btn"
              onClick={() => {
                setCreateChat(true)
                setClickedChatId(undefined)
              }}
              style={{
                fontSize: 40,
                color: '#3f51b5'
              }}
            />
          </section>
            {chats
              .filter(chat => chat.name.toLowerCase().includes(searchInput.toLowerCase()))
              .map(chat => {
                const numChatMembers = chat.members.length;
                let image = "https://www.materialui.co/materialIcons/social/group_grey_192x192.png"
                if(numChatMembers === 1) {
                  image = userService.getImage(chat.members[0].avatar)
                }
                else if(numChatMembers === 2) {
                  const receiver = chat.members.find(user => user._id !== userId);
                  image =  userService.getImage(receiver.avatar)
                }
                return <ChatContact key={chat._id} id={chat._id} name={chat.name} img={image} handleClickCard={id => setClickedChatId(id)} handleClickDelete={id => handleDeleteChat(id)} /> 
              })
            }
        </section>
        <section className="chat__container">
            {clickedChatId ? <ChatMessages userId={userId} chatId={clickedChatId} /> 
                          : createChat && <ChatCreate userId={userId} setClickedChatId={id => handleSelectNewChat(id)} />
            }
        </section>
      </section>
    </>
  )
}

export default ChatPage;
