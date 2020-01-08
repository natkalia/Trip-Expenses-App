import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  TripHeader,
  ContentWrapper,
  HeaderWrapper,
  InnerContainer,
  ParagraphAlignedCenter,
  LinkButtonBig,
} from './styled';
import getToken from '../utils/getToken';



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
    axios.get(`api/trips/${this.props.match.params.id}`, { headers: { "x-auth-token": `${getToken()}`} })
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
        
        <ContentWrapper>          
          <HeaderWrapper>
            <InnerContainer>
              <ParagraphAlignedCenter>
                <b>Start Date:</b> &nbsp;
                {this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD'): ""}
              </ParagraphAlignedCenter>
              <ParagraphAlignedCenter> 
                {this.state.description}
              </ParagraphAlignedCenter>
            </InnerContainer>          
          </HeaderWrapper>

          <InnerContainer>  
            <LinkButtonBig to={`/trips/${this.props.match.params.id}/expenses/add`} color="green">Add Expense</LinkButtonBig>
            <LinkButtonBig to={`/trips/summary/${this.props.match.params.id}`} color="green">Summary</LinkButtonBig>
            <LinkButtonBig to={`/`} color="disabled">All Expenses</LinkButtonBig>
            <LinkButtonBig to={`/`} color="disabled">Manage Categories</LinkButtonBig>
            <LinkButtonBig to={`/`} color="disabled">Manage Currency</LinkButtonBig>
          </InnerContainer>          
        </ContentWrapper>
      </>      
    )
  }
}

export default SingleTrip;