import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Input } from './styled';
import Button from './Button';
import ContentWrapper from './ContentWrapper';
import { setLoggedIn } from '../redux/actions/userActions';


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
    const url = "/api/users/login";
    await axios.post(url, user)
      .then(res => localStorage.setItem('travelplanner_x-auth-token', res.headers["x-auth-token"]))
      .then(() => this.props.setLoggedIn())
      .then(() => this.props.history.push('/trips/all'))
      // Uncomment and change :tripId for testing CurrencyComponent
      // Change Currency in Edit Trip or in Mongo Compass for test
      // different currency rates
      .then(() => this.props.history.push('/trips/edit/5e0dd4fa618f3e1f10d4db80')
      .then(() => this.props.history.push('/trips/5e0dd4fa618f3e1f10d4db80/expenses/')
      .then(() => this.props.history.push('/trips/summary/5e0dd4fa618f3e1f10d4db80')
      .then(() => this.props.history.push('/trips/single/5e0dd4fa618f3e1f10d4db80')
      .then(() => this.props.history.push('/trips/currencies/5e0dd4fa618f3e1f10d4db80')
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


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: () => dispatch(setLoggedIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
