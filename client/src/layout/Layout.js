import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300i,400,600|Rubik:400,500,700&display=swap');
  
  html {
    font-family: ${theme.fonts.default};
    color: ${theme.colors.neutralDark};
    line-height: 1.45;
  }
  
  body {
    padding: 0;
    margin: 0;    
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const StyledWrapper = styled.div`
  min-height:100vh;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: 
    linear-gradient(${theme.colors.bgOverlay}, ${theme.colors.bgOverlay}),
    url("/images/bg-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Layout = ({children}) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StyledWrapper>
        {children}
      </StyledWrapper>
    </>
  </ThemeProvider>
);

export default Layout;