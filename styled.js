import { Title, Form, Label, Input, Wrapper } from './styled';

import styled from 'styled-components';

// exports.H1 = styled.h1 `
//   font-size: '3.6rem';
// `;

// exports.H2 = styled.h2 `
//   font-size: '2.4rem';
// `;

// exports.H3 = styled.h3 `
//   font-size: '1.9rem';
// `;

// exports.H4 = styled.h4 `
//   font-size: '1.6rem';
// `;

// exports.H5 = styled.h5 `
//   font-size: '1.4rem';
// `;

// exports.P = styled.p `
//   font-size: '1.6rem';
// `;

// Forms

export const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 24px;
  color: #4B52EE;
  margin: 10px auto;
`;

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10px;
  margin: 10px auto;
`;

export const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  width: 100%;
  margin: 10px auto 0;
`;

export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 18px;
  color: #000;
  display: block;
  border: 1px solid #000;
  padding: 4px;
  border-radius: 3px;
  min-height: 26px;
  width: 100%;
  margin: 0 auto;
  &::placeholder{
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #999;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
`
