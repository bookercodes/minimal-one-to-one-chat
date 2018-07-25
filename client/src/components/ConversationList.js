import React from 'react'
import { css } from 'emotion'
import Avatar from './Avatar'

const MessagePeek = ({ convo }) => {
  if (convo.messages.length > 0) {
    const message = convo.messages[convo.messages.length - 1]
    return (
      <div className={css({ fontSize: '.7em' })}>
        <span>{message.senderId.toLowerCase()}: </span>
        <span>{message.text.substring(0, 20).toLowerCase()}</span>
      </div>
    )
  }
  return null
}

const Convo = ({ convo, currentConvo, onConvoSelected }) => (
  <li
    className={css({
      padding: 16,
      cursor: 'pointer',
      color:
        currentConvo && currentConvo.roomId === convo.roomId
          ? 'white'
          : null,
      background:
        currentConvo && currentConvo.roomId === convo.roomId
          ? '#00DE72'
          : null,
      '&:hover': {
        background:
          currentConvo && currentConvo.roomId === convo.roomId
            ? null
            : '#F2F6FA'
      }
    })}
    onClick={() => onConvoSelected(convo.theirId)}
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
        <MessagePeek convo={convo} />
      </div>
    </div>
  </li>
)

const ConversationList = ({
  convos,
  currentConvo,
  onConvoSelected
}) => (
  <ul className={css({ overflowY: 'scroll' })}>
    {convos.map(convo => (
      <Convo
        convo={convo}
        key={convo.roomId}
        currentConvo={currentConvo}
        onConvoSelected={onConvoSelected}
      />
    ))}
  </ul>
)

export default ConversationList
