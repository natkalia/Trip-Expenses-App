import React from 'react';
import AddTrip from './AddTrip';

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

  componentDidMount() {
    this.callAPI();
  }
  
  render() {
    return (
    <div>
      <header>
        Place for navigation menu
      </header>
      <AddTrip/>
      <p>{this.state.apiResponse}</p>
    </div>
    )
  }

}

export default App;