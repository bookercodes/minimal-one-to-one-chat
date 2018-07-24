import React, { Component } from 'react'
import auth from '../common/auth'
import axios from 'axios'
import { css } from 'emotion'

class UserList extends Component {
  state = { userIds: [] }

  async componentDidMount () {
    const { data } = await axios.get('http://localhost:8080/users', {
      headers: {
        Authorization: auth.accessToken
      }
    })
    this.setState({ userIds: data })
  }

  render = () => {
    return (
      <ul>
        {this.state.userIds
          .filter(uid => uid.includes(this.props.searchTerm))
          .map(uid => (
            <li key={uid}>
              <button
                onClick={() => this.props.onClick(uid)}
                className={css({ padding: 10, margin: 10 })}
              >
                Start conversation with <strong>{uid}</strong>
              </button>
            </li>
          ))}
      </ul>
    )
  }
}
export default UserList
