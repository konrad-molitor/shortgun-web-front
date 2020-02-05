import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import Contacts from './components/Contacts';
import Start from './components/Start';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './elements/Navbar';


type AppState = {
  token: string;
  cookiesInfo: boolean;
  loggedIn: boolean;
  toasts: Array<any>;
  authError?: {
    action: String;
    message: String;
  }
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.dark};
`;

class App extends Component<any, AppState> {
  state = {
    token: '',
    cookiesInfo: false,
    loggedIn: false,
    toasts: [],
    authError: undefined
  }

  constructor(props: any) {
    super(props);
    this.cookiesAccepted = this.cookiesAccepted.bind(this);
    this.getTokenFromStorage = this.getTokenFromStorage.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.title = "Short.Gun - URL Shortener service";
    let savedToken = this.getTokenFromStorage();
    if(savedToken) {
      this.setState((state) => {
        //@ts-ignore
        return {...state, token: savedToken.toString(), cookiesInfo: true, loggedIn: true}
      });
      this.props.history.push('/profile');
    }
  }

  handleLogin (email: string, password: string, keepLogged: boolean){
    fetch('/a/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 404 || res.status === 500) {
          this.setState({...this.state, authError: {action: "login", message: "Server error occured. Please, try again later."}});
        } else if (res.status === 403) {
          this.setState({...this.state, authError: {action: "login", message: "Wrong email or/and password. Please, check your authorization data."}});
        } else {
          this.setState({...this.state, authError: {action: "login", message: "Unknown network error occured. Please, check your connection."}});
        }        
      }
      return res.json();
    })
    .then(result => {
      this.setState({...this.state, loggedIn: true, token: result.token});
      if (keepLogged) {
        window.localStorage.setItem("userToken", result.token);
      }
      this.props.history.push('/profile');
    }, error => {
      console.log(error)
    })
  }

  handleSignup(email: string, password: string){
    fetch('/a/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("already_exist");
        } else if (res.status === 500) {
          throw new Error("server_error");
        } else {
          throw new Error("unknown_error");
        }
      } else {
        res.json();
      }      
    })
    .then(result => {
      this.handleLogin(email, password, false);
    }).catch(e => {
      if (e.message === "already_exist") {
        this.setState({...this.state, authError: {action: "signup", message: "User with this email already exist."}});
      } else if (e.message === "server_error") {
        this.setState({...this.state, authError: {action: "signup", message: "Server error occured. Please try again later."}});
      } else {
        this.setState({...this.state, authError: {action: "signup", message: "Unknown error occured. Please try again later."}});
      }
    })
  }

  getTokenFromStorage () {
    let storage, token;
    try {
      storage = window.localStorage;
      let x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      token = storage.getItem("userToken");
    } catch (e) {
      token = null;
    }
    return token;
  }

  handleLogout() {
    this.setState({...this.state, loggedIn: false, token: ''});
    window.localStorage.removeItem("userToken");
    this.props.history.push('/');
  }

  cookiesAccepted() {
    this.setState((state) => {
      return {...this.state, cookiesInfo: true}
    })
  }

  render () {
    const menuItems = [
      {
        link: '/contacts',
        label: 'Contacts'
      },
      {
        link: '/about',
        label: 'About'
      }
    ];
    return (
      <div className="App">
        <header>
          <Navbar items={menuItems} logged={this.state.loggedIn} logout={() => this.handleLogout()}/>
        </header>
        <StyledMain>
          <Switch>
            <Route exact path="/" component={(props: any) => {
                if (this.state.loggedIn) {
                  return <Redirect to="/profile"/>
                } else {
                  return <Start {...props} login={this.handleLogin} signup={this.handleSignup} error={this.state.authError || undefined}/>
                }
              }} />
            <Route path="/about" component={About}/>
            <Route path="/contacts" render={(props: any) => {
              if (this.state.loggedIn) return <Contacts token={this.state.token}/>;
              else return <Contacts/>;
            }}/>
            <Route path="/profile" component={(props: any) => {
              if (this.state.loggedIn) {
                return <Profile {...props} token={this.state.token}/>
              } else {
                return <Redirect to='/'/>
              }              
            }}/>
          </Switch>
        </StyledMain>
        <div style={{
          position: "absolute",
          bottom: 10,
          left: 10
        }}>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
