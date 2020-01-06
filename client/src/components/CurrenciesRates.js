import React, { Component } from 'react'; 
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
// import {} from './styled';
import Select from 'react-select';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

class CurrenciesRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainBudgetCurrency: "",
      tripCurrencies: [],
      currenciesRates: undefined
    };
  }

  // getActualTripMainCurrency = async () => {
  //   try {
  //     const result = axios.get(`http://localhost:3000/api/users/${this.props.match.params.id}`, { headers: { "x-auth-token": `${getToken()}`} })

  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  getSupportedCurrencyList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/currencies/list');
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
    const requiredCourses = currenciesArray.filter(c => c !== currencyShortcut);
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
    console.log(this.state.tripCurrencies);
    const currenciesArray = this.state.tripCurrencies.map((o) => o.value);
    console.log(currenciesArray);
    const currenciesTables = [];
    currenciesArray.forEach((currency) => {
      const ratesTable = this.getSingleCurencyRates(currency, currenciesArray);
      currenciesTables.push(ratesTable);
    })
    const currenciesData = await Promise.all(currenciesTables);
    return { 
      date: moment().format("YYYY-MM-DD"),
      data: currenciesData
    }
  }

  async componentDidMount () {
    if (!this.state.tripCurrencies.length) await this.getSupportedCurrencyList();

    const todayDate = moment().format("YYYY-MM-DD");

    if (!this.state.currenciesRates ||
      this.state.currenciesRates.date !== todayDate) this.getActualCurrencyRates()
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        this.setState({currenciesRates: res});
      })
  }

  render() {
    return (
      <ContentWrapper title="Actual Currencies Rates">
        Currencies Component
      </ContentWrapper>
    )
  }
} 
  
export default CurrenciesRates;