// Login.js

import React from 'react';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    pwd: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.isLogin(true);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              required
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="pwd"
              placeholder="Password..."
              required
              onChange={this.handleChange}
            />
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
