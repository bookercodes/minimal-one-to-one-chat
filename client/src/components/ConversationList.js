import React, { Component } from 'react';
import { css } from 'emotion';

class ConversationList extends Component {
  state = {
    uids: []
  };

  foo(convo) {
    const message = convo.messages[convo.messages.length - 1];
    console.log('mesage=', message);
    return (
      <div className={css({ fontSize: '.7em' })}>
        <span>{message.senderId.toLowerCase()}: </span>
        <span>
          {convo.messages[convo.messages.length - 1].text
            .substring(0, 20)
            .toLowerCase()}
        </span>
      </div>
    );
  }

  render = () => (
    <ul className={css({ overflowY: 'scroll' })}>
      {this.props.convos.map(convo => {
        return (
          <li
            className={css({
              padding: 16,
              cursor: 'pointer',
              '&:hover': {
                background: '#f2f6fa'
              }
            })}
            style={{
              color:
                this.props.currentConvo &&
                this.props.currentConvo.roomId === convo.roomId
                  ? 'white'
                  : null,
              background:
                this.props.currentConvo &&
                this.props.currentConvo.roomId === convo.roomId
                  ? '#00DE72'
                  : null
            }}
            onClick={() => this.props.onConvoSelected(convo.theirId)}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center'
              })}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${
                  convo.theirId
                }`}
                className={css({
                  borderRadius: 5,
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
                {convo.messages.length > 0 ? (
                  <div>{this.foo(convo)}</div>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ConversationList;
