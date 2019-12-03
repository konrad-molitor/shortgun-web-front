import React, { Component } from 'react';
import { Form, Button, Nav, Tab, Row, Col } from 'react-bootstrap';

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
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <Tab.Container id="authForm" defaultActiveKey="signup">
              <div>
                <Nav fill variant="pills" className="flex-row justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Signup</Nav.Link>
                  </Nav.Item>
                </Nav>          
              </div>
              <div>
                <Tab.Content style={{marginTop: "15px"}}>
                  <Tab.Pane eventKey="login">
                    <Form onSubmit={this.handleLogin}>
                      <Form.Group controlId="formEmailLogin">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" autoComplete="current-email" name="loginEmail" value={this.state.loginEmail} onChange={this.handleChange} required/>
                      </Form.Group>
                      <Form.Group controlId="formPasswordLogin">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="password" autoComplete="current-password" value={this.state.loginPassword} name="loginPassword" onChange={this.handleChange} required/>
                      </Form.Group>
                      <Form.Group controlId="formKeepLoggedIn">
                        <Form.Check type="checkbox" label ="Keep me logged in" checked={this.state.keepLogged} name="keepLogged" onChange={this.handleChange}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" size="lg" block>Login</Button>
                    </Form>
                  </Tab.Pane>          
                  <Tab.Pane eventKey="signup">
                    <Form onSubmit={this.handleSignup}>
                      <Form.Group controlId="formSignupEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" autoComplete="current-email" value={this.state.signupEmail} name="signupEmail" onChange={this.handleChange} required/>
                      </Form.Group>
                      <Form.Group controlId="formSignupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" name="signupPassword" value={this.state.signupPassword} onChange={this.handleChange} autoComplete="new-password" required/>
                      </Form.Group>
                      <Form.Group controlId="formSignupConfirmPassword">
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" name="signupPasswordConfirmation" value={this.state.signupPasswordConfirmation} onChange={this.handleChange} autoComplete="off" required/>
                      </Form.Group>
                      <Button variant="primary" type="submit" size="lg" block>Signup</Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </div>
           </Tab.Container>     
          </Col>
        </Row>           
      </div>
    )
  }  
}

export default Start;