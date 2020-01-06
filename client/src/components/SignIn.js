import axios from 'axios';
import React from 'react';
import { Form, Label, Input } from './styled';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }    
  }

  onFormSubmit = async (e) => {
    e.preventDefault();    
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    const url = "http://localhost:3000/api/users/login";
    await axios.post(url, user)
      .then(res => localStorage.setItem('travelplanner_x-auth-token', res.headers["x-auth-token"]))
      .catch(err => console.log(err));
  }

  onInputChange = (inputName, e) => {
    this.setState({
      [inputName]: e.target.value
    })
  }

  render() { 
    return (
      <ContentWrapper title="Login">
        <Form onSubmit={this.onFormSubmit}>

          <Label htmlFor="login-email">Email:</Label>
          <Input type="email" name="email" id="login-email" placeholder="Email" required 
          onChange={this.onInputChange.bind(this, "email")} value={this.state.email} />

          <Label htmlFor="login-password">Password:</Label>
          <Input type="password" name="password" id="login-password" placeholder="Password" required 
          onChange={this.onInputChange.bind(this, "password")} value={this.state.password}/>

          <Button textOnButton="Login" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/> 
        </Form>
      </ContentWrapper>
      
    )
  }
}

export default Login;