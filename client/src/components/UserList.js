import React, { Component } from 'react';
import auth from '../common/auth';
import axios from 'axios';
import { css } from 'emotion';

class UserList extends Component {
  state = { uids: [] };
  async fetchUserIds() {
    const res = await axios.get('http://localhost:8080/users', {
      headers: {
        Authorization: auth.getAccessToken()
      }
    });
    return res.data;
  }
  async componentDidMount() {
    console.log('fetching');
    const uids = await this.fetchUserIds();
    this.setState({ uids });
  }
  render = () => {
    return (
      <ul>
        {this.state.uids
          .filter(c => c.includes(this.props.searchTerm))
          .map(uid => (
            <li>
              <button
                onClick={() => this.props.onClick(uid)}
                className={css({ padding: 10, margin: 10 })}
              >
                Start conversation with <strong>{uid}</strong>
              </button>
            </li>
          ))}
      </ul>
    );
  };
}
export default UserList;
