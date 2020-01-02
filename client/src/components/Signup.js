import axios from 'axios';
import React from 'react';
import { Title, Form, Label, Input, Wrapper } from './styled';
import Button from './Button';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }    
  }

  onFormSubmit = async (e) => {
    e.preventDefault();    
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }
    const url = "http://localhost:3000/api/users/";
    await axios.post(url, user).then(res => console.log(res.data)).catch(err => console.log(err.res));
  }

  onInputChange = (inputName, e) => {
    this.setState({
      [inputName]: e.target.value
    })
  }

  render() { 
    return (
      <Wrapper>
        <Title>Signup</Title>
        <Form onSubmit={this.onFormSubmit}>
          <Label htmlFor="signup-name">Name:</Label>
          <Input type="text" name="name" id="signup-name" placeholder="Name" reqired 
          onChange={this.onInputChange.bind(this, "name")} value={this.state.name}/>

          <Label htmlFor="signup-email">Email:</Label>
          <Input type="email" name="email" id="signup-email" placeholder="Email" reqired 
          onChange={this.onInputChange.bind(this, "email")} value={this.state.email} />

          <Label htmlFor="signup-password">Password:</Label>
          <Input type="password" name="password" id="signup-password" placeholder="Password" reqired 
          onChange={this.onInputChange.bind(this, "password")} value={this.state.password}/>

          <Button textOnButton="Sign Up" btnColor="#70F4FD" btnBorder="none"/> 
        </Form>
      </Wrapper>
      
    )
  }
}

export default Signup;