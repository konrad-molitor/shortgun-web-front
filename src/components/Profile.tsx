import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import CombinedInput from '../elements/combinedInput';


type profileProps = {
  token: string;
  theme: any;
}

type profileState = {
  id: string;
  email: string;
  urls: Array<any>;
  url: string;
  shortUrl: string;
  baseUrl: string;
  error?: {
    action: string;
    message: string;
  }
}

const StyledShortCutItem = styled.div`
  background: ${props => props.theme.colors.light};
  border-radius: 5px;
  width: 50rem;
  margin: 0;
  padding: 2rem;

  @media only screen and (max-width: 768px) {   
        width: auto;
        padding: 1rem;
        border-radius: 0;
  }

  > * {
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media only screen and (max-width: 768px) {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  > button {
    background: ${props => props.theme.semantics.danger};
    color: ${props => props.theme.colors.light};
    font-size: ${props => props.theme.defaults.fontSize};
    padding: 1rem;
    border: 1px solid ${props => props.theme.colors.dark};
    border-radius: 5px;

    @media only screen and (max-width: 768px) {
      padding: 0.5rem;
      font-size: ${props => props.theme.defaults.fontSize};
    }
  }
`;

const StyledAddShortcutForm = styled.div`
  background: ${props => props.theme.semantics.success};
  border-radius: 5px;
  width: 50rem;
  margin: 0;
  padding: 2rem;

  @media only screen and (max-width: 768px)
    {   
        width: auto;
        padding: 1rem;
        font-size: ${props => props.theme.defaults.fontSize};
        border-radius: 0;
    }

  > form {
    display: flex;
    flex-direction: column;
    font-size: ${props => props.theme.defaults.fontSize};
    color: ${props => props.theme.colors.dark};

    @media only screen and (max-width: 768px) {
      font-size: ${props => props.theme.defaults.fontSize};
    }

    > * {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    > label {
      margin-bottom: 0.5rem;
      @media only screen and (max-width: 768px) {
        font-size: ${props => props.theme.defaults.fontSize};
      }
    }

    > button {
      background: ${props => props.theme.colors.main};
      padding: 0.5rem;
      border: 1px solid ${props => props.theme.colors.dark};
      border-radius: 5px;
      font-size: ${props => props.theme.defaults.fontSize};
      color: ${props => props.theme.colors.dark};

      @media only screen and (max-width: 768px) {
        font-size: ${props => props.theme.defaults.fontSize};
      }
    }
  }
`;

const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 8rem;
  padding: 0;

  > * {
    margin: 2.5rem;
    @media only screen and (max-width: 768px) {
      margin: 0;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  @media only screen and (max-width: 768px)
    {   
        width: 100%;
        margin-top: 5rem;
    }
`;

class Profile extends Component<profileProps, profileState> {
  state = {
    id: '',
    email: '',
    urls: [],
    url: '',
    shortUrl: '',
    baseUrl: '',
    error: {
      action: '',
      message: ''
    }
  }

  constructor(props: profileProps){
    super(props);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleCreateShortcut = this.handleCreateShortcut.bind(this);
    this.handleClipboardCopy = this.handleClipboardCopy.bind(this);
    this.handleOpenUrl = this.handleOpenUrl.bind(this);
    this.handleDeleteShortcut = this.handleDeleteShortcut.bind(this);
  }

  componentDidMount() {
    this.setState({...this.state, baseUrl: window.location.origin + '/s/'});
    fetch('/a/profile', {
      headers: {
        'X-Auth': `Bearer: ${this.props.token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error (res.status.toString())
      } else {
        return res.json()
      }
    })
    .then(result => {
      this.setState({...this.state, id: result._id, email: result.email, urls: result.urls})
    })
    .catch(e => {
      if (e.message === '401') {
        this.setState({...this.state, error: {action: 'get_urls', message: "Authorization error occured. Please try to logout then login again."}});
      } else if (e.message === '500') {
        this.setState({...this.state, error: {action: 'get_urls', message: "Server error occured. Please try again later."}})
      } else {
        this.setState({...this.state, error: {action: 'get_urls', message: "Unknown error occured. Check your connection."}})
      }
      if (this.state.error.action === 'get_urls') {
        alert(this.state.error.message);
      }
    })
  }

  handleCreateShortcut(e: any) {
    fetch('/a/add', {
      method: 'POST',
      headers: {
        'X-Auth': `Bearer: ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl: this.state.url
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      return res.json()
    })
    .then(result => {
      let newUrls = [result, ...this.state.urls]
      this.setState({...this.state, 
        shortUrl: this.state.baseUrl+result.shortUrl, 
        urls: newUrls,
        url: ''
      });
    })
    .catch(e => {
      if (e.message === '401') {
        this.setState({...this.state, error: {action: 'add_shortcut', message: 'Authorization error occured. Please try to logout and login again.'}});
      } else if (e.message === '500') {
        this.setState({...this.state, error: {action: 'add_shortcut', message: 'Internal server error occured. Please try again later.'}});
      } else {
        this.setState({...this.state, error: {action: 'add_shortcut', message: 'Unknown error occured. Please check your connection.'}});
      }
    })
  }

  handleClipboardCopy(text: string) {
    navigator.clipboard.writeText(text)
    .then(() => {}, err => console.log(err))
  }

  handleUrl(e: any) {
    this.setState({...this.state, url: e.target.value});
  }

  handleOpenUrl(url: string) {
    window.open(url, '_blank');
  }

  handleDeleteShortcut(id: string){
    fetch(`/a/item/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Auth': `Bearer: ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ("Http error:"+res.status);
      }
      return res.json()
    })
    .then(result => {
      //@ts-ignore
      let newUrls = this.state.urls.filter(url => url._id !== result._id);
      this.setState({...this.state, urls: newUrls});
    });
  }

  render() {
    return(
      <StyledProfileWrapper>
        <StyledAddShortcutForm>
          <form>
            <label>Create shortcut:</label>
            <CombinedInput 
              textInput={
                {
                  hint: "Paste long URL here", 
                  onChange: this.handleUrl, 
                  disable: false,
                  backgroundColor: this.props.theme.colors.dark,
                  textColor: this.props.theme.colors.light
                  }
                } 
                button={
                  {
                    label: "Create Shortcut",
                    onClick: this.handleCreateShortcut,
                    backgroundColor: this.props.theme.colors.main,
                    textColor: this.props.theme.colors.dark
                  }
                }/>
          </form>
        </StyledAddShortcutForm>
        {this.state.urls.map((item: any) => {
          return (
            <StyledShortCutItem>
              <CombinedInput
                textInput={
                  {
                    value: item.longUrl
                  }
                }
                button={
                  {
                    label: "Open",
                    onClick: () => this.handleOpenUrl(item.longUrl),
                    backgroundColor: this.props.theme.colors.main
                  }
                }
              />
              <CombinedInput
                textInput={
                  {
                    value: `${this.state.baseUrl}${item.shortUrl}`
                  }
                }
                button={
                  {
                    label: "Copy to clipboard",
                    onClick: () => this.handleClipboardCopy(`${this.state.baseUrl}${item.shortUrl}`),
                    backgroundColor: this.props.theme.semantics.success,
                    textColor: this.props.theme.colors.dark
                  }
                }
              />
              <button onClick={() => this.handleDeleteShortcut(item._id)}>Delete shortcut</button>
            </StyledShortCutItem>
          )
        })}
      </StyledProfileWrapper>
    )
  }
}

export default withTheme(Profile);