import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledAboutWrapper = styled.div`
  width: 80%;
  padding: 50px;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    text-align: center;
  }

  > img {
    width: 150px;
    height: 150px;
    align-self: center;
  }
  > p {
    font-size: 1.6rem;
  }

  > button {
    width: 150px;
    background: ${props => props.theme.semantics.info};
    border: none;
    color: ${props => props.theme.colors.light};
    font-size: 1.6rem;
    font-weight: bolder;
    padding: 10px;
    border-radius: 5px;
  }
`;

const About = () => {
  let history = useHistory();
  return(
    <StyledAboutWrapper>
      <h1>Short.Gun - URL shortener service</h1>
      <img src="logo.svg" alt="shortgun logo"/>
      <p>
        Short.Gun is a URL shortener service written in JavaScript. 
        It provides shortened URLs for various purposes such as Twitter messaging, Instagram messagaing, blogging, email, SMS and more. 
        <strong>Be aware that this service built and deployed for learning purposes only and I provide no guarantees.</strong>
        Don't use this service for your working, business, professional and other critical cases. 
        Consider using full-grown services as Rebrandly, Bitly, TinyURL, BudURL or other. 
        This software distributed under the terms of MIT License.</p>
      <p>
        Icons by Alexander Kahlkopf (<a href="https://iconmosntr.com/">iconmonstr.com</a>)
      </p>
      <button onClick={() => history.push('/')}>Got It!</button>
    </StyledAboutWrapper>
  )
}

export default About;