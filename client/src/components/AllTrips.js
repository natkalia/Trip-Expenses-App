import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';
import { theme } from '../utils/theme';
import ContentWrapper from './ContentWrapper';
import {
  H4,
  LinkButtonBig,
  LinkButtonSmall,
  ParagraphAlignedCenter,
  InputCheckbox,
  InputCheckboxContainer,
  Label
} from './styled';
import PinImage from '../images/pin.png';

const Card = styled.div`
  margin-bottom: 20px;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 34px;
  background-color: ${props => props.status === "open" ? theme.colors.trip 
    : theme.colors.neutralMidLight};  
  color: ${theme.colors.white};
  border-radius: 5px 5px 0 0 ;
`

const CardTitle = styled(H4)`
  margin: 0 0 0 20px;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  border: 1px solid ${props => props.status === "open" ? theme.colors.trip 
    : theme.colors.neutralMidLight};  
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
const ContainerButtons = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: space-between;
  margin: 10px auto;
`

const CustomSmallButton = styled(LinkButtonSmall)`
  margin: 0px 10px 15px;
  width: 40%;
  min-width: 150px;
  flex-grow: 1;
`;

const InputCheckboxCustom = styled(InputCheckbox)`
  flex: 1;
  margin-right: 10px;
`

const InputCheckboxContainerCustom = styled(InputCheckboxContainer)`
  margin-bottom: 0px;
`

const PinImg = styled.img`
  height: 20px;
  margin: 0 0 0 20px;
`

// TRIP CARD COMPONENT
const TripCard = (props) => {
  let status = props.trip.isTripFinished ? 'finished' : 'open'; 
    
  return (
    <Card>
      <CardHeader status={status} >
        {props.inPinnedTrips && 
          < PinImg src={PinImage} alt = "Pin" />}          
        <CardTitle>{props.trip.name}</CardTitle>
      </CardHeader>

      <CardBody status={status}>
        <Container>
          <ParagraphAlignedLeft>
            start date: &nbsp; {moment(props.trip.startDate).format('YYYY-MM-DD')}
          </ParagraphAlignedLeft>
          {props.trip.description &&
            <ParagraphAlignedLeft>
              {props.trip.description}
            </ParagraphAlignedLeft>
          }
          <InputCheckboxContainerCustom>
            <InputCheckboxCustom type="checkbox" name="isPinned" id={`isPinned-${props.trip._id}`} onChange={props.onInputChange} checked={props.inPinnedTrips}/>
            <Label htmlFor={`isPinned-${props.trip._id}`}>Pin trip to the main page</Label>         
          </InputCheckboxContainerCustom>

          <ContainerButtons>
            <CustomSmallButton to={`/trips/single/${props.trip._id}`} color="grey"> Expenses </CustomSmallButton>
            <CustomSmallButton to={`/trips/edit/${props.trip._id}`} color="greyOutline"> Edit / Delete </CustomSmallButton>
          </ContainerButtons>            
        </Container>        
      </CardBody>
    </Card>  
  )
}

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
    axios.get(`http://localhost:3000/api/users/5e0cfed451f05203b0575062/trips`)
      .then(res => this.setState({trips: res.data.trips}))
      .catch(err => console.log(err));
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
}

export default AllTrips;