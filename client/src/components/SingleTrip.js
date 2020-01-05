import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  ContentWrapper,
  HeaderWrapper,
  InnerContainer,
  ParagraphAlignedCenter,
  LinkButtonBig,
} from './styled';


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
    axios.get(`http://localhost:3000/api/trips/${this.props.match.params.id}`)
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

        <LinkButtonBig to={`/trips/${this.props.match.params.id}/expenses/add`} color="green">Add Expense</LinkButtonBig>
        <LinkButtonBig to={`/trips/summary/${this.props.match.params.id}`} color="greenOutline">Summary</LinkButtonBig>
      </ContentWrapper>
    )
  }
}

export default SingleTrip;