import styled from 'styled-components';
import  React from 'react';

const StyledFooter = styled.div`
    width: 100%;
    background: #D87E4A;
    height: 50px;
    color: #6f6e6c;
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