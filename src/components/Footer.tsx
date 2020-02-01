import styled from 'styled-components';
import React from 'react';

const StyledFooter = styled.div`
    width: 100%;
    background: ${props => props.theme.colors.dark};
    height: 50px;
    color: ${props => props.theme.colors.regular};
    text-align: center;
    line-height: 50px;
    padding: 0;
    margin: 0;
    font-weight: bold;
`;



const Footer = () => {
    return (
        <StyledFooter as="footer">
          <div>
            <span>Copyright &copy; Ismail Valiev (Konrad Molitor)</span>
          </div>
        </StyledFooter>
    )
}

export default Footer;