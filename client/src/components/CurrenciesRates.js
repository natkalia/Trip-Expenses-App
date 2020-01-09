import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import {
  ParagraphAlignedCenter,
  TripHeader,
  Ul
} from './styled';
import ContentWrapper from './ContentWrapper';
import formatCurrencies from '../utils/formatCurrencies';



const LeadingText = styled(ParagraphAlignedCenter)`
  font-size: 1.2em;
  margin-bottom: 1.2em;
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
      tripCurrencies: formatCurrencies(this.props.currencyList),
      currenciesRates: undefined
    };
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
      const actualCurrency = this.props.choosenTripMainCurrency;
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

  async componentDidMount () {

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
        <TripHeader name={this.props.choosenTripName}/>

        <ContentWrapper title="Actual Currencies Rates">
            <LeadingText>
              Your budget currency is: {this.props.choosenTripMainCurrency}
            </LeadingText>
            { this.renderRatesList() }
        </ContentWrapper>
      </>
    )
  }
} 
  
const mapStateToProps = (state) => {
  return {
    choosenTripName: state.choosenTrip.name,
    choosenTripId: state.choosenTrip.id,
    choosenTripMainCurrency: state.choosenTrip.mainCurrency,
    currencyList: state.currencyList
  }
}

export default connect(mapStateToProps)(CurrenciesRates);