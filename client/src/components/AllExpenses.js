import React, { Component } from 'react'; 
import axios from 'axios';
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
      // it is used to filter & sort data
      // if we will keep all expenses in Redux it may call data from Redux
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
      const { name, _id: tripId } = result.data;
      this.setState({
        name: name,
        tripId: tripId,
      });
    } catch(error) {
      console.log(error);
    }
  }

  async componentDidMount () {
    // here we will get expenses data
    await this.getActualTripInfo();
    const onlyExpenses = await this.getActualExpenses();
    onlyExpenses.reverse();
    this.setState({expenses : onlyExpenses});
    // what we get from state:
    // console.log(JSON.stringify(this.state.expenses, null, 2));
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
            <p>Oh, you haven't entered any expenses yet.</p>
          )}
        </ContentWrapper>
      </>
    )
  }
} 
  
export default AllExpenses;