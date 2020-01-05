import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../utils/theme';

export const H2 = styled.h2 `
  font-size: 24px;
  font-weight: 400;
`
export const ParagraphAlignedCenter = styled.p`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin: 0 auto 10px;`

export const ContentWrapper = styled.div `
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width:100%;
  background-color: rgba(255,255,255,0.85);
  margin: 0 auto 40px;
  padding-bottom:20px;
`;

export const HeaderWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  min-height: 70px;
  padding: 20px 0;
  margin-bottom: 30px;
  background-color: rgba(255,255,255,0.85);
  box-shadow: 0 4px 4px ${theme.colors.neutralExtraLight};
`;

export const InnerContainer = styled.div`
  width: 90%;
  margin-bottom: 10px;
`

export const LinkButtonBig = styled(Link)`
  width: 80%;
  min-height: 40px;
  margin: 0 auto 20px;
  padding: 6.5px;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  background-color: ${props => (
    props.color === "green" ? theme.colors.btnMain 
    : theme.colors.white 
    )};
  color: ${props => (
    props.color === "green" ? theme.colors.white 
    : props.color === "greenOutline" ? theme.colors.btnMain
    : theme.colors.neutralMidDark
    )};
  border: 1px solid ${props => (
    props.color === "green" ? theme.colors.btnMain
    : props.color === "greenOutline" ? theme.colors.btnMain
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

// Forms

export const Form = styled.form`
  width: 80%;
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
  border: 1px solid ${theme.colors.neutralExtraLight};
  border-radius: 5px;  
  box-shadow: 0 0 4px ${theme.colors.neutralExtraLight};  
  &::placeholder{
    font-size: 16px;
    color: #999;
  }
  &:focus{ 
    outline: none;
    box-shadow: 0 0 4px ${theme.colors.neutralMidLight}; 
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
