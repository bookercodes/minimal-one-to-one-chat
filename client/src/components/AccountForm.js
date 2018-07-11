import React, { Component } from 'react'

class AccountForm extends Component {
  render = () => (
    <form
      onSubmit={e => {
        e.preventDefault()
        this.props.onSubmit({
          username: this.usernameEl.value,
          password: this.passwordEl.value
        })
        this.usernameEl.value = ''
        this.passwordEl.value = ''
      }}
    >
      <div>
        <div>
          <label>Username</label>
        </div>
        <input
          type="text"
          required
          ref={el => (this.usernameEl = el)}
        />
      </div>
      <div>
        <div>
          <label>Password</label>
        </div>
        <input
          type="password"
          required
          ref={el => (this.passwordEl = el)}
        />
      </div>
      <input type="submit" />
    </form>
  )
}

export default AccountForm
