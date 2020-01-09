import React from 'react'; 
import styled from 'styled-components';
import { theme } from '../utils/theme';

const ErrorDiv = styled.div `
  padding: 8px;
  margin: 0 0 20px 0;
  font-size: 14px;
  color: ${theme.colors.errorMsgText};
  background-color: ${theme.colors.errorMsgBg};
  border: 1px solid ${theme.colors.errorMsgBorder};
  border-radius: ${theme.radius.sm};
`

const ErrorMessage = (props) => {
  return (
    <>
      { props.error &&
        <ErrorDiv>{props.error}</ErrorDiv>
      }
    </>
  );
};


export default ErrorMessage;