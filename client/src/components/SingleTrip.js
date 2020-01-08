import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  TripHeader,
  InfoWrapper,
  InnerContainer,
  ParagraphAlignedCenter,
  LinkButtonBig,
} from './styled';
import ContentWrapper from './ContentWrapper';
import getToken from '../utils/getToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SingleTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      startDate: "",
      description: undefined,
      isTripFinished: false
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/api/trips/${this.props.choosenTripId}`, { headers: { "x-auth-token": `${getToken()}`} })
      .then(res => this.setState({
        id: res.data._id,
        name: res.data.name,
        startDate: new Date(res.data.startDate),
        description: res.data.description,
        isTripFinished: res.data.isTripFinished
      }));
  }
  
  render() {
    return (
      <>
        <TripHeader name={this.state.name}/>
        
        <ContentWrapper title="Trip Details">          
          <InfoWrapper>
            <InnerContainer>
              <ParagraphAlignedCenter>
                <b>Start Date:</b> &nbsp;
                {this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD'): ""}
              </ParagraphAlignedCenter>
              <ParagraphAlignedCenter> 
                {this.state.description}
              </ParagraphAlignedCenter>
            </InnerContainer>          
          </InfoWrapper>

          <InnerContainer>  
            <LinkButtonBig to={`/trips/${this.props.choosenTripId}/expenses/add`} color="green">
              <FontAwesomeIcon icon="dollar-sign"/>&nbsp;&nbsp;Add Expense
            </LinkButtonBig>
            <LinkButtonBig to={`/trips/summary/${this.props.choosenTripId}`} color="green">
              <FontAwesomeIcon icon="wallet"/>&nbsp;&nbsp;Budget Overview
            </LinkButtonBig>
            <LinkButtonBig to={`/trips/${this.props.choosenTripId}/expenses/all`} color="greyOutline">All Expenses</LinkButtonBig>
            <LinkButtonBig to={`#`} color="disabled">Manage Categories</LinkButtonBig>
            <LinkButtonBig to={`/trips/currencies/${this.props.choosenTripId}`} color="greyOutline">Manage Currency</LinkButtonBig>
          </InnerContainer>          
        </ContentWrapper>
      </>      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    choosenTripId: state.choosenTrip.id
  }
}

export default connect(mapStateToProps)(SingleTrip);