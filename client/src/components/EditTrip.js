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
  margin: 0 auto;
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

const IsTripFinishedContainer = styled.div`
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
      startDate: "", 
      description: "", 
      isTripFinished: false
    };
  }

  onInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; 
    const name = target.name;

    // potentially place for additional validation: compare startDate and isFinished (current date);

    this.setState({
      [name]: value
    });
  }

  onDateChange = (date) => {
    this.setState({ 
      startDate: date
    })
  }
   
  onEditSubmit = (e) => { 
    e.preventDefault(); 
    const trip = {
      name: this.state.name,
      startDate: moment(this.state.startDate).format(),
      description: this.state.description,
      isTripFinished: this.state.isTripFinished
    }
    axios.put("http://localhost:3000/api/trips/edit/" + this.state.id, trip)
      .then(res => console.log(res.data));    
  };

  onDeleteSubmit = (e) => {
    e.preventDefault();
    axios.delete("http://localhost:3000/api/trips/" + this.state.id)
    .then(res => console.log(res.data));
  };

  componentDidMount () {
    axios.get("http://localhost:3000/api/trips/5e0cd2259f1d29379c9c1729") // temporary currenTripId
      .then(res => this.setState({ 
        id: res.data._id,
        name: res.data.name,
        startDate: new Date(res.data.startDate),
        description: res.data.description,
        isTripFinished: res.data.isTripFinished
    }));
  }

  render() {
    return (
      <Wrapper>
        <Title>Edit Trip Information</Title>
        <Form onSubmit={this.onEditSubmit}>
          
          <Label htmlFor="name-edit">Name:</Label>
          <Input type="text" name="name" id="name-edit" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>
          
          <Label htmlFor="startDate-edit">Start date:</Label>
          <DatePicker customInput={<DateInput/>} dateFormat="yyyy/MM/dd" type="text" name="startDate" id="startDate-edit" selected={this.state.startDate} onChange={this.onDateChange} todayButton="Today"/>

          <Label htmlFor="description-edit">Description:</Label>
          <Paragraph>This field is optional</Paragraph>
          <Textarea name="description" id="description-edit" placeholder="Description" onChange={this.onInputChange} value={this.state.description}/>

          <IsTripFinishedContainer>
            <Input type="checkbox" name="isTripFinished" id="isTripFinished-edit" onChange={this.onInputChange} checked={this.state.isTripFinished} />
            <Label htmlFor="isTripFinished-edit">Is this trip finished?</Label>
          </IsTripFinishedContainer>
          
          <Button textOnButton="Edit" btnColor="#70F4FD" btnBorder="none"/>     
        </Form> 

        <Form onSubmit={this.onDeleteSubmit}>
          <Button textOnButton="Delete" btnColor="#fff" btnBorder="1px solid #000"/> 
        </Form>

      </Wrapper>
    )
  }
} 
  
export default EditTrip;