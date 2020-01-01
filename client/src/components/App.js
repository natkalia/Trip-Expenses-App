import React from 'react';
import { connect } from 'react-redux';
import {addFirstOne} from '../actions/exampleAction';


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
    <div>
      <header>
        React App
      </header>
      <p>{this.state.apiResponse}</p>
      <h1>{this.props.text}</h1>
      <button onClick={this.changeText}>kliknij</button>
    </div>
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