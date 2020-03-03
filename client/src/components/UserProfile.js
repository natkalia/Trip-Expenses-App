import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import ContentWrapper from './ContentWrapper';
import { H3, InnerContainer, LinkButtonSmall } from './styled';
import getToken from '../utils/getToken';

const SectionTitle = styled(H3)`
  &::after{
    content: "";
    display: block;
    height:2px;
    width:70%;
    margin: 15px 0 30px;
    background-color: ${theme.colors.neutralMidLight};
  }
`;

const Button = styled(LinkButtonSmall)`
  width: 200px;
  margin: 0 auto 20px 0;
` 

const ParagraphAlignedLeft = styled.p `
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin: 0 0 8px 0;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const DataGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  ${theme.media.landscapePhone} {
    flex-direction: row;
  }
`;

const LabelData = styled(ParagraphAlignedLeft)`
  width: 90px;
  margin-right: 20px;
`
const DisabledText = styled(ParagraphAlignedLeft)`
  color: ${theme.colors.neutralMidDark};
`

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    }
  }

  handleNotChosenTrip() {
    alert('You have to choose trip first');
    return '';
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.userId}`, { headers: { "x-auth-token": `${getToken()}`} })
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ContentWrapper title="Settings">
        <InnerContainer>
          <Section>          
            <SectionTitle>Your Profile Information</SectionTitle>
            <DataGroup>
              <LabelData>User Name:</LabelData>
                <DisabledText>{this.state.name}</DisabledText>
            </DataGroup>
            <DataGroup>
              <LabelData>Email:</LabelData>
                <DisabledText>{this.state.email}</DisabledText>
            </DataGroup>      
          </Section>
          <Section>
            <SectionTitle>Category settings:</SectionTitle>
            <Button to={`#`} color="disabled">Manage Categories</Button>
          </Section>
          <Section>
            <SectionTitle>Currency settings:</SectionTitle>
            <Button to={`#`} color="disabled">Manage Currency</Button>
          </Section>
        </InnerContainer>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  }
}

export default connect(mapStateToProps)(UserProfile);