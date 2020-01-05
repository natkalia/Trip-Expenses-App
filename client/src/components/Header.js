import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeConsumer } from 'styled-components';
import { theme } from '../utils/theme';


const Logo = styled.img`

`;

const H1 = styled.h1`

`;

const UL = styled.ul`

`;

const LI = styled.li`

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
      <div>
        <H1>Trip Expenses</H1>
        <nav>
          <div onClick={this.toggleMenu}>otworz</div>
          <UL>
            <LI><Link to={'/users/login'}>Login</Link></LI>
            <LI><Link to={'/users/register'}>Sign Up</Link></LI>
          </UL>
          <UL>
            <LI><Link to={'/users/profile'}>User Profile</Link></LI>
            <LI><Link to={'/users/logout?'}>Log out</Link></LI>
          </UL>
        </nav>
      </div>
    )
  }
};

export default Header;