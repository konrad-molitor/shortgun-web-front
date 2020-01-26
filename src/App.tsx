import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast} from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import Contacts from './components/Contacts';
import Start from './components/Start';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { withRouter } from 'react-router-dom';

import Navbar from './elements/Navbar';


type AppState = {
  token: string;
  cookiesInfo: boolean;
  loggedIn: boolean;
  toasts: Array<any>;
}

class App extends Component<any, AppState> {
  state = {
    token: '',
    cookiesInfo: false,
    loggedIn: false,
    toasts: []
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
        throw new Error("HTTP err" + res.status);
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
        throw new Error ("HTTP Error:" + res.status);
      }
      res.json()
    })
    .then(result => {
      this.handleLogin(email, password, false);
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

  showCookiesAcknowledgment(show: boolean) {
    if (show) {
      return (
        <Toast onClose={this.cookiesAccepted}>
            <Toast.Header>
              <img 
                src="info.svg"
                height="15"
                width="15"
                style={{marginRight: "10px"}}
                alt="Info icon"
                />                
              <strong className="mr-auto">{' '}We use cookies!</strong>
            </Toast.Header>
            <Toast.Body>
              To give you the best possible experience, this site uses cookies and by continuing to use the site you agree that we can save them on your device.
              Cookies used to remember your preferences/some details of your visit and don't collect personal information.
            </Toast.Body>
          </Toast>
      )
    }
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
        <main>
          <Switch>
            <Route exact path="/" component={(props: any) => {
                if (this.state.loggedIn) {
                  return <Redirect to="/profile"/>
                } else {
                  return <Start {...props} login={this.handleLogin} signup={this.handleSignup}/>
                }
              }} />
            <Route path="/about" component={About}/>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/profile" component={(props: any) => {
              if (this.state.loggedIn) {
                return <Profile {...props} token={this.state.token}/>
              } else {
                return <Redirect to='/'/>
              }              
            }}/>
          </Switch>
        </main>
        <div style={{
          position: "absolute",
          bottom: 10,
          left: 10
        }}>
          {this.showCookiesAcknowledgment(!this.state.cookiesInfo)}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
