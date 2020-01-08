import React from 'react'; 
import styled from 'styled-components';
import { theme } from '../utils/theme';

const DefaultChip = styled.span`
  background-color: transparent;
  border: 1px solid ${theme.colors.neutralMidDark};
  border-radius: .5em;
  display: inline-block;
  font-size: 0.7em;
  font-weight: bold;
  margin: .2em;
  padding: .3em;
  text-transform: uppercase;
  text-align: center;
`

export const Chip = (props) => {
  // provide props:
  // - content for text in Chip
  // - textColor for color of text
  // - borderColor for color of border

  const chipStyle = {
    // what we want to modify
    borderColor: props.borderColor,
    color: props.textColor,
  };

  return <DefaultChip style={chipStyle}>{props.content}</DefaultChip>
};