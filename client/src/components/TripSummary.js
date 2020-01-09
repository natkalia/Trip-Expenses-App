import React, { Component } from 'react'; 
import axios from 'axios';
import { connect } from 'react-redux';
import ContentWrapper from './ContentWrapper';
import Chart from 'chart.js';
import styled from 'styled-components';
import { theme } from '../utils/theme'; 
import getToken from '../utils/getToken';
import {
  TripHeader, 
  InnerContainer,
  H3,
  LinkText,
  NavLinksContainer
} from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getActualCurrencyRates from '../utils/getActualCurrencyRates';
import { setExchangeRates } from '../redux/actions/userActions';
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
      tripCategories: [], 
      tripBudget: 0, 
      totalExpensesByCategory: [], 
      sumExpenses: 0, 
    }
  }

  getDataFromTrip = async () => {
     const res = await axios.get(`/api/trips/${this.props.choosenTripId}`, { headers: { "x-auth-token": `${getToken()}`} });
    try {

      // modify object with currencies table to get one array of currencies rate in relation to main currency
      let finalRatesList = this.props.exchangeRates;

      // find proper rates table (array) in the object, based on mainCurrency, and return only this one
      for (const property in finalRatesList) {
        if (property === this.props.choosenTripMainCurrency) {
          finalRatesList = finalRatesList[property];
        } else {
          continue;
        }
      }

      // use data to create expensesArray with objects representing trip expenses in different currencies
      const expensesArray = [];
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

      // use expensesArray to create expensesSum with array of objects representing each expense
      // already recalculated to main currency using currency rates
      // finally reduce expensesSum to one number: all added expenses i
      let expensesSum = [];
      finalRatesList.forEach(element => {
        for(let i = 0; i < expensesArray.length; i++) {
          if (element.name === expensesArray[i].currency) {
              expensesSum.push(expensesArray[i].cost * element.rate);
            } else continue;
        }
      });
      expensesSum = expensesSum.reduce((x, y) => x + y, 0);

      // calculate data to get values for totalExpensesByCategory in state
      let perCategoryArray = res.data.categories.map((value) => {
        return {name: value, amount: 0, currency: this.props.choosenTripMainCurrency }; 
      });
      expensesArray.forEach(el => {
        for(let i = 0; i < perCategoryArray.length; i++) {   
          if (perCategoryArray[i].name === el.category) {
            const obj = finalRatesList.find(o => o.name === el.currency);
            const singleRate = obj.rate;
            perCategoryArray[i].amount = perCategoryArray[i].amount + (el.cost * singleRate); 
            return perCategoryArray;
          } else continue;
        }
      });

      this.setState({
        tripBudget: res.data.budget,
        tripCategories: res.data.categories,
        sumExpenses: expensesSum,
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
    // if (!this.props.exchangeRates) {
    //   const exchangeRates = await getActualCurrencyRates(this.props.currencyList);
    // //   await this.props.setExchangeRates(exchangeRates);
    // // }
    // console.log('Wydatki');
    if (this.state.sumExpenses !== 0) {
      await this.createChartExpenses();
    }
  }

  render() {
    return (
      <>
        <TripHeader name={this.props.choosenTripName}/>
        <ContentWrapper title="Budget Overview">
          <InnerContainer>
            <Paragraph> 
              {
                `Budget: 
                ${this.state.tripBudget} 
                ${this.props.choosenTripMainCurrency}`
              }
            </Paragraph>
            <Paragraph>
              {
                `Spent: 
                ${Math.floor(this.state.sumExpenses, 2)} 
                ${this.props.choosenTripMainCurrency}`
              } 
            </Paragraph>
            <Paragraph>
              {
                `Left: 
                ${Math.floor((this.state.tripBudget - this.state.sumExpenses), 2)} 
                ${this.props.choosenTripMainCurrency}`
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
          <NavLinksContainer>
            <LinkText to={`/trips/single/${this.props.choosenTripId}`}>
              <FontAwesomeIcon icon="arrow-left"/>&nbsp;&nbsp; Back to Trip Details
            </LinkText>
          </NavLinksContainer>
        </ContentWrapper>
      </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    choosenTripId: state.choosenTrip.id,
    exchangeRates: state.exchangeRates.data,
    currencyList: state.currencyList,
    choosenTripName: state.choosenTrip.name,
    choosenTripMainCurrency: state.choosenTrip.mainCurrency
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setExchangeRates: (exchangeRates) => dispatch(setExchangeRates(exchangeRates)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(TripSummary);