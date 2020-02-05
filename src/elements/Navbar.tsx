import styled, { keyframes } from 'styled-components';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export interface NavbarProps {
    items: Array<any>;
    logged: Boolean;
    logout: Function;
};

const StyledNav = styled.nav`
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.regular};
    font-family: sans-serif;
    padding: 5px 20px;
    font-size: 1.6rem;
    font-weight: bold;
`;

const StyledMenu = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;

    /* Mobile view */
    @media only screen and (max-width: 768px)
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.regular};
`;

const StyledTextAccent = styled('span')`
    color: ${props => props.theme.colors.main};
    font-size: 1.6rem;
`;

const StyledTextDark = styled('span')`
    color: ${props => props.theme.colors.regular};
    font-size: 1.6rem;
`;

interface StyledItemProps {
    display: Boolean;
}

const StyledItem = styled.li<StyledItemProps>`
    display: block;
    width: auto;
    margin: 0 10px 0 10px;
    
    @media only screen and (max-width: 768px)
    {
        width: 100%;
        text-align: center;
        order: 2;
        margin: 10px;
        display: ${props => props.display ? "block" : "none"};
    }

    > a:hover {
        text-decoration: none;
        color: ${props => props.theme.colors.main};
    }
`;

const rotate = keyframes`
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
`;

const StyledLogo = styled('li')`
    flex: 1;
    a:hover {
        text-decoration: none;
    }
    a > img {
       vertical-align: text-bottom;
    }
    &:hover {
        a > img {
            animation: ${rotate} 2s linear infinite;
        }
    }
    @media only screen and (max-width: 768px)
    {   
        order: 0;
        text-align: center;
        flex-shrink: 0;
    }
`;

interface StyledLogoutButtonProps {
    logged: Boolean;
}

const StyledLogoutButton = styled.button<StyledLogoutButtonProps>`
    background: ${props => props.theme.colors.accent};
    font-size: 1.6rem;
    font-weight: bold;
    border: 0;
    color: ${props => props.theme.colors.dark};
    border-radius: 5px;
    display: ${props => props.logged ? "block" : "none"};
    @media only screen and (max-width: 768px) {   
        width: 100%;
    }
`;

const StyledMenuToggleButton = styled('button')`
    background: none;
    border: 0;
    > svg {
        fill: ${props => props.theme.colors.main};
    }
    &:focus {
        outline: none;
    }
    display: none;
    @media only screen and (max-width: 768px)
    {
        display: block;
        margin: 0;
    }
`;

const StyledMenuWrapper = styled('li')`
    @media only screen and (max-width: 768px)
    {
        order: 1;
        width: auto;
    }
`;

class Navbar extends Component<NavbarProps, {toggled: Boolean}> {
    state = {
        toggled: false
    }

    constructor(props: NavbarProps) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout () {
        this.props.logout();
    };

    render() {
        return (
            <StyledNav>
                <StyledMenu className="menu">
                    <StyledLogo>
                        <StyledLink to="/">
                            <img src="/logo.svg" alt="Shortgun Logo"/>
                            {' '}
                            <StyledTextAccent>Short</StyledTextAccent>
                            <StyledTextDark>.Gun</StyledTextDark>
                        </StyledLink>
                    </StyledLogo>
                    {this.props.items.map((item) => 
                        <StyledItem display={this.state.toggled} key={item.link}>
                            <StyledLink to={item.link}>
                                {item.label}
                            </StyledLink>
                        </StyledItem>
                    )}
                    <StyledItem display={this.state.toggled}>
                        <StyledLogoutButton onClick={this.handleLogout} logged={this.props.logged}>Logout</StyledLogoutButton>
                    </StyledItem>
                    <StyledMenuWrapper>
                        <StyledMenuToggleButton onClick={()=> {this.setState({toggled: !this.state.toggled})}}>
                            {!this.state.toggled ? (<svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24">
                                    <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
                                </svg>) : 
                                (<svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24">
                                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                                    </svg>)
                                }                            
                        </StyledMenuToggleButton>
                    </StyledMenuWrapper>                    
                </StyledMenu>
            </StyledNav>
        )
    }
}

export default Navbar;