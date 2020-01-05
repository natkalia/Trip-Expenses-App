import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../utils/theme';

export const H2 = styled.h2 `
  font-size: 24px;
  font-weight:400;
`
export const LinkButtonBig = styled(Link)`
  /* colors prop should be one of: green, greenOutline, grey  */
  display: block;
  width: 100%;
  min-height: 40px;
  margin: 0 auto 20px;
  padding: 6.5px;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  background-color: ${props => (
    props.color === "green" ? theme.colors.btnMain
    : props.color === "grey" ? theme.colors.neutralExtraLight
    : theme.colors.white 
    )};
  color: ${props => (
    props.color === "green" ? theme.colors.white 
    : props.color === "greenOutline" ? theme.colors.btnMain
    : theme.colors.neutralMidDark
    )};
  border: 1px solid ${props => (
    props.color === "green" || props.color === "greenOutline" ? theme.colors.btnMain
    : props.color === "grey" ? theme.colors.neutralLight
    : theme.colors.neutralMidDark
    )};
  border-radius: 5px;  
  box-shadow: 0 0 4px ${theme.colors.neutralLight};
  cursor: pointer;
  transition: .3s;

  &:hover{
    background-color: ${props => (
      props.green && '#15AD54'
      )};
      font-weight: 600;
      box-shadow: 0 0 4px 
  } 
`;

export const LinkButtonSmall = styled(LinkButtonBig)`
  min-height: 30px;
  padding: 0px;
  font-size: 16px;
`

// Forms

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 0px auto;  
`;

export const Label = styled.label`
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 5px;
`;

export const Input = styled.input`  
  display: inline-block;
  width: 100%;
  margin: 0 auto 20px;
  padding: 5px;
  font-size: 16px;
  color: ${theme.colors.neutralDark};
  border: 1px solid ${theme.colors.neutralLight};
  border-radius: 5px;  
  box-shadow: 0 0 4 ${theme.colors.neutralDark};  
  &::placeholder{
    font-size: 16px;
    color: #999;
  }
  &:focus{ 
    outline: none;
    /* box-shadow: 0 0 4 ${theme.colors.neutralMidDark}; */
  }
`;

export const InputCheckbox = styled(Input)`
  flex: 30%;
  margin: auto;
`

export const DateInput = styled(Input)`
  width: 40%;
  margin: 0;
  text-align: center;
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const ParagraphSmallItalic = styled.p `
  font-style: italic;
  font-weight: 300;
  font-size: 14px;
  color: ${theme.colors.neutralMidDark};
  padding: 0;
  margin-bottom: 3px;
`;

export const Textarea = styled.textarea`
  display: block;
  font-family: ${theme.fonts.default};
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.neutralDark};  
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  padding: 5px;
  resize: vertical;
  border: 1px solid ${theme.colors.neutralLight};
  border-radius: 5px;
  &::placeholder{
    font-family: ${theme.fonts.default};
    font-size: 16px;
    color: #999;
  }
  &:focus {
    outline: none;
  }
`;

export const IsTripFinishedContainer = styled.div `
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const customStyleSelect = {
  option: (provided, state) => ({
    ...provided,
    color: '#000',
    padding: 2,
    fontFamily: 'Roboto'
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "3px",
    border: '1px solid #000',
    fontFamily: 'Roboto'
  }),
  placeholder: () => ({
    fontFamily: 'Roboto'
  }),
  dropdownIndicator: defaultStyles => ({
    ...defaultStyles,
    color: 'purple'
  })
}