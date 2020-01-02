import React from 'react'; 
import styled from 'styled-components';

const DefaultButton = styled.button`
  background-color: #fff;
  border-radius: 7px;
  min-height: 50px;
  margin: 10px auto 0;
  width: 100%;
  font-size: 20px;
  text-align: center;
  border: none;
  color: #000;
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
    backgroundColor: props.btnColor,
    border: props.btnBorder
  };

  return (
    <DefaultButton type="submit" style = {btnStyle}>{props.textOnButton}</DefaultButton>
  )

}

export default Button;