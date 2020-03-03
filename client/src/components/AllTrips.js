import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import ContentWrapper from './ContentWrapper';
import {
  LinkButtonBig,
  ParagraphAlignedCenter,
} from './styled';
import getToken from '../utils/getToken';
import TripCard from './TripCard';
import getActualCurrencyRates from '../utils/getActualCurrencyRates';
import { setExchangeRates } from '../redux/actions/userActions';


class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinnedTrips: [],
      trips: []
    };
  }

  onInputChange = (e) => {
    const pin = e.target.checked ? true : false;
    const tripId = e.target.id.slice(9, );
    const pinnedTrips = [...this.state.pinnedTrips]
    if (this.state.pinnedTrips.includes(tripId) && !pin){
      // Remove trip from the list of pinned trips
      const index = pinnedTrips.indexOf(tripId);
      if (index > -1) pinnedTrips.splice(index, 1);
      this.setState({pinnedTrips: pinnedTrips})
    } else if (!this.state.pinnedTrips.includes(tripId) && pin) {
      // Add trip to the list of pinned trips
      pinnedTrips.push(tripId);
      this.setState({pinnedTrips: pinnedTrips})
    }
  }

  componentDidMount() {
    const todayDate = moment().format("YYYY-MM-DD");
    axios.get(`/api/users/${this.props.userId}/trips`, { headers: { "x-auth-token": `${getToken()}`} })
      .then(res => {
        const trips = res.data.trips;
        trips.sort((older, newer) => new Date(newer.startDate) - new Date(older.startDate));        
        this.setState({trips: trips})
      })
      .catch(err => console.log(err));
      if (!this.props.exchangeRates ||
        this.props.exchangeRates.date !== todayDate) {
          getActualCurrencyRates(this.props.currencyList)
            .then((res) => {
              this.props.setExchangeRates(res);
            })
      }
    }  


  render() {
    return (
      <ContentWrapper title="Your Trips">
        <LinkButtonBig to={`/trips/add`} color="green">Add a new trip</LinkButtonBig>
        <div>
          { this.state.trips.length > 0 ? (
            this.state.trips.map((trip) => { 
              const inPinnedTrips = this.state.pinnedTrips.includes(trip._id)
              return <TripCard trip={trip} inPinnedTrips={inPinnedTrips} onInputChange={this.onInputChange} key={trip._id}/>
              })            
          ) : (
            <ParagraphAlignedCenter>You don 't have any saved trips yet</ParagraphAlignedCenter>
          )} 
        </div>
               
      </ContentWrapper>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    exchangeRates: state.exchangeRates,
    currencyList: state.currencyList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setExchangeRates: (exchangeRates) => dispatch(setExchangeRates(exchangeRates)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTrips);
