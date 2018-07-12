import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import auth from '../common/auth'
import _ from 'lodash'

import ConversationList from '../components/ConversationList'
import MessageList from '../components/MessageList'
import NewMessageForm from '../components/NewMessageForm'
import UserList from './UserList'
import { css } from 'emotion'

class Chat extends Component {
  state = {
    convos: [],
    currentConvo: null,
    searchTerm: ''
  }

  processMessage = message => {
    let { convos } = this.state
    const convo = convos.find(c => c.roomId === message.roomId)
    convo.messages = [...convo.messages, message]
    convos = _(convos)
      .orderBy(c => c.theirId)
      .orderBy(c => c.messages.length > 0, ['desc'])
      .value()
    this.setState({ convos })
  }

  connect = async () => {
    this.chatkit = new ChatManager({
      instanceLocator: 'v1:us1:cf654e3a-3a37-4b86-a44c-100178e2b276',
      userId: auth.userId,
      tokenProvider: new TokenProvider({
        url: 'http://localhost:8080/chatkit-token',
        headers: {
          Authorization: `${auth.accessToken}`
        }
      })
    })
    const currentUser = await this.chatkit.connect({
      onAddedToRoom: this.onAddedToRoom
    })
    this.setState({ currentUser })
  }

  createConvoFromRoom = room => {
    return {
      roomId: room.id,
      messages: [],
      theirId: room.users
        .map(u => u.id)
        .filter(u => u !== this.state.currentUser.id)
        .shift()
    }
  }

  subscribeToRoom = convo => {
    this.setState(
      {
        convos: [...this.state.convos, convo]
      },
      () => {
        this.state.currentUser.subscribeToRoom({
          roomId: convo.roomId,
          messageLimit: 100,

          hooks: { onNewMessage: this.processMessage }
        })
      }
    )
  }

  subscribeToAllRooms = async () => {
    for (const room of this.state.currentUser.rooms) {
      const convo = this.createConvoFromRoom(room)
      this.subscribeToRoom(convo)
    }

    if (this.state.convos.length > 0) {
      this.setState({ currentConvo: this.state.convos[0] })
    }
  }

  startConvo = async theirId => {
    const convo = this.state.convos.find(c => c.theirId === theirId)
    if (!convo) {
      const name = [theirId, auth.userId].sort().join('-')
      const room = await this.state.currentUser.createRoom({
        name,
        private: true, // Test if someone else can connect
        addUserIds: [theirId]
      })
      const newConvo = this.createConvoFromRoom(room)
      this.subscribeToRoom(newConvo)
      this.setState({ currentConvo: newConvo })
    } else {
      this.setState({ currentConvo: convo })
    }
    this.setState({ searchTerm: '' })
  }

  onAddedToRoom = room => {
    if (room.createdByUserId === this.state.currentUser.id) return
    const convo = this.createConvoFromRoom(room)
    this.subscribeToRoom(convo)
  }

  sendMessage = async text => {
    await this.state.currentUser.sendMessage({
      text: text,
      roomId: this.state.currentConvo.roomId
    })
  }

  componentDidMount = async () => {
    await this.connect()
    await this.subscribeToAllRooms()
  }

  render = () => {
    if (!this.state.currentUser) {
      return <p>Loading..</p>
    }
    return (
      <div
        className={css({
          background: 'white',
          maxWidth: 1010,
          margin: '0 auto'
        })}
      >
        <header
          className={css({
            padding: 16,
            fontSize: '1em',
            background: '#00DE72',
            color: 'white',
            fontWeight: 300
          })}
        />
        <div className={css({ display: 'flex', height: '95vh' })}>
          <aside
            className={css({
              minWidth: '30%',
              display: 'flex',
              flexDirection: 'column',
              borderRight: '2px solid #E9EBED'
            })}
          >
            <div
              className={css({
                display: 'flex',
                padding: 16
              })}
            >
              <input
                type="text"
                value={this.state.searchTerm}
                placeholder="Search"
                className={css({
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F2F2F2',
                  border: '1px solid #F2F2F2'
                })}
                onChange={e => {
                  this.setState({ searchTerm: e.target.value })
                }}
              />
            </div>
            {this.state.searchTerm ? (
              <UserList
                onClick={this.startConvo}
                searchTerm={this.state.searchTerm}
              />
            ) : null}
            {!this.state.searchTerm && this.state.convos ? (
              <ConversationList
                onConvoSelected={this.startConvo}
                currentConvo={this.state.currentConvo}
                convos={this.state.convos}
              />
            ) : null}
          </aside>
          {this.state.currentConvo ? (
            <main
              className={css({
                // flexGrow: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingTop: 25,
                paddingBottom: 30
              })}
            >
              <MessageList
                messages={this.state.currentConvo.messages}
              />
              <NewMessageForm onSubmit={this.sendMessage} />
            </main>
          ) : null}
        </div>
      </div>
    )
  }
}
export default Chat
