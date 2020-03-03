import React, { Component } from 'react'; 
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Form,
  Label,
  Input,
  InputCheckbox,
  InputContainer,
  DateInput,
  ParagraphSmallItalic,
  Textarea,
  InputCheckboxContainer,
  customStyleSelect,
  TripHeader,
  LinkText,
  NavLinksContainer,
} from './styled';
import Select from 'react-select';
import Button from './Button';
import ContentWrapper from './ContentWrapper';
import getToken from '../utils/getToken';
import formatCurrencies from '../utils/formatCurrencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateChoosenTrip, clearChoosenTrip } from '../redux/actions/userActions';



class EditTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      startDate: "", 
      description: undefined, 
      isTripFinished: false,
      budget: "",
      budgetCurrency:
        {
          value: "PLN",
          label: "PLN"
        },
      tripCurrencies: formatCurrencies(this.props.currencyList)
    };
  }

  onInputChange = (e) => {
    const target = e.target;
    // eslint-disable-next-line
    const value = target.type === 'checkbox' ? target.checked : target.value; 
    const name = target.name;

    // potentially place for additional validation: compare startDate and isFinished (current date);

    this.setState({
      [name]: value
    });
  }

  onDescriptionChange = (e) => {
    if (e.target.value !== "") {
      this.setState({ 
      description: e.target.value
      });
    } else {
      this.setState({ 
        description: undefined
      });
    }
  }

  onDateChange = (date) => {
    this.setState({ 
      startDate: date
    })
  }

  onSelectCurrencyChange = (optionsObject) => {
    const selectValue = optionsObject.value;
    this.setState({
      budgetCurrency:
        {
          value: selectValue,
          label: selectValue
        }
    })
  }
   
  onEditSubmit = (e) => { 
    e.preventDefault(); 
    const trip = {
      name: this.state.name,
      startDate: moment(this.state.startDate).format(),
      description: this.state.description,
      isTripFinished: this.state.isTripFinished,
      budget: this.state.budget,
      mainCurrency: this.state.budgetCurrency.value
    }
    axios.put("/api/trips/edit/" + this.props.choosenTripId, trip, { headers: { "x-auth-token": `${getToken()}`} })
      .then(res => console.log(res.data))
      .then(() => this.props.updateChoosenTrip(trip.name, trip.mainCurrency))
      .then(() => this.props.history.push(`/trips/single/${this.props.choosenTripId}`));
  };

  onDeleteSubmit = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete this trip?")) {
    axios.delete("/api/trips/" + this.props.choosenTripId,
      { 
        data: {userId : this.props.userId},
        headers: {"x-auth-token": `${getToken()}`} 
      })
    .then(res => console.log(res.data))
    .then(() => this.props.clearChoosenTrip())
    .then(() => this.props.history.push('/trips/all'));
    } else return;
  };

  componentDidMount () {
    axios.get(`/api/trips/${this.props.choosenTripId}`, { headers: { "x-auth-token": `${getToken()}`} })
      .then(res => this.setState({ 
          id: res.data._id,
          name: res.data.name,
          startDate: new Date(res.data.startDate),
          description: res.data.description,
          isTripFinished: res.data.isTripFinished,
          budget: res.data.budget,
          budgetCurrency:
            {
              value: res.data.mainCurrency,
              label: res.data.mainCurrency
            }
      }));
    if (!this.state.tripCurrencies.length) this.getSupportedCurrencyList();
  }

  render() {
    return (
      <>
        <TripHeader name={this.props.choosenTripName}/>
        <ContentWrapper title="Edit Trip Information">
          <Form onSubmit={this.onEditSubmit}>

            <Label htmlFor="name-edit">Name (5-100 characters):</Label>
            <Input minlength="5" maxlength="100" type="text" name="name" id="name-edit" placeholder="Name" required onChange={this.onInputChange} value={this.state.name}/>
                
            <InputContainer>
              <Label htmlFor="startDate-edit">Start date:</Label>
              <DatePicker customInput={<DateInput/>} dateFormat="yyyy/MM/dd" type="text" name="startDate" id="startDate-edit" selected={this.state.startDate} onChange={this.onDateChange} todayButton="Today"/>
            </InputContainer>

            <Label htmlFor="budget-add">Budget: (from 0 to 1 million)</Label>
            <Input 
              min="0"
              max="100000000" 
              type="number" 
              name="budget" 
              id="budget-add" 
              placeholder="Your budget" 
              required 
              onChange={this.onInputChange} 
              value={this.state.budget}
            />

            <Label htmlFor="budgetCurrency-add">Currency:</Label>
            <Select 
              styles={customStyleSelect} 
              options={this.state.tripCurrencies} 
              type="text" 
              name="budgetCurrency" 
              id="budgetCurrency-add" 
              required 
              onChange={this.onSelectCurrencyChange} 
              value={this.state.budgetCurrency}
            />          
            
            <Label htmlFor="description-edit">Description (10-200 characters):</Label>
            <ParagraphSmallItalic>This field is optional</ParagraphSmallItalic>
            <Textarea maxlength="200" name="description" id="description-edit" placeholder="Description" onChange={this.onDescriptionChange} value={this.state.description}/>

            <InputCheckboxContainer>
              <InputCheckbox type="checkbox" name="isTripFinished" id="isTripFinished-edit" onChange={this.onInputChange} checked={this.state.isTripFinished} />
              <Label htmlFor="isTripFinished-edit">Is this trip finished?</Label>
            </InputCheckboxContainer>
            
            <Button textOnButton="Edit" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/>     
          </Form> 

          <Form onSubmit={this.onDeleteSubmit}>
            <Button textOnButton="Delete" textColor="#fff" btnColor="#DC3545" btnBorder="none"/> 
          </Form>

          <NavLinksContainer>
            <LinkText to = { `/trips/${this.props.choosenTripId}/expenses/all`} >
              <FontAwesomeIcon icon="arrow-left"/>&nbsp;&nbsp; Back to All Expenses
            </LinkText>
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
    choosenTripId: state.choosenTrip.id,
    choosenTripName: state.choosenTrip.name,
    currencyList: state.currencyList,
    userId: state.userId,
    mainCurrency: state.mainCurrency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateChoosenTrip: (name, mainCurrency) => dispatch(updateChoosenTrip(name, mainCurrency)),
    clearChoosenTrip: () => dispatch(clearChoosenTrip())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrip);