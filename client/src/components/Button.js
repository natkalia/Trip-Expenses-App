import React from 'react'; 
import styled from 'styled-components';
import { theme } from '../utils/theme';

const DefaultButton = styled.button`
  background-color: ${theme.colors.white};
  border-radius: 5px;
  min-height: 40px;
  margin: 0 auto 20px;
  width: 100%;
  font-size: 20px;
  text-align: center;
  border: none;
  color: ${theme.colors.neutralMidDark};
  user-select: none;
  outline: none;

  &:hover {
    cursor: pointer;  
  } 
  &:focus {
    outline: none;  
  } 
`;

const Button = (props) => {

  const btnStyle = {
    color: props.textColor,
    backgroundColor: props.btnColor,
    border: props.btnBorder
  };

  return (
    <DefaultButton type="submit" style = {btnStyle}>{props.textOnButton}</DefaultButton>
  )

}

export default Button;