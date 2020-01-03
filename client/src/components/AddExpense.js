import React, { Component } from 'react'; 
import axios from 'axios';
import Button from './Button';
import { Title, Form, Label, Input, Wrapper, customStyleSelect } from './styled';
import Select from 'react-select';

class AddExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripId: "5e0dd4da618f3e1f10d4db7f", // temporary
      name: "", 
      category: "",
      cost: "",
      currency: "",
      optionsCurrencies: [
        { value: 'PLN', label: 'PLN' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'JPY', label: 'JPY' },
        { value: 'AUD', label: 'AUD' },
        { value: 'CAD', label: 'CAD' },
        { value: 'CHF', label: 'CHF' }
      ],
      optionsCategories: [
        { value: 'food', label: 'food' },
        { value: 'travel', label: 'travel' },
        { value: 'tickets', label: 'tickets' },
        { value: 'accomodation', label: 'accomodation' },
        { value: 'health and insurance', label: 'health and insurance' },
        { value: 'other', label: 'other' }
      ]
    }
  }

  onInputChange = (e) => {
    const value = e.target.value; 
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  onSelectCurrencyChange = (optionsObject) => {
    const value = optionsObject.value; 
    this.setState({
      currency: value
    });
  }

  onSelectCategoryChange = (optionsObject) => {
    const value = optionsObject.value; 
    this.setState({
      category: value
    });
  }

  onFormSubmit = (e) => { 
    e.preventDefault();
    const expense = {
      name: this.state.name,
      category: this.state.category,
      cost: this.state.cost,
      currency: this.state.currency
    }
    axios.post(`http://localhost:3000/api/trips/${this.state.tripId}/expenses`, expense)
      .then(res => console.log(res.data));

    // reset inputs to blank to start over again after form submit
    this.setState({ name: "", category: "", currency: "", cost: "" })
  };

  render() {
    return (
      <Wrapper>
        <Title>Add Expense</Title>
        <Form onSubmit={this.onFormSubmit}>

          <Label htmlFor="name-exp-add">Name (3-30 characters):</Label>
          <Input minlength="3" maxlength="30" type="text" name="name" id="name-exp-add" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>

          <Label htmlFor="amount-add">Cost (0-10000):</Label>
          <Input min="0" max="10000" type="number" name="cost" id="cost-add" placeholder="Cost amount" required onChange={this.onInputChange} value={this.state.cost}/>

          <Label htmlFor="currency-add">Currency:</Label>
          <Select styles={customStyleSelect} options={this.state.optionsCurrencies} type="text" name="currency" id="currency-add" placeholder="Currency" required onChange={this.onSelectCurrencyChange} value={this.state.currency.value}/>

          <Label htmlFor="category-add">Category:</Label>
          <Select styles={customStyleSelect} options={this.state.optionsCategories} type="text" name="category" id="category-add" placeholder="Category" required onChange={this.onSelectCategoryChange} value={this.state.category.value}/>

          <Button textOnButton="Add" btnColor="#2EC66D" btnBorder="none"/> 

        </Form>
      </Wrapper>
    )
  }
} 
  
export default AddExpense;