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

class AllExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Maybe this data (mainBudgetCurrency and name)
      // should be get from Redux after 
      // choice of trip
      name: "",
      expenses: []
    };
  }

  getActualTripInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/trips/${this.props.match.params.tripId}`, { headers: { "x-auth-token": `${getToken()}`} });
      const { expenses, name } = result.data;
      this.setState({
        name: name,
        expenses: expenses,
      });
    } catch(error) {
      console.log(error);
    }
  }

  async componentDidMount () {
    // here we will get expenses data
    await this.getActualTripInfo();
    console.log(JSON.stringify(this.state.expenses, null, 2));
  }

  render() {
    return (
      <>
        <TripHeader name={this.state.name}/>

        <ContentWrapper title="Expenses List">
          Here Expenses List for this trip
        </ContentWrapper>
      </>
    )
  }
} 
  
export default AllExpenses;