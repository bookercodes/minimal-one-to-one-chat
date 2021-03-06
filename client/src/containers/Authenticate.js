import axios from 'axios'
import React, { Component } from 'react'
import auth from '../common/auth'
import AccountForm from '../components/AccountForm'

class Authenticate extends Component {
  createAccount = async user => {
    try {
      await axios.post('http://localhost:8080/users', { user })
    } catch (err) {
      alert(err)
    }
  }

  authenticate = async account => {
    try {
      const { data } = await axios.post(
        'http://localhost:8080/token',
        {
          user: {
            username: account.username,
            password: account.password
          }
        }
      )
      auth.handleResponse(data)
    } catch (err) {
      alert(err)
    }
  }

  render = () => {
    return (
      <div>
        <div>
          <h2>Create account</h2>
          <AccountForm onSubmit={this.createAccount} />
        </div>
        <div>
          <h2>Authenticate</h2>
          <AccountForm onSubmit={this.authenticate} />
        </div>
      </div>
    )
  }
}

export default Authenticate
