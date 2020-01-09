import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { theme } from '../utils/theme';
import {
  H4,
  LinkButtonSmall,
  InputCheckboxContainer,
  Label
} from './styled';
import PinImage from '../images/pin.png';
import { setChoosenTrip } from '../redux/actions/userActions';


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
  padding: 15px 0 0 0;
  background-color: ${theme.colors.white};
  border: 1px solid ${props => props.status === "open" ? theme.colors.trip 
    : theme.colors.neutralMidLight};  
  border-radius: 0 0 5px 5px;
`

const ParagraphAlignedLeft = styled.p`
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin: 0 0 8px 0;
`

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`
const ContainerButtons = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: space-between;
  margin: 0 auto;
`

const CustomSmallButton = styled(LinkButtonSmall)`
  margin: 0px 10px 20px;
  width: 40%;
  min-width: 150px;
  flex-grow: 1;
`;

const InputCheckboxCustom = styled.input`
  margin: 0 10px 5px 0;
`

const InputCheckboxContainerCustom = styled(InputCheckboxContainer)`
  margin-bottom: 15px;
`

const PinImg = styled.img`
  height: 20px;
  margin: 0 0 0 20px;
`

const TripCard = (props) => {
  let status = props.trip.isTripFinished ? 'finished' : 'open';
  const { name, startDate, description, _id, mainCurrency } = props.trip; 
  const setChoosenTrip = (tripId, tripName, tripMainCurrency) => {
    props.setChoosenTrip(tripId, tripName, tripMainCurrency);
  }
  return (
    <Card>
      <CardHeader status={status} >
        {props.inPinnedTrips && 
          < PinImg src={PinImage} alt = "Pin" />}          
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardBody status={status}>
        <Container>
          <ParagraphAlignedLeft>
            start date: &nbsp; {moment(startDate).format('YYYY-MM-DD')}
          </ParagraphAlignedLeft>
          {description &&
            <ParagraphAlignedLeft>
              {description}
            </ParagraphAlignedLeft>
          }
          <InputCheckboxContainerCustom>
            <InputCheckboxCustom type="checkbox" name="isPinned" id={`isPinned-${_id}`} onChange={props.onInputChange} checked={props.inPinnedTrips}/>
            <Label htmlFor={`isPinned-${_id}`}>Pin trip to the main page</Label>         
          </InputCheckboxContainerCustom>
          <ContainerButtons>
            <CustomSmallButton onClick={ () => setChoosenTrip(_id, name, mainCurrency)} to={`/trips/single/${_id}`} color="grey"> Details </CustomSmallButton>
            <CustomSmallButton onClick={ () => setChoosenTrip(_id, name, mainCurrency)} to={`/trips/edit/${_id}`} color="greyOutline"> Edit / Delete </CustomSmallButton>
          </ContainerButtons>            
        </Container>        
      </CardBody>
    </Card>  
  )
}


const mapStateToProps = (state) => {
  return {
    choosenTrip: state.choosenTrip
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChoosenTrip: (id, name, mainCurrency) => dispatch(setChoosenTrip(id, name, mainCurrency))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripCard);
