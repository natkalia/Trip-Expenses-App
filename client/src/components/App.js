import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import AddTrip from './AddTrip';
import EditTrip from './EditTrip';
import Footer from './Footer';

import { addFirstOne } from '../actions/exampleAction';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  changeText = () => {
    this.props.addFirstOne("Zupełenie nowy text")
  }

  componentDidMount() {
    this.callAPI();
  }
  
  render() {
    return (
      <Router>
        <Header/>
        <Route path='/' exact component={HomePage} />
        <Route path='/add' exact component={AddTrip} />
        <Route path='/edit/:id' exact component={EditTrip} />
        {/* <Route path='/' exact component={} /> */}
          {/* <p>{this.state.apiResponse}</p>
          <h1>{this.props.text}</h1>
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