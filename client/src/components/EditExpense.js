import React, { Component } from 'react'; 
import styled from 'styled-components';
import Button from './Button';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
`
const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 24px;
  color: #4B52EE;
  margin: 10px auto;
`;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10px;
  margin: 10px auto;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  width: 100%;
  margin: 10px auto 0;
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  display: block;
  border: 1px solid #000;
  padding: 4px;
  border-radius: 3px;
  min-height: 26px;
  width: 100%;
  margin: 0 auto;
  &::placeholder{
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #999;
  }
`;

class EditExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "", // ?
      name: "", 
      category: "",
      cost: "", // ?
      currency: "",
    };
  }

  onInputChange = (e) => {
    const target = e.target;
    const value = target.value; 
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onEditSubmit = (e) => { 
    e.preventDefault();
    const expense = {
      name: this.state.name,
      category: this.state.category,
      cost: this.state.cost,
      currency: this.state.currency
    }

    axios.put(`http://localhost:3000/api/trips/5e0dd4fa618f3e1f10d4db80/expenses/` + this.state.id, expense)
      .then(res => console.log(res.data));

    // reset inputs to blank to start over again after form submit
    this.setState({ name: "", category: "", currency: "", cost: 0 })
  };

  onDeleteSubmit = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete this expense?")) {
    axios.delete("http://localhost:3000/api/trips/5e0dd4fa618f3e1f10d4db80/expenses/" + this.state.id)
    .then(res => console.log(res.data));
    } else return;
  };

  componentDidMount () {
    axios.get("http://localhost:3000/api/trips/5e0dd4fa618f3e1f10d4db80/expenses/5e0e11b74f0e0f24a0e1ec1d") // temporary two ids
      .then(res => this.setState({ 
        id: res.data.expense._id, 
        name: res.data.expense.name,
        category: res.data.expense.category,
        cost: res.data.expense.cost,
        currency: res.data.expense.currency
    }));
  }
 
  render() {
    return (
      <Wrapper>
        <Title>Edit Expense</Title>
        <Form onSubmit={this.onEditSubmit}>

          <Label htmlFor="name-exp-add">Name (3-30 characters):</Label>
          <Input minlength="3" maxlength="30" type="text" name="name" id="name-exp-add" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>

          <Label htmlFor="amount-add">Cost (0-10000):</Label>
          <Input min="0" max="10000" type="number" name="cost" id="cost-add" placeholder="Cost amount" required onChange={this.onInputChange} value={this.state.cost}/>

          <Label htmlFor="currency-add">Currency:</Label>
          <Input type="text" name="currency" id="currency-add" placeholder="Currency" required onChange={this.onInputChange} value={this.state.currency}/>

          <Label htmlFor="category-add">Category:</Label>
          <Input type="text" name="category" id="category-add" placeholder="Category" required onChange={this.onInputChange} value={this.state.category}/>

          <Button textOnButton="Edit" btnColor="#2EC66D" btnBorder="none"/> 

        </Form>

        <Form onSubmit={this.onDeleteSubmit}>
          <Button textOnButton="Delete" btnColor="#DC3545" btnBorder="none"/> 
        </Form>

      </Wrapper>
    )
  }
} 
  
export default EditExpense;