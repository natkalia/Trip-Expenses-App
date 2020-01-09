import React, { Component } from 'react'; 
import axios from 'axios';
import { connect } from 'react-redux';
import {
  LinkButtonBig,
  TripHeader,
  LinkText,
  NavLinksContainer
} from './styled';
import {
  ExpenseLine,
  ExpensesList
} from './ExpensesList';
import ContentWrapper from './ContentWrapper';
import getToken from '../utils/getToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class AllExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
  }

  getActualExpenses = async () => {
    try {
      // it returns only data - don't change state
      // it is used to filter & sort data
      // if we will keep all expenses in Redux it may call data from Redux
      const result = await axios.get(`http://localhost:3000/api/trips/${this.props.choosenTripId}/expenses`, { headers: { "x-auth-token": `${getToken()}`} });
      const { expenses } = result.data;
      return expenses;
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount () {
    // here we will get expenses data
    const onlyExpenses = await this.getActualExpenses();
    onlyExpenses.reverse();
    this.setState({expenses : onlyExpenses});
    // what we get from state:
    // console.log(JSON.stringify(this.state.expenses, null, 2));
  }

  render() {
    return (
      <>
        <TripHeader name={this.props.choosenTripName}/>

        <ContentWrapper title="Expenses List">
          <LinkButtonBig to={`/trips/${this.props.choosenTripId}/expenses/add`} color="green">Add a new expense</LinkButtonBig>
          { this.state.expenses.length > 0 ? (
            <ExpensesList>
              { this.state.expenses.map((expense) => {
                return <ExpenseLine expense={expense} key={expense._id} tripId={this.props.choosenTripId}/>
              })}

            </ExpensesList>
          ) : (
            <p>Oh, you haven't entered any expenses yet.</p>
          )}
          <NavLinksContainer>            
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
    choosenTripName: state.choosenTrip.name
  }
}

export default connect(mapStateToProps)(AllExpenses);