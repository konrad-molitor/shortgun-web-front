import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

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
  display: flex;
  flex-direction: column;
  margin: 1rem;
  background: ${props => props.theme.colors.light};
  border-radius: 5px;

  > svg {
    fill: ${props => props.theme.colors.main};
  }
  
  @media only screen and (max-width: 768px){
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  > a > img {
    @media only screen and (max-width: 400px){
      display: none;
    }
  }
`;

const StyledItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  >h3 {
    font-size: ${props => props.theme.defaults.fontSize};
    color: ${props => props.theme.colors.dark};
    text-overflow: ellipsis;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    margin: 1rem;

    @media only screen and (max-width: 768px){
      width: 300px;
    }
  }

  > button {
    background: ${props => props.theme.semantics.danger};
    border: none;
    border-top-right-radius: 5px;
    color: ${props => props.theme.colors.light};
    padding-left: 1rem;
    padding-right: 1rem;

    > svg {
      fill: ${props => props.theme.colors.light};
    }
  }
`;

const StyledUrl = styled.input`
  border: none;
  background: ${props => props.theme.semantics.success};
  font-size: ${props => props.theme.defaults.fontSize};
  color: ${props => props.theme.colors.dark};
  padding: 1rem;
`;

const StyledButtonsWrapper = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;

  &:first-child {
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-bottom-right-radius: 5px;
  }

  > button {
    flex-grow: 1;
    margin: 0;
    background: none;
    border: none;
    font-size: ${props => props.theme.defaults.fontSize};
    padding: 1rem;
    text-transform: uppercase;
    color: ${props => props.theme.colors.dark};
    font-weight: bold;

    &:focus {
      outline: none;
    }

    &:hover {
      color: ${props => props.theme.colors.main};
    }
  }
`;

const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  margin: 0;

  @media only screen and (max-width: 768px)
    {   
        width: 100%;
        justify-content: center;
    }
`;

const noImage = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="400" 
    height="225"
    fill="orange"
    viewBox="0 0 24 24">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm9 12c0 1.94-.624 3.735-1.672 5.207l-12.535-12.535c1.472-1.048 3.267-1.672 5.207-1.672 4.962 0 9 4.038 9 9zm-18 0c0-1.94.624-3.735 1.672-5.207l12.534 12.534c-1.471 1.049-3.266 1.673-5.206 1.673-4.962 0-9-4.038-9-9z"/>
  </svg>
);

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
            <StyledShortCutItem key={item._id}>
              <StyledItemTitle>
                <h3>{item.pageTitle || "Web page"}</h3>
                <button onClick={() => this.handleDeleteShortcut(item._id)}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                    </svg>
                  </button>
              </StyledItemTitle>
              <a href={item.longUrl}>
                {item.preview ? <img src={`/images/${item.preview}`} alt={item.pageTitle || "Web Page preview"}/> : noImage()}
              </a>
              <StyledUrl value={`${this.state.baseUrl}${item.shortUrl}`} disabled/>
              <StyledButtonsWrapper>
                <button onClick={() => this.handleOpenUrl(item.longUrl)}>Open</button>
                <button onClick={() => this.handleClipboardCopy(`${this.state.baseUrl}${item.shortUrl}`)}>Copy</button>
              </StyledButtonsWrapper>              
            </StyledShortCutItem>
          )
        })}
      </StyledProfileWrapper>
    )
  }
}

export default withTheme(Profile);