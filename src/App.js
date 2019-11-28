import React, { Component } from 'react';
import Navbar from './layout/Navbar'
import Users from './users/Users'
import axios from 'axios';
import './App.css';

import Search from './users/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  //search Github users
  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ users: res.data.items, loading: false })
  }

  //clears users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    })
  }

  render() {
    const {users, loading} = this.state
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );

  }
}

export default App;
