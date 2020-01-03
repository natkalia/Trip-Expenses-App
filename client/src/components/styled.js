import styled from 'styled-components';

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
  

