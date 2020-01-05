import React, { Component } from 'react'; 
import axios from 'axios';
import ContentWrapper from './ContentWrapper';

class TripSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripId: "5e0dd4fa618f3e1f10d4db80", // temporary 
      expenseId: "5e0e0ffd4f0e0f24a0e1ec1b", // temporary 
      budgetAmount: "",
      budgetCurrency: "",
      spentAmountinMainCurrency: "",
      tripCurrenciesWithRatesToMainCurrency: [
        { name: 'USD', rate: 3 },
        { name: 'EUR', rate: 2 },
        { name: 'GBP', rate: 4 },
        { name: 'JPY', rate: 7 },
        { name: 'AUD', rate: 5 },
        { name: 'CAD', rate: 8 },
        { name: 'CHF', rate: 9 },
        { name: 'PLN', rate: 1 }
      ],
    }
  }

  getDataFromExpense = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.state.tripId}`);
    try {
      const expensesArray = [];
      const sumArray = [];
      res.data.expenses.forEach(expense => {
        expensesArray.push({ id: expense._id, cost: expense.cost, currency: expense.currency } )
      });
      this.state.tripCurrenciesWithRatesToMainCurrency.forEach(element => {
        for(let i = 0; i < expensesArray.length; i++) {
          if (element.name === expensesArray[i].currency) {
            sumArray.push(expensesArray[i].cost * element.rate);
          } else continue;
        }
      });
      const finalAmount = sumArray.reduce((x, y) => x + y, 0) 
      this.setState({
        spentAmountinMainCurrency: finalAmount
      });
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }
  


  getDataFromTrip = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.state.tripId}`);
    try {
      this.setState({
        budgetAmount: res.data.budget,
        budgetCurrency: res.data.mainCurrency,
        spentAmountinMainCurrency: 7 // calculate
      });
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  componentDidMount () {
    this.getDataFromTrip();
    this.getDataFromExpense();
    //pobrac wszystkie expenses
    //wziac dla kazdego expense cost i currency i przeliczyc na mainCurrency
    //potrzebny kurs waluty
    //dodac
  }

//przeliczanie walut!

  render() {
    return (
      <ContentWrapper title="Summary">

          <div>Budget: {this.state.budgetAmount} {this.state.budgetCurrency} </div>
          <div>Spent: {this.state.spentAmountinMainCurrency} {this.state.budgetCurrency}</div>
          <div>Left: {this.state.budgetAmount - this.state.spentAmountinMainCurrency} {this.state.budgetCurrency}</div>

          <ul>
              <li>Transport: </li>
              <li>Accomodation: </li>
              <li>Food: </li>
          </ul>



      </ContentWrapper>
    )
  }
}

export default TripSummary;