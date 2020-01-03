import React, { Component } from 'react'; 
import styled from 'styled-components';
import Button from './Button';
import axios from 'axios';
import Select from 'react-select'

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

// temporary hardcoded options for currencies
const optionsCurrencies = [
  { value: 'PLN', label: 'PLN' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

// temporary hardcoded options for categories
const optionsCategories = [
  { value: 'food', label: 'food' },
  { value: 'travel', label: 'travel' },
  { value: 'travel', label: 'accomodation' },
];

class AddExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      category: "",
      cost: "",
      currency: "",
    };
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
    console.log(this.state);
    axios.post(`http://localhost:3000/api/trips/5e0dd4da618f3e1f10d4db7f/expenses`, expense)
      .then(res => console.log(res.data));

    // reset inputs to blank to start over again after form submit
    // this.setState({ name: "", category: "", currency: "", cost: 0 })
  };

  componentDidUpdate () {
    console.log(this.state);
  }

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
          <Select options={optionsCurrencies} type="text" name="currency" id="currency-add" placeholder="Currency" required onChange={this.onSelectCurrencyChange} value={this.state.currency.value}/>

          <Label htmlFor="category-add">Category:</Label>
          <Select options={optionsCategories} type="text" name="category" id="category-add" placeholder="Category" required onChange={this.onSelectCategoryChange} value={this.state.category.value}/>

          <Button textOnButton="Add" btnColor="#2EC66D" btnBorder="none"/> 

        </Form>
      </Wrapper>
    )
  }
} 
  
export default AddExpense;