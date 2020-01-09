// import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const getSingleCurencyRates = async (currencyShortcut, currenciesArray) => {
  try {
    const currencyApiAddress = 'https://api.exchangerate-api.com/v4/latest/';
    const response = await axios.get(`${currencyApiAddress}${currencyShortcut}`);
    const { base : currencyName, rates } = response.data;
    const requiredCourses = currenciesArray;
    const requiredRates = Object.keys(rates)
      .filter((key) => requiredCourses.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: rates[key]
        }
      }, {});
  return { currencyName : currencyName, rates : requiredRates};
  } catch (error) {
    console.dir(error);
    return { currencyName: currencyShortcut, rates: "unavailable"}
  }
 }

const getActualCurrencyRates = async (arrayCurrencies) => {
  const currenciesArray = arrayCurrencies;
  const currenciesTables = [];
  currenciesArray.forEach((currency) => {
    const ratesTable = getSingleCurencyRates(currency, currenciesArray);
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
  const currentDate = moment().format("YYYY-MM-DD");
  const objectToReturn = {
    date: currentDate,
    data: formattedCurrenciesData
  }
  return objectToReturn;
};

export default getActualCurrencyRates;