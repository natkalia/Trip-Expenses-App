import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { theme } from '../utils/theme';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import LogoImg from '../images/logo.png';
import { setLoggedOut } from '../redux/actions/userActions';


const HeaderWrapper = styled.div`
  background-color: ${theme.colors.whiteOverlay};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px ${theme.colors.bgOverlay};
  ${theme.media.tablet} {
    flex-direction: row;
  }
`;

const TopLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  box-shadow: 0px 0px 4px ${theme.colors.bgOverlay};
  ${theme.media.tablet} {
    box-shadow: none;
  }
`;

const AppName = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 35px;
  margin-right: 20px;
`;

const H1 = styled.h1`
  font-size: 24px;
  font-family: ${theme.fonts.special};
  font-weight: normal;
  color: ${theme.colors.neutralDark};
  margin: 0;
`;

const Button = styled.button`
  color: ${theme.colors.neutralMidLight};
  font-size: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    color:${theme.colors.btnMain};
  }
`;

const ToggleNavOpen = styled(Button)`
  color: ${theme.colors.neutralDark};
  ${theme.media.tablet} {
    display: none;
  }
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
  ${theme.media.tablet} {
    justify-content: flex-end;
  }
`;

const Li = styled.li`
  list-style: none;
  padding: 0 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.neutralDark};
  font-size: 16px;
  color: ${props => props.active === "true" ? `${theme.colors.neutralDark}` : `${theme.colors.neutralMidLight}`};
  &:hover {
    color: ${theme.colors.btnMain};
  }
`;



class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuOpened: true,
      isLoggedIn: true,
      activeTab: ""
    }
  }
  
  toggleMenu = () => {
    this.setState((prevState, props) => ({
      menuOpened: !prevState.menuOpened
    }))
  }

  logOut = () => {
    this.props.setLoggedIn();
  }

  setChoosen = (e) => {
    this.setState({
      activeTab: e.target.id
    });
  }

  render() {
    return (
      <HeaderWrapper>
        <TopLabel>
          <AppName href="/" title="HomePage">
            <Logo src={LogoImg} alt="Trip Expenses App"></Logo>
            <H1>Trip Expenses</H1>
          </AppName>
          <ToggleNavOpen onClick={this.toggleMenu}>
            <FontAwesomeIcon size="lg" icon={this.state.menuOpened ? faTimes : faBars} />
          </ToggleNavOpen>
        </TopLabel>

        <Nav>
          <NavForNotLoggedIn
            showMenu={this.state.menuOpened && !this.state.isLoggedIn}
          >
            <Li>
              <StyledLink
                to={'/users/login'}
                onClick={(e) => this.setChoosen(e)}
                active={`${this.state.activeTab === 'login'}`}
                id="login"
              >
                Login
              </StyledLink>
            </Li>
            <Li>
              <StyledLink
                to={'/users/register'}
                onClick={(e) => this.setChoosen(e)}
                active={`${this.state.activeTab === 'register'}`}
                id="register"
              >
                Sign Up
              </StyledLink>
            </Li>
          </NavForNotLoggedIn>

          <NavForLoggedIn
            showMenu={this.state.menuOpened && this.state.isLoggedIn}
          >
            <Li>
              <StyledLink
                to={'/trips/all'}
                onClick={(e) => this.setChoosen(e)}
                active={`${this.state.activeTab === 'trips/all'}`}
                id="trips/all"
              >
                Trips
              </StyledLink>
            </Li>
            <Li>
              <StyledLink
                to={'/users/profile'}
                onClick={e => this.setChoosen(e)}
                active={`${this.state.activeTab === 'profile'}`}
                id="profile"
              >
                Settings
              </StyledLink>
            </Li>
            <Li><Button onClick={this.logOut}>Log out</Button></Li>
          </NavForLoggedIn>
        </Nav>
      </HeaderWrapper>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedOut: () => dispatch(setLoggedOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
