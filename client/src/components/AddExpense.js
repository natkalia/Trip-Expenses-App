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
      expenseName: "", 
      expenseCategory: "",
      expenseCost: "",
      expenseCurrency: "",
      tripCurrencies: [
        { value: 'PLN', label: 'PLN' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'JPY', label: 'JPY' },
        { value: 'AUD', label: 'AUD' },
        { value: 'CAD', label: 'CAD' },
        { value: 'CHF', label: 'CHF' }
      ],
      tripCategories: ""
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
      expenseCurrency: value
    });
  }

  onSelectCategoryChange = (optionsObject) => {
    const value = optionsObject.value; 
    this.setState({
      expenseCategory: value
    });
  }

  onFormSubmit = (e) => { 
    e.preventDefault();

    const expense = {
      name: this.state.expenseName,
      category: this.state.expenseCategory,
      cost: this.state.expenseCost,
      currency: this.state.expenseCurrency
    }

    axios.post(`http://localhost:3000/api/trips/${this.state.tripId}/expenses`, expense)
    .then(res => console.log(res.data))
    .then(this.setState({ expenseName: "", expenseCategory: "", expenseCurrency: "", expenseCost: ""}));
  };

  getCategoriesFromTrip = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.state.tripId}`);
    try {
      const sanitizedArrayCategories = res.data.categories.map(option => ({ value: option, label: option }));
      this.setState({
        tripCategories: sanitizedArrayCategories
      });

    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  componentDidMount () {
    this.getCategoriesFromTrip();

  }

  render() {
    return (
      <Wrapper>
        <Title>Add Expense</Title>
        <Form onSubmit={this.onFormSubmit}>

          <Label htmlFor="expenseName-add">Name (3-30 characters):</Label>
          <Input minlength="3" maxlength="30" type="text" name="expenseName" id="expenseName-add" placeholder="Name" required onChange={this.onInputChange} value={this.state.expenseName}/>

          <Label htmlFor="expenseCost-add">Cost (0-10000):</Label>
          <Input min="0" max="10000" type="number" name="expenseCost" id="expenseCost-add" placeholder="Cost amount" required onChange={this.onInputChange} value={this.state.expenseCost}/>

          <Label htmlFor="expenseCurrency-add">Currency:</Label>
          <Select styles={customStyleSelect} options={this.state.tripCurrencies} type="text" name="expenseCurrency" id="expenseCurrency-add" placeholder="Currency" required onChange={this.onSelectCurrencyChange} value={this.state.expenseCurrency.value}/>

          <Label htmlFor="expenseCategory-add">Category:</Label>
          <Select styles={customStyleSelect} options={this.state.tripCategories} type="text" name="expenseCategory" id="expenseCategory-add" placeholder="Category" required onChange={this.onSelectCategoryChange} value={this.state.expenseCategory.value}/>

          <Button textOnButton="Add" btnColor="#2EC66D" btnBorder="none"/> 

        </Form>
      </Wrapper>
    )
  }
} 
  
export default AddExpense;