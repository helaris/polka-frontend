import React, { useState, useEffect } from 'react'
import ChatContact from './ChatContact'
import api from "../../api"
import {TextField, Button } from '@material-ui/core'
import userService from '../../services/user-service'
import Loader from '../Loader/Loader'
import './ChatCreate.css'

const ChatCreate = ({ userId, setClickedChatId }) => {
    const [searchInput, setSearchInput] = useState('');
    const [chatNameInput, setChatNameInput] = useState('');
    const [contacts, setContacts] = useState(undefined)
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleMemberAdd = (id) => {
        const newMembers = [...members];
        const user = contacts.find(user => user._id === id)
        newMembers.push(user);
        setMembers(newMembers)
    }

    const handleMemberRemove = (id) => {
        let newMembers = members.filter(user => user._id !== id);
        setMembers(newMembers)
    }

    const handleSubmit = async () => {
        if(members.length !== 0 || chatNameInput !== '') {
            const membersIds = members.map(user => user._id)
            membersIds.push(userId)
            const chat = {
                name: chatNameInput,
                membersIds: membersIds
            }
            await api.post('api/chat', chat).then(res => {
                if(res.status === 200) {
                    setClickedChatId(res.data._id)
                }
            })
        }
    }

    useEffect(() => {
        const getContacts = async () => {
            // Should fetch contacts
            const res = await api.get(`api/user/all`);
            setContacts(res.data)
            setLoading(false)
        }
        getContacts()
    }, [])

    if(loading) return (
       <Loader />
    )

    return (
        <section className="chatcreate__section">
            <section className="chat__to-message">
                <p>Create a chat</p>
            </section>
            <section className="chatcreate__lists-container">
                <section className="chatcreate__contacts-list__container">
                    <section className="chatcreate__search-container">
                        <TextField
                            required
                            type="text"
                            id="filled-required"
                            label="search user"
                            variant="outlined"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </section>
                    <section className="chatcreate__list">
                        {contacts && 
                            contacts
                                .filter(user => (`${user.firstName} ${user.lastName}`).toLowerCase().includes(searchInput.toLowerCase()))
                                .filter(user => !members.includes(user))
                                .filter(user => user._id !== userId)
                                .map(user => <ChatContact name={`${user.firstName} ${user.lastName}`} id={user._id} img={userService.getImage(user.avatar)} handleClickCard={id => handleMemberAdd(id)} />) 
                        }
                    </section>
                </section>
                <section className="chatcreate__members-list__container">
                    <section className="chatcreate__title__container">
                        <h1>Selected</h1>
                    </section>
                    <section className="chatcreate__list chatcreate__list__members">
                        {members
                            .map(user => <ChatContact name={`${user.firstName} ${user.lastName}`} id={user._id} img={userService.getImage(user.avatar)} handleClickCard={id => handleMemberRemove(id)} />) 
                        }
                    </section>
                </section>
            </section>
            <section className="chatcreate__inputs">
                <section className="chatcreate__text">
                    <TextField
                        required
                        type="text"
                        id="filled-required"
                        label="Name this chat"
                        variant="outlined"
                        value={chatNameInput}
                        onChange={(e) => setChatNameInput(e.target.value)}
                    />
                </section>
                <section className="chatcreate__button__container">
                    <Button
                        className="chatcreate__button"
                        style={{
                            'background-color': '#3f51b5',
                            color: 'white'
                        }}
                        variant="contained"
                        onClick={handleSubmit}
                    >Create</Button>
                </section>
            </section>
        </section>
    )
}

export default ChatCreate;
