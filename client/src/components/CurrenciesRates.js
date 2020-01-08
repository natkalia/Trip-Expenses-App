import React, { Component } from 'react'; 
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import {
  ParagraphAlignedCenter,
  TripHeader
} from './styled';
import ContentWrapper from './ContentWrapper';
import getToken from '../utils/getToken';

const LeadingText = styled(ParagraphAlignedCenter)`
  font-size: 1.2em;
  margin-bottom: 1.2em;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const CurrencyContainer = styled.div`
  font-size: 1rem;
  margin: 0 auto;
  max-width: 11rem;
  width: 100%;
`;

const SingleRate = styled.li`
  align-items: center;
  border-bottom: 1px solid ${theme.colors.neutralMidLight};
  display: flex;
  justify-content: space-around;
  line-height: 1;
  padding: .75rem;
  text-align: left;

  &:nth-child(odd) {
    background-color: ${theme.colors.neutralExtraLight};
  }

  &:first-child {
    border-top: 1px solid ${theme.colors.neutralMidLight};
  }
`;

const RateName = styled.span`
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;

const RateNumber = styled.span`
  font-size: 1.2em;
`;

const RatesDate = styled.span`
  font-weight: 700;
  padding: 0 .5em;
`;


class CurrenciesRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Maybe this data (mainBudgetCurrency and name)
      // should be get from Redux after 
      // choice of trip
      mainBudgetCurrency: "",
      name: "",
      tripCurrencies: [],
      currenciesRates: undefined
    };
  }

  getActualTripInfo = async () => {
    try {
      const result = await axios.get(`/api/trips/${this.props.match.params.tripId}`, { headers: { "x-auth-token": `${getToken()}`} });
      const { mainCurrency, name } = result.data;
      this.setState({
        name: name,
        mainBudgetCurrency: mainCurrency,
      });
    } catch(error) {
      console.log(error);
    }
  }

  getSupportedCurrencyList = async () => {
    try {
      const response = await axios.get('/api/currencies/list');
      const { data: { currencies }} = response;
      const tripCurrencies = currencies.map((currency) => {
        return {
          value: currency,
          label: currency
        }
       });
      this.setState({
        tripCurrencies: tripCurrencies
      })
    } catch (error) {
      console.log(error);
    }
  }

  getSingleCurencyRates = async (currencyShortcut, currenciesArray) => {
    try {
      const currencyApiAddress = 'https://api.exchangerate-api.com/v4/latest/';
    const response = await axios.get(`${currencyApiAddress}${currencyShortcut}`)
    const { base : currencyName, rates } = response.data;
    const requiredCourses = currenciesArray
    const requiredRates = Object.keys(rates)
      .filter((key) => requiredCourses.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: rates[key]
        }
      }, {})
    return { currencyName : currencyName, rates : requiredRates};
    } catch (error) {
      console.log(error);
      return { currencyName: currencyShortcut, rates: "unavailable"}
    }
   }

  getActualCurrencyRates = async () => {
    const currenciesArray = this.state.tripCurrencies.map((o) => o.value);
    const currenciesTables = [];
    currenciesArray.forEach((currency) => {
      const ratesTable = this.getSingleCurencyRates(currency, currenciesArray);
      currenciesTables.push(ratesTable);
    })
    const currenciesData = await Promise.all(currenciesTables);
   
    const formattedCurrenciesData = {};
    currenciesArray.forEach((paidCurrence) => {
      const rates = currenciesData.map((c) => {
        return { 
          name: c.currencyName,
          rate: c.rates[paidCurrence]
        }
      });
      formattedCurrenciesData[paidCurrence] = rates;
    });
    return { 
      date: moment().format("YYYY-MM-DD"),
      data: formattedCurrenciesData
    }
  }

  getChosenCurrencyRates(actualCurrency) {
    const ratesData = this.state.currenciesRates.data[actualCurrency];
    const requiredRatesData = ratesData.filter((c) => c.name !== actualCurrency);
    const sortedData = requiredRatesData.sort((a,b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    })
    return sortedData;
  }

  renderRatesItems (dataToRender) {
    return dataToRender.map((currency) => {
      return (
        <SingleRate key={currency.name}>
          <RateName>1 {currency.name}</RateName>
          <RateNumber>{currency.rate.toFixed(2)}</RateNumber>
        </SingleRate>
      )
    })
  }
  
  renderRatesList () {
    if (this.state.currenciesRates) {
      const actualCurrency = this.state.mainBudgetCurrency;
      const dataToRender = this.getChosenCurrencyRates(actualCurrency);
      const { date : dateRates } = this.state.currenciesRates;
      const formattedDate = moment(dateRates).format('LL');
      return (
        <>
          <ParagraphAlignedCenter>
            <span>
              Rates at date:
            </span>
            <RatesDate>
              {formattedDate}
            </RatesDate>
          </ParagraphAlignedCenter>
          <CurrencyContainer>
            <Ul>
              {this.renderRatesItems(dataToRender)}
            </Ul>
          </CurrencyContainer>
        </>
      )
    }
    return (
    <ParagraphAlignedCenter>
      Fetching actual courses in progress
    </ParagraphAlignedCenter>
    )
  }

  renderActualBudgetCurrency () {
    return this.state.mainBudgetCurrency !== "" ? (
      <span> {this.state.mainBudgetCurrency} </span>
    ) : (
      <span>unknown</span>
    )
  }

  async componentDidMount () {
    this.getActualTripInfo();
    
    if (!this.state.tripCurrencies.length) await this.getSupportedCurrencyList();

    const todayDate = moment().format("YYYY-MM-DD");

    if (!this.state.currenciesRates ||
      this.state.currenciesRates.date !== todayDate) this.getActualCurrencyRates()
      .then((res) => {
        this.setState({currenciesRates: res});
      })
  }

  render() {
    return (
      <>
        <TripHeader name={this.state.name}/>

        <ContentWrapper title="Actual Currencies Rates">
            <LeadingText>
              Your budget currency is:
              { this.renderActualBudgetCurrency() }
            </LeadingText>
            { this.renderRatesList() }
        </ContentWrapper>
      </>
    )
  }
} 
  
export default CurrenciesRates;