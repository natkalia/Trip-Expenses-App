import React from 'react';
import Cookies from 'universal-cookie'; 
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import SignIn from './SignIn';
import RegisterUser from './RegisterUser';
import SingleTrip from './SingleTrip';
import AddTrip from './AddTrip';
import EditTrip from './EditTrip';
import EditExpense from './EditExpense';
import AddExpense from './AddExpense';
import TripSummary from './TripSummary';
import AllTrips from './AllTrips';
import UserProfile from './UserProfile';
import Footer from './Footer';

import { addFirstOne } from '../actions/exampleAction';


class App extends React.Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();
    this.state = {
      apiResponse: "",
      travelplanner_jwt: cookies.get('travelplanner_jwt') || ""
    };
  }

  changeText = () => {
    this.props.addFirstOne("Zupełenie nowy text")    
  }
  
  render() {
    return (
      <Router>
        <Header/>
        <Route path='/' exact component={HomePage} />
        <Route path='/trips/add' component={AddTrip} />
        <Route path='/trips/edit/:id' component={EditTrip} />
        <Route path='/users/login' component={SignIn} />
        <Route path='/users/register' component={RegisterUser} />
        <Route path='/trips/single/:id' component={SingleTrip} />
        <Route path='/trips/summary/:id' component={TripSummary} />
        <Route path='/trips/all' component={AllTrips} />
        <Route path='/trips/:tripId/expenses/edit/:expenseId' component={EditExpense} />
        <Route path='/trips/:tripId/expenses/add' component={AddExpense} />
        <Route path='/users/profile' component={UserProfile} />

        {/* do usuniecia później */}
        {/* <h1>{this.props.text}</h1>
        <button onClick={this.changeText}>kliknij</button> */}
        <Footer/>
      </Router>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    text: state.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFirstOne: newText => dispatch(addFirstOne(newText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);