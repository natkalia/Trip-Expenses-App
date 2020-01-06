import React from 'react';
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
import PrivateRoute from './PrivateRoute';



class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Router>
        <Layout>
          <Header/>
          <Route path='/' exact component={HomePage} />
          <PrivateRoute path='/trips/add' component={AddTrip} />
          <PrivateRoute path='/trips/edit/:id' component={EditTrip} />
          <Route path='/users/login' component={SignIn} />
          <Route path='/users/register' component={RegisterUser} />
          <PrivateRoute path='/trips/single/:id' component={SingleTrip} />
          <PrivateRoute path='/trips/summary/:id' component={TripSummary} />
          <PrivateRoute path='/trips/all' component={AllTrips} />
          <PrivateRoute path='/trips/:tripId/expenses/edit/:expenseId' component={EditExpense} />
          <PrivateRoute path='/trips/:tripId/expenses/add' component={AddExpense} />
          <PrivateRoute path='/users/profile' component={UserProfile} />
          <Footer/>
        </Layout>
      </Router>
    )
  }
}

export default App;