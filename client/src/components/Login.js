import axios from 'axios';
import React from 'react';
import { Title, Form, Label, Input, Wrapper } from './styled';
import Button from './Button';

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
    const url = "http://localhost:5000/api/users/login";
    await axios.post(url, user).then(res => console.log(res.data)).catch(err => console.log(err));
  }

  onInputChange = (inputName, e) => {
    this.setState({
      [inputName]: e.target.value
    })
  }

  render() { 
    return (
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={this.onFormSubmit}>

          <Label htmlFor="signup-email">Email:</Label>
          <Input type="email" name="email" id="signup-email" placeholder="Email" reqired 
          onChange={this.onInputChange.bind(this, "email")} value={this.state.email} />

          <Label htmlFor="signup-password">Password:</Label>
          <Input type="password" name="password" id="signup-password" placeholder="Password" reqired 
          onChange={this.onInputChange.bind(this, "password")} value={this.state.password}/>

          <Button textOnButton="Login" btnColor="#70F4FD" btnBorder="none"/> 
        </Form>
      </Wrapper>
      
    )
  }
}

export default Login;