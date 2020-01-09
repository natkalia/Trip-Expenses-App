import React from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import { H2 } from './styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width:100%;
  background-color: rgba(255,255,255,0.85);
  margin: 40px auto 40px;
  padding-bottom:20px;
  box-shadow: 0 0 5px ${theme.colors.neutralMidDark};
  ${theme.media.landscapePhone} {  
    border-radius: ${theme.radius.bg};
    width: 90%;
  }
`;

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  height: 70px;
  margin-bottom: 30px;
  background-color: rgba(255,255,255,0.85);
  box-shadow: 0 4px 4px ${theme.colors.neutralExtraLight};
  ${theme.media.landscapePhone} {  
    border-radius: ${theme.radius.bg} ${theme.radius.bg} 0 0;
  }
`;

const ContentWrapper = (props) => {
  return (
  <Wrapper>
    <TitleWrapper>
      <H2>{props.title}</H2>
    </TitleWrapper>
    <Container>
      {props.children}
    </Container>    
  </Wrapper>
  )
};

export default ContentWrapper;