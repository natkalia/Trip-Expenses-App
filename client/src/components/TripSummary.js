import React, { Component } from 'react'; 
import axios from 'axios';
import ContentWrapper from './ContentWrapper';
import Chart from 'chart.js';
import styled from 'styled-components';
import { theme} from '../utils/theme'; 
import {
  TripHeader
} from './styled';

const Paragraph = styled.p`
  color: ${theme.colors.neutralDark};
  font-size: 20px;
  width: 100%;
  margin: 0px auto;
  text-align: center;
  margin-bottom: 10px;
`;

const Li = styled.li`
  list-style: none;
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  margin: 0px auto;
  text-align: left;
  color: ${theme.colors.neutralMidDark};
  padding: 0;
  margin-bottom: 10px;
`

class TripSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripName: "",
      budgetAmount: "",
      budgetCurrency: "",
      spentAmountinMainCurrency: "",
      tripCategories: [],
      tripCurrenciesWithRatesToMainCurrency: [ //should be fetched from API - what type of data?
        { name: 'USD', rate: 2 },
        { name: 'EUR', rate: 2 },
        { name: 'GBP', rate: 5 },
        { name: 'JPY', rate: 5 },
        { name: 'AUD', rate: 1 },
        { name: 'CAD', rate: 1 },
        { name: 'CHF', rate: 1 },
        { name: 'PLN', rate: 1 } // necessary to be able to loop through all expenses
      ],
      totalExpensesByCategory: [  //hardcoded
        {
          name: "transport", 
          amount: 2, 
          currency: "PLN"
        },
        {
          name: "food", 
          amount: 3, 
          currency: "PLN"
        },
        {
          name: "tickets", 
          amount: 5, 
          currency: "PLN"
        },
        {
          name: "other", 
          amount: 1, 
          currency: "PLN"
        },
        {
          name: "accomodation", 
          amount: 2, 
          currency: "PLN"
        },
      ]
    }
  }

  getDataFromTrip = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.props.match.params.id}`);
    try {
      this.setState({
        tripName: res.data.name,
        budgetAmount: res.data.budget,
        budgetCurrency: res.data.mainCurrency
      });
    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  getDataFromExpense = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.props.match.params.id}`);
    try {
      const expensesArray = [];
      let sumArray = [];

      res.data.expenses.forEach(expense => {
        expensesArray.push(
          { 
            id: expense._id, 
            cost: expense.cost, 
            currency: expense.currency 
          });
      });

      this.state.tripCurrenciesWithRatesToMainCurrency.forEach(element => {
        for(let i = 0; i < expensesArray.length; i++) {
          if (
              (element.name === expensesArray[i].currency) && 
              (element.name !== this.state.mainCurrency)
            ) 
            {
              sumArray.push(expensesArray[i].cost * element.rate);
            } else continue;
        }
      });
      sumArray = sumArray.reduce((x, y) => x + y, 0) 

      this.setState({
        spentAmountinMainCurrency: sumArray,
        tripCategories: res.data.categories
      });

    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  createChart = () => {
    const ctx = document.getElementById('budgetChart');
    // source of colors palette: https://flatuicolors.com/palette/fr
    const arrayColors = [
      "#fa983a",
      "#eb2f06",
      "#1e3799",
      "#3c6382",
      "#38ada9",

      "#f6b93b",
      "#e55039", 
      "#4a69bd", 
      "#60a3bc", 
      "#78e08f",

      "#e58e26",
      "#b71540",
      "#0c2461",
      "#0a3d62",
      "#079992",

      "#fad390", 
      "#f8c291",
      "#6a89cc",
      "#82ccdd",
      "#b8e994", 
    ];

    const arrayAmounts = [];
    const arrayCategories = [];
    this.state.totalExpensesByCategory.forEach(element => {
      arrayAmounts.push(element.amount);
      arrayCategories.push(element.name);
    });

    // eslint-disable-next-line 
    const budgetChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: arrayCategories, 
        datasets: [
          {
            label: "Cost amount",
            backgroundColor: arrayColors, 
            data: arrayAmounts
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Expenses by category:'
        }
      }
    });
  }
  
  componentDidMount = async () => { // not sure if this is correct approach - long loading, spinner needed?
    await this.getDataFromTrip();
    await this.getDataFromExpense();
    await this.createChart();
  }

  render() {
    return (
      <>

        <TripHeader name={this.state.tripName}/>

        <ContentWrapper title="Trip budget summary">

        <div>
          <Paragraph>Budget: {this.state.budgetAmount} {this.state.budgetCurrency} </Paragraph>
          <Paragraph>Spent: {this.state.spentAmountinMainCurrency} {this.state.budgetCurrency}</Paragraph>
          <Paragraph>Left: {this.state.budgetAmount - this.state.spentAmountinMainCurrency} {this.state.budgetCurrency}</Paragraph>
        </div>

          <ul>
            { this.state.totalExpensesByCategory.map((data, i) => {
                return (
                  <Li key={i}>Total expenses for {`${data.name}: ${data.amount} ${data.currency}`}</Li>
                );
              })
            }
         </ul>

          <canvas id="budgetChart" width="400" height="400"></canvas>

        </ContentWrapper>
      </>
    )
  }
}

export default TripSummary;