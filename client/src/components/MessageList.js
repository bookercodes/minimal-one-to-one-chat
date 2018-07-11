import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
class MessageList extends Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }
  render() {
    return (
      <ul
        className={css({
          overflowY: 'scroll',
          paddingLeft: 60,
          paddingRight: 60
        })}
      >
        {this.props.messages.map(message => (
          <li
            className={css({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 9,
              paddingBottom: 9
            })}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${
                message.sender.id
              }`}
              className={css({
                borderRadius: 5,
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
        ))}
      </ul>
    );
  }
}
export default MessageList;
