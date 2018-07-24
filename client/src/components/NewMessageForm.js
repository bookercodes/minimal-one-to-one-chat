import React from 'react'
import { css } from 'emotion'

const NewMessageForm = ({ onSubmit }) => (
  <form
    onSubmit={e => {
      e.preventDefault()
      onSubmit(this.inputEl.value)
      this.inputEl.value = ''
    }}
  >
    <div
      className={css({
        display: 'flex',
        paddingLeft: 60,
        paddingRight: 60
      })}
    >
      <input
        type="text"
        required
        ref={el => (this.inputEl = el)}
        placeholder="Write a mesasge then hit ENTER..."
        className={css({
          width: '100%',
          paddingTop: 32,
          paddingBottom: 32,
          fontSize: '.8em',
          border: 'none',
          borderBottom: '2px #ececec solid',
          '&:focus': {
            outline: 'none',
            borderBottom: '2px #00DE72 solid'
          }
        })}
      />
    </div>
  </form>
)

export default NewMessageForm
