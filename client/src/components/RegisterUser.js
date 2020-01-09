import axios from 'axios';
import React from 'react';
import { Form, Label, Input } from './styled';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

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
    const url = "/api/users/";
    await axios.post(url, user)
      .then(res => {
        const userName = res.data.name;
        return userName;
      })
      .then((userName) => alert(`Hello ${userName}. You've successfully register. Log in now`))
      .then(() => this.props.history.push('/users/login'))
      .catch(err => {
        if (err.response.data) {
          const errorMessage = err.response.data.error;
          console.log(errorMessage);
          alert(`
            Sorry, sth goes wrong
            ${errorMessage}`);
        } else {
          console.log(err);
          alert('Sth goes wrong');
        }
        
        // alert(`We are sorry. Sth went wrong.\n ${err.data.error} `)
      });
  }

  onInputChange = (inputName, e) => {
    this.setState({
      [inputName]: e.target.value
    })
  }

  render() { 
    return (
      <ContentWrapper title="Sign Up">
        <Form onSubmit={this.onFormSubmit}>
          <Label htmlFor="signup-name">Name:</Label>
          <Input type="text" name="name" id="signup-name" placeholder="Name" required 
          onChange={this.onInputChange.bind(this, "name")} value={this.state.name}/>

          <Label htmlFor="signup-email">Email:</Label>
          <Input type="email" name="email" id="signup-email" placeholder="Email" required 
          onChange={this.onInputChange.bind(this, "email")} value={this.state.email} />

          <Label htmlFor="signup-password">Password:</Label>
          <Input type="password" name="password" id="signup-password" placeholder="Password" required 
          onChange={this.onInputChange.bind(this, "password")} value={this.state.password}/>

          <Button textOnButton="Sign Up" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/> 
        </Form>
      </ContentWrapper>
      
    )
  }
}

export default Signup;