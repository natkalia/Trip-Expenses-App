import styled from 'styled-components';
import { theme } from '../utils/theme';

export const H2 = styled.h2 `
  font-size: 24px;
  font-weight:400;
`
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

export const Paragraph = styled.p `
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