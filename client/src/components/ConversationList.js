import React, { Component } from 'react'
import { css } from 'emotion'
import Avatar from './Avatar'

const Foo = ({ convo }) => {
  const message = convo.messages[convo.messages.length - 1]
  return (
    <div className={css({ fontSize: '.7em' })}>
      <span>{message.senderId.toLowerCase()}: </span>
      <span>
        {convo.messages[convo.messages.length - 1].text
          .substring(0, 20)
          .toLowerCase()}
      </span>
    </div>
  )
}

const MessageDeets = ({ convo }) => (
  <div>
    <div className={css({ marginBottom: 3 })}>
      <span
        className={css({
          fontWeight: 600,
          fontSize: '.8em'
        })}
      >
        {convo.theirId}
      </span>
    </div>
    <div>
      {convo.messages.length > 0 ? <Foo convo={convo} /> : null}
    </div>
  </div>
)

const Convo = ({ convo, currentConvo }) => {
  return (
    <li
      className={css({
        padding: 16,
        cursor: 'pointer',
        '&:hover': {
          background: '#F2F6FA'
        },
        color:
          currentConvo && currentConvo.roomId === convo.roomId
            ? 'white'
            : null,
        background:
          currentConvo && currentConvo.roomId === convo.roomId
            ? '#00DE72'
            : null
      })}
      onClick={() => this.props.onConvoSelected(convo.theirId)}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center'
        })}
      >
        <Avatar
          userId={convo.theirId}
          className={css({
            width: 36,
            height: 36,
            marginRight: 12
          })}
        />
        <MessageDeets convo={convo} />
      </div>
    </li>
  )
}

const ConversationList = ({ convos, currentConvo }) => (
  <ul className={css({ overflowY: 'scroll' })}>
    {convos.map(convo => (
      <Convo convo={convo} currentConvo={currentConvo} />
    ))}
  </ul>
)

export default ConversationList
