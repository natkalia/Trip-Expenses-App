import React from 'react';
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
import Layout from '../layout/Layout';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props);
    return (
      <Router>
        <Layout>
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
          <Footer/>
        </Layout>
      </Router>
    )
  }

}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(App);