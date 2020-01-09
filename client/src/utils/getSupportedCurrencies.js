import axios from 'axios';

const getSupportedCurrencyList = async () => {
  try {
    const response = await axios.get('/api/currencies/list');
    const { data: { currencies }} = response;
    return currencies;
  } catch(error) {
    console.log(error);
  }
}

export default getSupportedCurrencyList;