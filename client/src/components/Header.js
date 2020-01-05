import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../utils/theme';



const HeaderWrapper = styled.div`
  background-color: ${theme.colors.whiteOverlay};
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px ${theme.colors.bgOverlay};
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  background-color: red;
  height: 25px;
  width: 25px;
  margin-right: 20px;
`;

const H1 = styled.h1`
  font-size: 24px;
  font-family: ${theme.fonts.special};
  font-weight: normal;
  color: ${theme.colors.neutralDark};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavForNotLoggedIn = styled(Ul)`

`;

const NavForLoggedIn = styled(Ul)`
  /* display: none; */
`;

const Li = styled.li`
  list-style: none;
  padding: 0 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.neutralDark};
  font-size: 16px;
`;

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuOpened: false
    }
  }
  
  toggleMenu = () => {
    console.log('ok');
  }

  render() {
    return (
      <HeaderWrapper>
        <AppName>
          <Logo></Logo>
          <H1>Trip Expenses</H1>
        </AppName>
        <nav>
          <div onClick={this.toggleMenu}>otworz</div>
          <NavForNotLoggedIn>
            <Li><StyledLink to={'/users/login'}>Login</StyledLink></Li>
            <Li><StyledLink to={'/users/register'}>Sign Up</StyledLink></Li>
          </NavForNotLoggedIn>
          <NavForLoggedIn>
            <Li><StyledLink to={'/trips/all'}>Trips</StyledLink></Li>
            <Li><StyledLink to={'/users/profile'}>Settings</StyledLink></Li>
            <Li>Log out</Li>
          </NavForLoggedIn>
        </nav>
      </HeaderWrapper>
    )
  }
};

export default Header;