const formatCurrencies = (list) => {
  const tripCurrencies = list.map((currency) => {
    return {
      value: currency,
      label: currency
    }
  });
  return tripCurrencies;
};

export default formatCurrencies;