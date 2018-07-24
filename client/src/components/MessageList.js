import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'
import Avatar from './Avatar'

const Message = ({ message }) => (
  <li
    className={css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 9,
      paddingBottom: 9
    })}
  >
    <Avatar
      userId={message.sender.id}
      className={css({
        width: 32,
        height: 32,
        marginRight: 6
      })}
    />
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column'
      })}
    >
      <span
        className={css({
          fontSize: '.8em',
          fontWeight: 'bold',
          marginBottom: 2
        })}
      >
        {message.sender.id.toLowerCase()}
      </span>
      <span className={css({ flex: 1, fontSize: '.8em' })}>
        {message.text}
      </span>
    </div>
  </li>
)

class MessageList extends Component {
  UNSAFE_componentWillUpdate () {
    const list = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom =
      list.scrollTop + list.clientHeight + 100 >= list.scrollHeight
  }

  componentDidUpdate () {
    if (this.shouldScrollToBottom) {
      const list = ReactDOM.findDOMNode(this)
      list.scrollTop = list.scrollHeight
    }
  }

  render () {
    return (
      <ul
        className={css({
          overflowY: 'scroll',
          paddingLeft: 60,
          paddingRight: 60
        })}
      >
        {this.props.messages.map(message => (
          <Message message={message} key={message.id} />
        ))}
      </ul>
    )
  }
}

export default MessageList
