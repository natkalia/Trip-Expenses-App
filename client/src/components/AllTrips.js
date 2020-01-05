import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import ContentWrapper from './ContentWrapper';
import { LinkButtonBig, LinkButtonSmall } from './styled';

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 34px;
  background-color: ${theme.colors.trip};  
  border-radius: 5px 5px 0 0 ;
`

const LinkTrip = styled(Link)`
  width: 100%;
  color: ${theme.colors.white};
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    font-weight: 600;
  }
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.trip};  
  border-radius: 0 0 5px 5px;
`

const ParagraphAlignedLeft = styled.p`
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 10px;
`

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`

const TripCard = (props) => {
  return (
    <>
      <CardHeader>
        <Container>
          <LinkTrip>{props.trip.name}</LinkTrip>
        </Container>        
      </CardHeader>
      <CardBody>
        <Container>
          <ParagraphAlignedLeft>
            start date: {props.trip.startDate}
          </ParagraphAlignedLeft>
          <ParagraphAlignedLeft>
            {props.trip.description}
          </ParagraphAlignedLeft>
          <LinkButtonSmall color="">Mały przycisk</LinkButtonSmall>
        </Container>        
      </CardBody>
    </>  
  )
}



class AllTrips extends Component {

  async componentDidMount() {
    // const trips = await axios.get(`http://localhost:3000/api/users/5e0cfed451f05203b0575062`)
    //   .then(res => res.data.trips);  
  }

  render() {
    const trip1 = {name: "Trip1", startDate: "2010-10-01", description:"Hardcoded description"}
    return (
      <ContentWrapper title="Your Trips">
        <LinkButtonBig to={`/trips/add`} color="green">Add a new trip</LinkButtonBig>
        <TripCard trip={trip1} />
      </ContentWrapper>
    )
  }
}

export default AllTrips;