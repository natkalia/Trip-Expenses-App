import React, { Component } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import { ContentWrapper } from './styled.js';
import HomePageImage from '../images/map-with-pins.png';
import PinImage from '../images/pin.png';

const ContentWrapperCustom = styled(ContentWrapper)`    
  width: 100%;
  max-width: 900px;
  min-width: 300px;
  border-radius: 0;
  ${theme.media.tablet} {
    width: 90%;    
    border-radius: 10px;
  }
`;

const HeaderWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 30px auto 40px;
  ${theme.media.landscapePhone} {
    flex-direction: row;
    margin: 30px auto 20px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  ${theme.media.landscapePhone} {
    width: 30%;
  }
`;

const ImgHomePage = styled.img`
  max-width: 150px;
`;

const HeaderTextWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  ${theme.media.landscapePhone} {
    width: 70%;
  }
`;

const HeaderText = styled.h2`
  font-size: 26px;
  text-shadow: 0 0 2px 2px ${theme.colors.white};  
  ${theme.media.tablet} {
    font-size: 32px;
  }
`;

const List = styled.ul`
  list-style-image: url(${PinImage});
`;

const ListItem = styled.li`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.neutralMidDark};
  text-shadow: 0 0 2px ${theme.colors.white};
  margin-bottom: 18px;
  ${theme.media.tablet} {
    font-size: 22px;
  }
`;

const BodyWrapper = styled.div`
  width: 70%;
  margin: 0 auto 20px;
`;

class HomePage extends Component {
  render() {
    return(
      <ContentWrapperCustom>
          <HeaderWrapper>
            <ImageWrapper>
              <ImgHomePage src={HomePageImage} alt="Map image"/>
            </ImageWrapper>          
            <HeaderTextWrapper>
              <HeaderText>We help you to manage your travel costs!</HeaderText>
            </HeaderTextWrapper>          
          </HeaderWrapper>
          <BodyWrapper>
            <List>
              <ListItem>Record all your travel expenses</ListItem>
              <ListItem>Expenses in various currencies are  automatically converted to one chosen currency</ListItem>
              <ListItem>Control your expenses in different categories</ListItem>
              <ListItem>Check if you remain within your budget</ListItem>
            </List>
          </BodyWrapper>
        
      </ContentWrapperCustom>
    )
  }
}
export default HomePage;