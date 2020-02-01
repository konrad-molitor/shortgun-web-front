import React, { Component } from 'react';
import Tabs, { Tab } from '../elements/Tabs';
import styled from 'styled-components';

type startProps = {
  login: Function;
  signup: Function;
}

type startState = {
  loginEmail: string;
  loginPassword: string;
  keepLogged: boolean;
  signupEmail: string;
  signupPassword: string;
  signupPasswordConfirmation: string;
}

const StyledForm = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.accent};
  font-weight: bold;
  font-size: 20px;
  height: 60%;
  > input {
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.regular};
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.regular};
    font-size: 20px;
    font-weight: lighter;

    &:focus {
      outline: none;
    }
  }

  > label {
    margin-bottom: 10px;
  }

  > button {
    background: ${props => props.theme.semantics.success};
    border: none;
    color: ${props => props.theme.colors.dark};
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px;
  }
`;

class Start extends Component<startProps, startState> {
  state = {
    loginEmail: '',
    loginPassword: '',
    keepLogged: false,
    signupEmail: '',
    signupPassword: '',
    signupPasswordConfirmation: ''
  }

  constructor(props: any){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e: any) {
    if (e.target.type === "checkbox") {
      this.setState({...this.state, [e.target.name]: e.target.checked})
    } else {
      this.setState({...this.state, [e.target.name]: e.target.value});
    }
  }

  handleLogin(e: any){
    e.preventDefault();
    this.props.login(this.state.loginEmail, this.state.loginPassword, this.state.keepLogged);
  }

  handleSignup(e: any){
    e.preventDefault();
    if (this.state.signupPassword !== this.state.signupPasswordConfirmation){
      alert("Password does not match it's confirmation!");
      this.setState({...this.state, signupPassword: '', signupPasswordConfirmation: ''});
    } else {
      this.props.signup(this.state.signupEmail, this.state.signupPassword);
    }
  }

  render() {
    return (
        <Tabs default="signup">
          <Tab label="Login" tabId="login">
            <StyledForm onSubmit={this.handleLogin}>
              <label>Email:</label>
              <input type="email" placeholder="Enter email" autoComplete="current-email" name="loginEmail" value={this.state.loginEmail} onChange={this.handleChange} required/>
              <label>Password:</label>
              <input type="password" placeholder="Password" autoComplete="current-password" value={this.state.loginPassword} name="loginPassword" onChange={this.handleChange} required/>
              <span>
                <input type="checkbox" checked={this.state.keepLogged} name="keepLogged" onChange={this.handleChange}/>
                <label>Keep me logged</label>
              </span>              
              <button type="submit">Login</button>
            </StyledForm>
          </Tab>
          <Tab label="Sign Up" tabId="signup">
            <StyledForm onSubmit={this.handleSignup}>
            <label>Email:</label>
            <input type="email" placeholder="Enter email" autoComplete="current-email" value={this.state.signupEmail} name="signupEmail" onChange={this.handleChange} required/>
            <label>Password:</label>
            <input type="password" placeholder="Enter password" name="signupPassword" value={this.state.signupPassword} onChange={this.handleChange} autoComplete="new-password" required/>
            <label>Confirm password:</label>
            <input type="password" placeholder="Confirm password" name="signupPasswordConfirmation" value={this.state.signupPasswordConfirmation} onChange={this.handleChange} autoComplete="off" required/>
            <button type="submit">Signup</button>
            </StyledForm>
          </Tab>
        </Tabs>
    )
  }  
}

export default Start;