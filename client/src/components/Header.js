import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../utils/theme';



const HeaderWrapper = styled.div`
  background-color: ${theme.colors.whiteOverlay};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px ${theme.colors.bgOverlay};
`;

const TopLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  box-shadow: 0px 0px 4px ${theme.colors.bgOverlay};
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
  margin: 0;

`;

const Nav = styled.nav`
  width: 100%;
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 15px 25px;
`;

const NavForNotLoggedIn = styled(Ul)`
  display: ${props => props.showMenu ? 'flex' : 'none'};
  justify-content: flex-end;

`;

const NavForLoggedIn = styled(Ul)`
  justify-content: space-between;
  display: ${props => props.showMenu ? 'flex' : 'none'};
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

const LogOutButton = styled.button`
  color: ${theme.colors.neutralDark};
  font-size: 16px;
  background-color: transparent;
  border: none;
`;


class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuOpened: true,
      isLoggedIn: true
    }
  }
  
  toggleMenu = () => {
    this.setState((prevState, props) => ({
      menuOpened: !prevState.menuOpened
    }))
  }

  logOut = () => {
    console.log("Wyloguj");
  }

  render() {
    return (
      <HeaderWrapper>
        <TopLabel>
          <AppName>
            <Logo></Logo>
            <H1>Trip Expenses</H1>
          </AppName>
          <div onClick={this.toggleMenu}>otworz</div>
        </TopLabel>
        <Nav>
          <NavForNotLoggedIn
            showMenu={this.state.menuOpened && !this.state.isLoggedIn}
          >
            <Li><StyledLink to={'/users/login'}>Login</StyledLink></Li>
            <Li><StyledLink to={'/users/register'}>Sign Up</StyledLink></Li>
          </NavForNotLoggedIn>
          <NavForLoggedIn
            showMenu={this.state.menuOpened && this.state.isLoggedIn}
          >
            <Li><StyledLink to={'/trips/all'}>Trips</StyledLink></Li>
            <Li><StyledLink to={'/users/profile'}>Settings</StyledLink></Li>
            <Li><LogOutButton onClick={this.logOut}>Log out</LogOutButton></Li>
          </NavForLoggedIn>
        </Nav>
      </HeaderWrapper>
    )
  }
};

export default Header;