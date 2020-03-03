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
  font-weight: 400;
  text-align: center;
  border: none;
  color: ${theme.colors.neutralMidDark};
  user-select: none;
  outline: none;
  box-shadow: 0 0 4px ${theme.colors.neutralLight};
  cursor: pointer;
  transition: .3s;

  &:hover {
    font-weight: 600;
    box-shadow: 0 0 4px ${theme.colors.neutralMidLight};
  } 
  &:focus {
    outline: none;  
  } 
`;

const Button = (props) => {
  // Customize the button adding props textOnButton, textColor, btnColor, btnBorder. 
  // For example: textOnButton="Add" textColor="white" btnColor="green" btnBorder="none"

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