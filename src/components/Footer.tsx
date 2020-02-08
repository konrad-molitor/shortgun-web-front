import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledFooter = styled.div`
    width: 100%;
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.regular};
    text-align: center;
    padding: 0;
    margin: 0;
    font-weight: bold;
    font-size: 1rem;

    > a {
      text-decoration: none;
      color: ${props => props.theme.colors.regular};

      &:hover {
        color: ${props => props.theme.colors.main};
      }
    }
`;



const Footer = () => {
    return (
        <StyledFooter as="footer">
            <Link to={"/contacts"}>Copyright &copy; Ismail Valiev (Konrad Molitor)</Link>
        </StyledFooter>
    )
}

export default Footer;