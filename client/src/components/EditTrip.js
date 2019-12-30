import React, { Component } from 'react'; 
import styled from 'styled-components';
import Button from './Button';
import DatePicker from 'react-datepicker';
import axios from 'axios';
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
  margin: 10px auto;
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  flex: 30%;
  display: inline-block;
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
  &:focus {
    outline: none;  
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

const IsFinishedContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
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
  &:focus {
    outline: none;  
  } 
`;

class EditTrip extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      name: "", 
      startDate: new Date(), 
      description: "", 
      isFinished: false,
      id: "5e0a112fde6b762d1442ef5b" // temporary
    };
  }

  onNameChange = (e) => {
    this.setState({ 
      name: e.target.value 
    })
  }

  onDateChange = (date) => {
    this.setState({ 
      startDate: date
    })
  }
  
  onIsFinishedChange = (e) => {
    this.setState({ 
      isFinished: e.target.checked 
    })
  }

  onDescriptionChange = (e) => {
    this.setState({ 
      description: e.target.value 
    })
  }
 
  onFormSubmit = (e) => { 
    e.preventDefault();

    const trip = {
      name: this.state.name,
      startDate: this.state.startDate,
      description: this.state.description
    }

    console.log(trip); // for debugging only
    let id="5e0a112fde6b762d1442ef5b"; // temporary id

    // send PUT request to backend endpoint
    axios.put("http://localhost:3000/api/trips/edit/" + id, trip)
      .then(res => console.log(res.data));

    // reset inputs to blank to start over again after form submit
    this.setState({ name: "", startDate: new Date(), description: "" })
  };

  render() {
    return (
      <Wrapper>
        <Title>Edit Trip Information</Title>
        <Form onSubmit={this.onFormSubmit}>
          
          <Label htmlFor="name-edit">Name:</Label>
          <Input type="text" name="name" id="name-edit" placeholder="Name" required onChange={this.onNameChange} value={this.state.name}/>
          
          <Label htmlFor="startDate-edit">Start date:</Label>
          <DatePicker customInput={<DateInput/>} dateFormat="yyyy/MM/dd" type="text" name="startDate" id="startDate-edit" selected={this.state.startDate} onChange={this.onDateChange} todayButton="Today"/>

          <Label htmlFor="description-edit">Description:</Label>
          <Paragraph>This field is optional</Paragraph>
          <Textarea name="description" id="description-edit" placeholder="Description" onChange={this.onDescriptionChange} value={this.state.description}/>

          <IsFinishedContainer>
            <Input type="checkbox" name="isFinished-edit" id="isFinished-edit" onChange={this.onIsFinishedChange} checked={this.state.isFinished}/>
            <Label htmlFor="isFinished-edit">Is this trip finished?</Label>
          </IsFinishedContainer>
          
          <Button textOnButton="Edit" btnColor="#70F4FD" btnBorder="none" onClick={this.onEditClick}/> 
          <Button textOnButton="Delete" btnColor="#fff" btnBorder="1px solid #000" onClick={this.onDeleteClick}/> 
        </Form>
      </Wrapper>
    )
  }
} 
  
export default EditTrip;