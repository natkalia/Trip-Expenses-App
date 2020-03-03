import React from 'react'; 
import styled from 'styled-components';
import { theme } from '../utils/theme';


const FooterWrapper = styled.div`
  margin-top: auto;
  background-color: ${theme.colors.dark};
  padding: 10px 20px;
  width: 100%;
  text-align: center;
`;

const Paragraph = styled.p`
  color: ${theme.colors.neutralExtraLight};
  font-size: 12px;
`;

const Link = styled.a`
  color: ${theme.colors.neutralExtraLight};
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color:${theme.colors.btnMain};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Paragraph>
        Trip Expenses App was created by Warsaw Group during{' '}
        <Link
          href="https://coderscamp.edu.pl/"
          title="See CodersCamp Page"
        >
          Coderscamp 2019/2020
        </Link>
        . More info and source code{' '}
        <Link
          href="https://github.com/dobrzyckahanna/TravelPlanner"
          title="See on Github"
        >
          here
        </Link>
        .
      </Paragraph>
      <Paragraph>©All Rights Reserved, 2020</Paragraph>
    </FooterWrapper>
  )
};

export default Footer;