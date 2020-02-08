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
    baseUrl: '',
    error: {
      action: '',
      message: ''
    }
  }

  constructor(props: profileProps){
    super(props);
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

  handleClipboardCopy(text: string) {
    navigator.clipboard.writeText(text)
    .then(() => {}, err => console.log(err))
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
        {this.state.urls.map((item: any) => {
          return (
            <StyledShortCutItem key={item.id}>
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