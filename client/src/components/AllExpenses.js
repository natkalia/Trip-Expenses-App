import React, { Component } from 'react'; 
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import {
  LinkButtonBig,
  TripHeader
} from './styled';
import {
  ExpenseLine,
  ExpensesList
} from './ExpensesList';
import ContentWrapper from './ContentWrapper';
import getToken from '../utils/getToken';

class AllExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Maybe this data (mainBudgetCurrency and name)
      // should be get from Redux after 
      // choice of trip
      name: "",
      tripId: "",
      expenses: []
    };
  }

  getActualExpenses = async () => {
    try {
      // it returns only data - don't change state
      const result = await axios.get(`http://localhost:3000/api/trips/${this.props.match.params.tripId}/expenses`, { headers: { "x-auth-token": `${getToken()}`} });
      const { expenses } = result.data;
      return expenses;
    } catch (error) {
      console.log(error);
    }
  }
  
  // this can be replaced with getActualExpenses() when
  // we will connect Redux and get trip name from it
  getActualTripInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/trips/${this.props.match.params.tripId}`, { headers: { "x-auth-token": `${getToken()}`} });
      const { expenses, name, _id: tripId } = result.data;
      this.setState({
        name: name,
        expenses: expenses,
        tripId: tripId,
      });
    } catch(error) {
      console.log(error);
    }
  }

  async componentDidMount () {
    // here we will get expenses data
    await this.getActualTripInfo();
    console.log('State 1:');
    console.log(JSON.stringify(this.state.expenses, null, 2));
    const onlyExpenses = await this.getActualExpenses();
    onlyExpenses.reverse();
    this.setState({expenses : onlyExpenses});
    console.log('State 2:');
    console.log(JSON.stringify(this.state.expenses, null, 2));
  }

  render() {
    return (
      <>
        <TripHeader name={this.state.name}/>

        <ContentWrapper title="Expenses List">
          <LinkButtonBig to={`/trips/${this.state.tripId}/expenses/add`} color="green">Add a new expense</LinkButtonBig>
          { this.state.expenses.length > 0 ? (
            <ExpensesList>
              { this.state.expenses.map((expense) => {
                return <ExpenseLine expense={expense} key={expense._id} tripId={this.state.tripId}/>
              })}

            </ExpensesList>
          ) : (
            <p>Ohm, you haven't any entered expenses yet.</p>
          )}
        </ContentWrapper>
      </>
    )
  }
} 
  
export default AllExpenses;