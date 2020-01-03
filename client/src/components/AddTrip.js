import React, { Component } from 'react'; 
import styled from 'styled-components';
import Button from './Button';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
`
const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 24px;
  color: #4B52EE;
  margin: 10px auto;
`;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10px;
  margin: 10px auto;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  width: 100%;
  margin: 10px auto 0;
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  display: block;
  border: 1px solid #000;
  padding: 4px;
  border-radius: 3px;
  min-height: 26px;
  width: 100%;
  margin: 0 auto;
  &::placeholder{
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #999;
  }
`;

const DateInput = styled(Input)`
  width: 40%;
  margin: 0;
  text-align: center;
`;

const Paragraph = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  color: #000;
  padding: 0;
  margin: 0;
`;

const Textarea = styled.textarea`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  display: block;
  border: 1px solid #000;
  padding: 4px;
  border-radius: 3px;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  resize: vertical;
  &::placeholder{
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #999;
  }
`;

class AddTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      startDate: Date.now(), 
      description: undefined 
    };
  }

  onInputChange = (e) => {
    const target = e.target;
    const value = target.value; 
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onDateChange = (date) => {
    this.setState({ 
      startDate: date
    })
  }

  onFormSubmit = (e) => { 
    e.preventDefault();
    const trip = {
      name: this.state.name,
      startDate: moment(this.state.startDate).format(),
      // eslint-disable-next-line
      description:  this.state.description == false ? undefined : this.state.description
    }
    axios.post("http://localhost:3000/api/trips/add", trip)
      .then(res => console.log(res.data))
      .then(() => this.setState({ name: "", startDate: new Date(), description: "" }))
      .then(() => window.location = "/trips/all")
  };

 
  render() {
    return (
      <Wrapper>
        <Title>Add Trip</Title>
        <Form onSubmit={this.onFormSubmit}>
          
          <Label htmlFor="name-add">Name (5-100 characters):</Label>
          <Input minlength="5" maxlength="100" type="text" name="name" id="name-add" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>
          
          <Label htmlFor="startDate-add">Start date:</Label>
          <DatePicker customInput={<DateInput/>} dateFormat="yyyy/MM/dd" type="text" name="startDate" id="startDate-add" selected={this.state.startDate} onChange={this.onDateChange} todayButton="Today"/>

          <Label htmlFor="description-add">Description (10-200 characters):</Label>
          <Paragraph>This field is optional</Paragraph>
          <Textarea maxlength="200" name="description" id="description-add" placeholder="Description" onChange={this.onInputChange} value={this.state.description}/>
          <Button textOnButton="Add" btnColor="#70F4FD" btnBorder="none"/> 
        </Form>
      </Wrapper>
    )
  }
} 
  
export default AddTrip;