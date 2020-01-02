import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
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
    const cookies = new Cookies();
    await axios.post(url, user).then(res => cookies.set('travelplanner_jwt',res.data.token)).catch(err => console.log(err));
    this.setState({
      travelplanner_jwt: cookies.get('travelplanner_jwt')
    })
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

          <Label htmlFor="login-email">Email:</Label>
          <Input type="email" name="email" id="login-email" placeholder="Email" required 
          onChange={this.onInputChange.bind(this, "email")} value={this.state.email} />

          <Label htmlFor="login-password">Password:</Label>
          <Input type="password" name="password" id="login-password" placeholder="Password" required 
          onChange={this.onInputChange.bind(this, "password")} value={this.state.password}/>

          <Button textOnButton="Login" btnColor="#70F4FD" btnBorder="none"/> 
        </Form>
      </Wrapper>
      
    )
  }
}

export default Login;