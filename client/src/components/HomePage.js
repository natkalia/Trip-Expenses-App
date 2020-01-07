import React, { Component } from 'react';
import styled from 'styled-components';
import { H2, ContentWrapper } from './styled.js';
import HomePageImage from '../images/map-with-pins.png';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`
const InnerHeaderContainer = styled.div`
  flex-basis: 1;
`


class HomePage extends Component {
  render() {
    return(
      <ContentWrapper>
        <HeaderContainer>
          <img src={HomePageImage} alt="Map image"/>
          <InnerHeaderContainer>
            <H2>We help you to manage your travel costs!</H2>
          </InnerHeaderContainer>          
        </HeaderContainer>

      </ContentWrapper>
    )
  }
}
export default HomePage;