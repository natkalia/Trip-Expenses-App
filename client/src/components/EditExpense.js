import React, { Component } from 'react'; 
import axios from 'axios';
import { connect } from 'react-redux';
import ContentWrapper from './ContentWrapper';
import Button from './Button';
import {
  Form,
  Label,
  Input,
  customStyleSelect,
  TripHeader,
  LinkText,
  NavLinksContainer
} from './styled';
import Select from 'react-select';
import getToken from '../utils/getToken';
import formatCurrencies from '../utils/formatCurrencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class EditExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripId: this.props.choosenTripId,
      expenseId: this.props.match.params.expenseId,
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
      tripCurrencies: formatCurrencies(this.props.currencyList),
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
    await axios.put(`/api/trips/${this.props.choosenTripId}/expenses/${this.state.expenseId}`, expense, { headers: { "x-auth-token": `${getToken()}`} });
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
      this.props.history.push(`/trips/single/${this.props.choosenTripId}`);
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  onDeleteSubmit = async (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete this expense?")) {
      await axios.delete(`/api/trips/${this.props.choosenTripId}/expenses/${this.state.expenseId}`, { headers: { "x-auth-token": `${getToken()}`} });
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
        this.props.history.push(`/trips/single/${this.props.choosenTripId}`);
      } catch (error) {
        this.setState({ error: 'Error' });
      }
    } else return;
  }

  getTripAndExpenseData = async () => {
    const res = await axios.get(`/api/trips/${this.props.choosenTripId}`, { headers: { "x-auth-token": `${getToken()}`} });
    try {
      const sanitizedArrayCategories = res.data.categories.map(option => ({ value: option, label: option }));
      let sanitizedExpense = res.data.expenses.filter(arr => (arr._id === this.state.expenseId));
      sanitizedExpense = sanitizedExpense[0];
        this.setState({
        tripCategories: sanitizedArrayCategories,
        expenseName: sanitizedExpense.name, 
        expenseCost: sanitizedExpense.cost,
        expenseCurrency: { value: sanitizedExpense.currency, label: sanitizedExpense.currency },
        expenseCategory: { value: sanitizedExpense.category, label: sanitizedExpense.category },
      });
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  componentDidMount () {
    this.getTripAndExpenseData();
  }
 
  render() {
    return (
      <>
        <TripHeader name={this.props.choosenTripName}/>
        <ContentWrapper title="Edit Expense">

          <Form onSubmit={this.onEditSubmit}>

            <Label htmlFor="expenseName-edit">Name (3-40 characters):</Label>
            <Input 
              minlength="3" 
              maxlength="40" 
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

            <Button textOnButton="Edit" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/> 

          </Form>

          <Form onSubmit={this.onDeleteSubmit}>
            <Button textOnButton="Delete" textColor="#fff" btnColor="#DC3545" btnBorder="none"/> 
          </Form>

          <NavLinksContainer>
              <LinkText to = { `/trips/${this.props.choosenTripId}/expenses/all`} >
                <FontAwesomeIcon icon="arrow-left"/>&nbsp;&nbsp; Back to All Expenses
              </LinkText>
              <LinkText to={`/trips/single/${this.props.choosenTripId}`}>
                <FontAwesomeIcon icon="arrow-left"/>&nbsp;&nbsp; Back to Trip Details
              </LinkText>
            </NavLinksContainer>

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

export default connect(mapStateToProps)(EditExpense);