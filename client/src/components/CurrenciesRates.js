import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import {
  ParagraphAlignedCenter,
  TripHeader,
  Ul,
  LinkText,
  NavLinksContainer
} from './styled';
import ContentWrapper from './ContentWrapper';
import formatCurrencies from '../utils/formatCurrencies';
import getActualCurrencyRates from '../utils/getActualCurrencyRates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setExchangeRates } from '../redux/actions/userActions';

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
    };
  }

  getChosenCurrencyRates(actualCurrency) {
    // from state
    const ratesData = this.props.exchangeRates.data[actualCurrency];
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
    if (this.props.exchangeRates) {
      const actualCurrency = this.props.choosenTripMainCurrency;
      const dataToRender = this.getChosenCurrencyRates(actualCurrency);
      const { date : dateRates } = this.props.exchangeRates;
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

    if (!this.props.exchangeRates ||
      this.props.exchangeRates.date !== todayDate) {
        console.log('Im here?');
        const actualCurrencyRates = await  getActualCurrencyRates(this.props.currencyList);
        console.log(actualCurrencyRates);
        this.props.setExchangeRates(actualCurrencyRates);
    }
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
    choosenTripName: state.choosenTrip.name,
    choosenTripId: state.choosenTrip.id,
    choosenTripMainCurrency: state.choosenTrip.mainCurrency,
    currencyList: state.currencyList,
    exchangeRates: state.exchangeRates 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setExchangeRates: (exchangeRates) => dispatch(setExchangeRates(exchangeRates)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesRates);