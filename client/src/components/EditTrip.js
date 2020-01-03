import React, { Component } from 'react'; 
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Form,
  Label,
  Input,
  InputCheckbox,
  InputContainer,
  DateInput,
  Paragraph,
  Textarea,
  IsTripFinishedContainer
} from './styled';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

class EditTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      startDate: "", 
      description: undefined, 
      isTripFinished: false
    };
  }

  onInputChange = (e) => {
    const target = e.target;
    // eslint-disable-next-line
    const value = target.type === 'checkbox' ? target.checked : target.value; 
    const name = target.name;

    // potentially place for additional validation: compare startDate and isFinished (current date);

    this.setState({
      [name]: value
    });
  }

  onDescriptionChange = (e) => {
    if (e.target.value !== "") {
      this.setState({ 
      description: e.target.value
      });
    } else {
      this.setState({ 
        description: undefined
      });
    }
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
      .then(res => console.log(res.data))
      .then(() => window.location = `/trips/single/${this.state.id}`);
  };

  onDeleteSubmit = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete this trip?")) {
    axios.delete("http://localhost:3000/api/trips/" + this.state.id)
    .then(res => console.log(res.data))
    .then(() => window.location = '/trips/all');
    } else return;
  };

  componentDidMount () {
    axios.get("http://localhost:3000/api/trips/5e0dd4da618f3e1f10d4db7f") // temporary currenTripId
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
      <ContentWrapper title="Edit Trip Information">
        <Form onSubmit={this.onEditSubmit}>

          <Label htmlFor="name-edit">Name (5-100 characters):</Label>
          <Input minlength="5" maxlength="100" type="text" name="name" id="name-edit" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>
              
          <InputContainer>
            <Label htmlFor="startDate-edit">Start date:</Label>
            <DatePicker customInput={<DateInput/>} dateFormat="yyyy/MM/dd" type="text" name="startDate" id="startDate-edit" selected={this.state.startDate} onChange={this.onDateChange} todayButton="Today"/>
          </InputContainer>
          
          <Label htmlFor="description-edit">Description (10-200 characters):</Label>
          <Paragraph>This field is optional</Paragraph>
          <Textarea maxlength="200" name="description" id="description-edit" placeholder="Description" onChange={this.onDescriptionChange} value={this.state.description}/>

          <IsTripFinishedContainer>
            <InputCheckbox type="checkbox" name="isTripFinished" id="isTripFinished-edit" onChange={this.onInputChange} checked={this.state.isTripFinished} />
            <Label htmlFor="isTripFinished-edit">Is this trip finished?</Label>
          </IsTripFinishedContainer>
          
          <Button textOnButton="Edit" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/>     
        </Form> 

        <Form onSubmit={this.onDeleteSubmit}>
          <Button textOnButton="Delete" textColor="#2EC66D" btnColor="#fff" btnBorder="1px solid #2EC66D"/> 
        </Form>

      </ContentWrapper>
    )
  }
} 
  
export default EditTrip;