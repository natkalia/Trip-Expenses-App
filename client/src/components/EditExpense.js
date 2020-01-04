import React, { Component } from 'react'; 
import axios from 'axios';
import ContentWrapper from './ContentWrapper';
import Button from './Button';
import { Form, Label, Input, customStyleSelect } from './styled';
import Select from 'react-select';

class EditExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripId: "5e0dd4fa618f3e1f10d4db80", // temporary
      expenseId: "5e0e10274f0e0f24a0e1ec1c", // temporary
      expenseName: "", 
      expenseCategory: 
      {
        value: "", 
        label: ""
      },
      expenseCost: "",
      expenseCurrency: 
      {
        value: "", 
        label: ""
      },
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
      tripCategories: []
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

    this.setState({
      expenseCurrency: optionsObject
    });
  }

  onSelectCategoryChange = (optionsObject) => {

    this.setState({
      expenseCategory: optionsObject
    });
  }

  onEditSubmit = async (e) => { 
    e.preventDefault();
    const expense = {
      name: this.state.expenseName,
      category: this.state.expenseCategory.value,
      cost: this.state.expenseCost,
      currency: this.state.expenseCurrency.value
    }
    console.log(expense);
      await axios.put(`http://localhost:3000/api/trips/${this.state.tripId}/expenses/${this.state.expenseId}`, expense);
      // not sure if this cleanup of state is necessary as we redirect user to other path
      try {
        this.setState({ 
          expenseName: "", 
          expenseCategory: {
            value: "", 
            label: ""
          },
          expenseCurrency: {
            value: "", 
            label: ""
          }, 
          expenseCost: ""
        });
        confirm("Expense was succesfully edited and saved!"); // validation should be added to check this
        window.location=`/trips/single/${this.state.tripId}`; // redirect to single trip after editing expense
      } catch (error) {
        this.setState({ error: 'Error' });
      }
  }

  onDeleteSubmit = async (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete this expense?")) {

      await axios.delete(`http://localhost:3000/api/trips/${this.state.tripId}/expenses/${this.state.expenseId}`);
      // not sure if this cleanup of state is necessary as we redirect user to other path
      try {
        this.setState({ 
          expenseName: "", 
          expenseCategory: {
            value: "", 
            label: ""
          },
          expenseCurrency: {
            value: "", 
            label: ""
          }, 
          expenseCost: ""
        });
        confirm("Expense is deleted!"); // validation should be added to check this
        window.location=`/trips/single/${this.state.tripId}`; // redirect to single trip after deleting expense
      } catch (error) {
        this.setState({ error: 'Error' });
      }
    } else return;
  }

  getCategoriesFromTrip = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.state.tripId}`);
    try {
      const sanitizedArrayCategories = res.data.categories.map(option => ({ value: option, label: option }));
      this.setState({
        tripCategories: sanitizedArrayCategories,
      });
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  getExpenseData = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.state.tripId}/expenses/${this.state.expenseId}`);
    try {
      this.setState({
        expenseName: res.data.expense.name,
        expenseCost: res.data.expense.cost,
        expenseCurrency: { value: res.data.expense.currency, label: res.data.expense.currency },
        expenseCategory: { value: res.data.expense.category, label: res.data.expense.category }
      });
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  componentDidMount () {
    // refactor to make one get request? use sth to includes ${this.state.expenseId} and then res.data.foundExpense.currency etc?
    this.getCategoriesFromTrip();
    this.getExpenseData();
  }
 
  render() {
    return (
      <ContentWrapper title="Edit Expense">

        <Form onSubmit={this.onEditSubmit}>

          <Label htmlFor="expenseName-edit">Name (3-30 characters):</Label>
          <Input 
            minlength="3" 
            maxlength="30" 
            type="text" 
            name="expenseName" 
            id="expenseName-edit"
            placeholder="Name"
            required 
            onChange={this.onInputChange} 
            value={this.state.expenseName}
          />

          <Label htmlFor="expenseCost-edit">Cost (0-10000):</Label>
          <Input 
            min="0" 
            max="10000" 
            type="number" 
            name="expenseCost" 
            id="expenseCost-edit" 
            placeholder="Cost amount" 
            required 
            onChange={this.onInputChange} 
            value={this.state.expenseCost}
          />

          <Label htmlFor="expenseCurrency-edit">Currency:</Label>
          <Select 
            styles={customStyleSelect} 
            options={this.state.tripCurrencies} 
            type="text" 
            name="expenseCurrency" 
            id="expenseCurrency-edit" 
            placeholder="Currency" 
            required onChange={this.onSelectCurrencyChange} 
            value={this.state.expenseCurrency}
          />

          <Label htmlFor="expenseCategory-edit">Category:</Label>
          <Select 
            styles={customStyleSelect} 
            options={this.state.tripCategories} 
            type="text" 
            name="expenseCategory" 
            id="expenseCategory-edit" 
            placeholder="Category" 
            required 
            onChange={this.onSelectCategoryChange} 
            value={this.state.expenseCategory}
          />

          <Button textOnButton="Edit" btnColor="#2EC66D" btnBorder="none"/> 

        </Form>

        <Form onSubmit={this.onDeleteSubmit}>
          <Button textOnButton="Delete" btnColor="#DC3545" btnBorder="none"/> 
        </Form>

      </ContentWrapper>
    )
  }
} 
  
export default EditExpense;