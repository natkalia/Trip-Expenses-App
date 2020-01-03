import React, { Component } from 'react'; 
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Form, 
  Label, 
  Input, 
  DateInput, 
  InputContainer, 
  Paragraph, 
  Textarea
} from './styled';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

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
      .then(res => console.log(res.data));

    // reset inputs to blank to start over again after form submit
    this.setState({ name: "", startDate: new Date(), description: "" })
  };

 
  render() {
    return (
      <ContentWrapper title="Add Trip">
        <Form onSubmit={this.onFormSubmit}>
          
          <Label htmlFor="name-add">Name (5-100 characters):</Label>
          <Input minlength="5" maxlength="100" type="text" name="name" id="name-add" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>
          
          <InputContainer>
            <Label htmlFor="startDate-add">Start date:</Label>
            <DatePicker customInput={<DateInput/>} dateFormat="yyyy/MM/dd" type="text" name="startDate" id="startDate-add" selected={this.state.startDate} onChange={this.onDateChange} todayButton="Today"/>
          </InputContainer>          

          <Label htmlFor="description-add">Description (10-200 characters):</Label>
          <Paragraph>This field is optional</Paragraph>
          <Textarea maxlength="200" name="description" id="description-add" placeholder="Description" onChange={this.onInputChange} value={this.state.description}/>
          <Button textOnButton="Add" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/> 
        </Form>
      </ContentWrapper>

    )
  }
} 
  
export default AddTrip;