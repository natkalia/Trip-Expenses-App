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
  ParagraphSmallItalic,
  Textarea,
  customStyleSelect
} from './styled';
import Select from 'react-select';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

class AddTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      startDate: Date.now(), 
      description: undefined,
      budget: "",
      budgetCurrency:
        {
          value: "PLN",
          label: "PLN"
        },
      tripCurrencies: []
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

  onSelectCurrencyChange = (optionsObject) => {
    const selectValue = optionsObject.value;
    this.setState({
      budgetCurrency:
        {
          value: selectValue,
          label: selectValue
        }
    })
  }

  onFormSubmit = (e) => { 
    e.preventDefault();
    const trip = {
      name: this.state.name,
      startDate: moment(this.state.startDate).format(),
      // eslint-disable-next-line
      description:  this.state.description == false ? undefined : this.state.description,
      budget: this.state.budget === "" ? 0 : this.state.budget,
      mainCurrency: this.state.budgetCurrency.value
    }
    let token = localStorage.getItem("travelplanner_x-auth-token");
    axios.post("http://localhost:3000/api/trips/add", trip, { headers: { "x-auth-token": `${token}`} })
      .then(res => console.log(res.data))
      .then(() => this.setState({
        name: "",
        startDate: new Date(),
        description: undefined,
        budget: "",
        budgetCurrency:
          {
            value: "PLN",
            label: "PLN"
          },
      }))
      .then(() => window.location = "/trips/all")
  };

  getSupportedCurrencyList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/currencies/list');
      const { data: { currencies }} = response;
      const tripCurrencies = currencies.map((currency) => {
        return {
          value: currency,
          label: currency
        }
       });
      this.setState({
        tripCurrencies: tripCurrencies
      })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount () {
    if (!this.state.tripCurrencies.length) this.getSupportedCurrencyList();
  }
 
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

          <Label htmlFor="budget-add">Budget: (from 0 to 1 million)</Label>
          <Input 
            min="0"
            max="100000000" 
            type="number" 
            name="budget" 
            id="budget-add" 
            placeholder="Your budget" 
            required 
            onChange={this.onInputChange} 
            value={this.state.budget}
          />

          <Label htmlFor="budgetCurrency-add">Currency:</Label>
          <Select 
            styles={customStyleSelect} 
            options={this.state.tripCurrencies} 
            type="text" 
            name="budgetCurrency" 
            id="budgetCurrency-add" 
            required 
            onChange={this.onSelectCurrencyChange} 
            value={this.state.budgetCurrency}
          />

          <Label htmlFor="description-add">Description (10-200 characters):</Label>
          <ParagraphSmallItalic>This field is optional</ParagraphSmallItalic>
          <Textarea maxlength="200" name="description" id="description-add" placeholder="Description" onChange={this.onInputChange} value={this.state.description}/>
          <Button textOnButton="Add" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/> 
        </Form>
      </ContentWrapper>

    )
  }
} 
  
export default AddTrip;