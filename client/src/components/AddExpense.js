import React, { Component } from 'react'; 
import axios from 'axios';
import { connect } from 'react-redux';
import ContentWrapper from './ContentWrapper';
import Button from './Button';
import { Form, Label, Input, customStyleSelect, TripHeader } from './styled';
import Select from 'react-select';
import getToken from '../utils/getToken';
import formatCurrencies from '../utils/formatCurrencies';



class AddExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenseName: "", 
      expenseCategory: 
        {
          value: "travel", 
          label: "travel"
        },
      expenseCost: "",
      expenseCurrency: 
        {
          value: "PLN", 
          label: "PLN"
        },
      tripCurrencies: formatCurrencies(this.props.currencyList),
      tripCategories: [],
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
      expenseCurrency: { value: value, label: value }
    });
  }

  onSelectCategoryChange = (optionsObject) => {
    const value = optionsObject.value; 
    this.setState({
      expenseCategory: { value: value, label: value }
    });
  }

  onFormSubmit = (e) => { 
    e.preventDefault();

    const expense = {
      name: this.state.expenseName,
      category: this.state.expenseCategory.value,
      cost: this.state.expenseCost,
      currency: this.state.expenseCurrency.value
    }

    axios.post(`http://localhost:3000/api/trips/${this.props.choosenTripId}/expenses`, expense, { headers: { "x-auth-token": `${getToken()}`}})
    .then(res => console.log(res.data))
    .then(this.setState({ 
      expenseName: "", 
      expenseCategory: {value: "travel", label: "travel"}, 
      expenseCurrency: {value: "PLN", label: "PLN"}, 
      expenseCost: ""
    }));
  };

  getCategoriesFromTrip = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.props.choosenTripId}`, { headers: { "x-auth-token": `${getToken()}`}});
    try {
      const sanitizedArrayCategories = res.data.categories.map(option => ({ value: option, label: option }));
      this.setState({
        tripCategories: sanitizedArrayCategories,
        expenseCategory: sanitizedArrayCategories[0]
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
      <>
        <TripHeader name={this.props.choosenTripName}/>
        <ContentWrapper title="Add Expense">

          <Form onSubmit={this.onFormSubmit}>

            <Label htmlFor="expenseName-add">Name (3-40 characters):</Label>
            <Input 
              minlength="3" 
              maxlength="40" 
              type="text" 
              name="expenseName" 
              id="expenseName-add" 
              placeholder="Name" 
              required 
              onChange={this.onInputChange}
              value={this.state.expenseName}/>

            <Label htmlFor="expenseCost-add">Cost (0-10000):</Label>
            <Input 
              min="0"
              max="10000" 
              type="number" 
              name="expenseCost" 
              id="expenseCost-add" 
              placeholder="Cost amount" 
              required 
              onChange={this.onInputChange} 
              value={this.state.expenseCost}
            />

            <Label htmlFor="expenseCurrency-add">Currency:</Label>
            <Select 
              styles={customStyleSelect} 
              options={this.state.tripCurrencies} 
              type="text" 
              name="expenseCurrency" 
              id="expenseCurrency-add" 
              required 
              onChange={this.onSelectCurrencyChange} 
              value={this.state.expenseCurrency}
            />

            <Label htmlFor="expenseCategory-add">Category:</Label>
            <Select 
              styles={customStyleSelect} 
              options={this.state.tripCategories} 
              type="text" 
              name="expenseCategory" 
              id="expenseCategory-add" 
              required
              onChange={this.onSelectCategoryChange} 
              value={this.state.expenseCategory}
            />

            <Button textOnButton="Add" btnColor="#2EC66D" btnBorder="none"/> 

          </Form>

        </ContentWrapper>
      </>
    )
  }
} 

const mapStateToProps = (state) => {
  return {    
    choosenTripId: state.choosenTrip.id,
    choosenTripName: state.choosenTrip.name,
    currencyList: state.currencyList
  }
}

export default connect(mapStateToProps)(AddExpense);