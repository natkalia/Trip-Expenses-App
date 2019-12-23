import React from 'react';

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
        React App
      </header>
      <p>{this.state.apiResponse}</p>
    </div>
    )
  }

}

export default App;