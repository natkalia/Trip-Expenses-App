import React from 'react'; 
import styled from 'styled-components';

const DefaultButton = styled.input`
  background-color: #70F4FD;
  border-radius: 7px;
  min-height: 50px;
  margin: 10px auto;
  width: 100%;
  font-size: 20px;
  text-align: center;
  border: none;
  color: #000;
  user-select: none;
  &:hover {
    cursor: pointer;  
  } 
  &:focus {
    outline: none;  
  } 
`;

const Button = (props) => {
  return (
    <DefaultButton defaultValue = {props.textOnButton} disabled backgroundColor = {props.test} />
  )
}

export default Button;