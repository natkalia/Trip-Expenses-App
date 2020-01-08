import React, { Component } from 'react'; 
import axios from 'axios';
import ContentWrapper from './ContentWrapper';
import Chart from 'chart.js';
import styled from 'styled-components';
import { theme } from '../utils/theme'; 
import getToken from '../utils/getToken';
import {
  TripHeader, 
  InnerContainer,
  H3
} from './styled';

const Paragraph = styled.p`
  color: ${theme.colors.neutralDark};
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  margin: 5px;
`;

const Li = styled.li`
  list-style: circle;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  margin: 0px auto;
  text-align: left;
  ${theme.colors.neutralMidDark};
  padding: 0;
  margin-bottom: 4px;
`
const ChartContainer = styled.div` 
  width: 80%;
  margin: 0 auto;
`

const ColoredLine = styled.hr` 
  width: 70%;
  height: 3px;
  margin: 10px auto;
  ${theme.colors.neutralMidDark};
`

const UnorderedList = styled.ul` 
  margin: 20px auto;
  width: 80%;
`

const SubTitle = styled(H3)`
  color: ${theme.colors.neutralDark};
  margin: 10px auto;
  text-align: center;
  font-weight: 700;
`;

class TripSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripName: "",
      budgetAmount: "",
      budgetCurrency: "",
      spentAmountinMainCurrency: "",
      tripCategories: [],
      tripCurrenciesWithRatesToMainCurrency: [ //should be fetched from API - to be refactored
        { name: 'USD', rate: 4.2569 },
        { name: 'EUR', rate: 3.8213 },
        { name: 'GBP', rate: 4.9934 },
        { name: 'JPY', rate: 3.5358 },
        { name: 'AUD', rate: 2.6507 },
        { name: 'CAD', rate: 2.9430 },
        { name: 'CHF', rate: 3.9254 },
        { name: 'PLN', rate: 1 } // necessary to make sure that always we can loop through all expenses, this should be refactored to use other main currencies
      ],
      totalExpensesByCategory: []
    }
  }

  getDataFromTrip = async () => {
    const res = await axios.get(`http://localhost:3000/api/trips/${this.props.match.params.id}`, { headers: { "x-auth-token": `${getToken()}`} });
    try {
      // use data to create expnsesArray with objects representing trip expenses in different currencies
      const expensesArray = [];
      let expensesSum = [];
      res.data.expenses.forEach(element => {
        expensesArray.push(
          { 
            id: element._id,
            name: element.name,
            cost: element.cost, 
            currency: element.currency, 
            category: element.category
          });
      });

      // use expensesArray to create variable expensesSum with one number: all added expenses, recalculated to main currency using currency rates
      this.state.tripCurrenciesWithRatesToMainCurrency.forEach(element => {
        for(let i = 0; i < expensesArray.length; i++) {
          if (
              (element.name === expensesArray[i].currency) && 
              (element.name !== this.state.mainCurrency)
            ) 
            {
              expensesSum.push(expensesArray[i].cost * element.rate);
            } else continue;
        }
      });
      expensesSum = expensesSum.reduce((x, y) => x + y, 0) 

      //calculate data to get values for totalExpensesByCategory in state
      const perCategoryArray = res.data.categories.map(function(value) {
        return {name: value, amount: 0, currency: res.data.mainCurrency}; 
      });
      expensesArray.forEach(el => {
        for(let i = 0; i < perCategoryArray.length; i++) {   
          if (perCategoryArray[i].name === el.category) {
            const obj = this.state.tripCurrenciesWithRatesToMainCurrency.find(o => o.name === el.currency);
            const singleRate = obj.rate;
            perCategoryArray[i].amount = perCategoryArray[i].amount + (el.cost * singleRate); 
            return perCategoryArray;
          } else continue;
        }
      });

      this.setState({
        tripName: res.data.name,
        budgetAmount: res.data.budget,
        budgetCurrency: res.data.mainCurrency,
        tripCategories: res.data.categories,
        spentAmountinMainCurrency: expensesSum,
        totalExpensesByCategory: perCategoryArray
      });

    } catch (error) {
      this.setState({ error: 'Error' });
    }
  }

  createChartExpenses = () => {
    const ctx = document.getElementById('expensesChart');
    const arrayColors = [
      "#fa983a", "#eb2f06", "#1e3799", "#3c6382", "#38ada9",
      "#f6b93b", "#e55039", "#4a69bd", "#60a3bc", "#78e08f",
      "#e58e26", "#b71540", "#0c2461", "#0a3d62", "#079992",
      "#fad390", "#f8c291", "#6a89cc", "#82ccdd", "#b8e994"
    ];

    const arrayAmounts = [];
    const arrayCategories = [];
    this.state.totalExpensesByCategory.forEach(element => {
      arrayAmounts.push(Math.floor(element.amount, 2));
      arrayCategories.push(element.name);
    });

    // eslint-disable-next-line 
    const expensesChart = new Chart(ctx, {
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
          display: false,
          text: 'Total expenses by category:',
        },
        legend: {
          display: true,
          labels: {
            fontSize: 14,
            fontFamily: theme.fonts.default,
            fontColor: theme.colors.neutralDark
          },
          boxWidth: 40,
          position: "top",
          align: "center"
        },
        
      }
    });
  }

  componentDidMount = async () => {
    await this.getDataFromTrip();
    await this.createChartExpenses();
  }

  render() {
    return (
      <>
        <TripHeader name={this.state.tripName}/>
        <ContentWrapper title="Budget Overview">
          <InnerContainer>
            <Paragraph> 
              {
                `Budget: 
                ${this.state.budgetAmount} 
                ${this.state.budgetCurrency}`
              }
            </Paragraph>
            <Paragraph>
              {
                `Spent: 
                ${Math.floor(this.state.spentAmountinMainCurrency, 2)} 
                ${this.state.budgetCurrency}`
              } 
            </Paragraph>
            <Paragraph>
              {
                `Left: 
                ${Math.floor((this.state.budgetAmount - this.state.spentAmountinMainCurrency), 2)} 
                ${this.state.budgetCurrency}`
              } 
            </Paragraph>
            <ColoredLine/>
            <SubTitle>Total expenses by category</SubTitle>
            <UnorderedList>
                { this.state.totalExpensesByCategory.map((data, i) => {
                    return (
                      <Li key={i}>
                        {
                          `${data.name}: 
                          ${Math.floor(data.amount)} 
                          ${data.currency}`
                        }
                      </Li>
                    );
                  })
                }
            </UnorderedList>
            <ChartContainer>
              <canvas id="expensesChart" width="300" height="300"></canvas>
            </ChartContainer>
          </InnerContainer>
        </ContentWrapper>
      </>
    )
  }
}

export default TripSummary;