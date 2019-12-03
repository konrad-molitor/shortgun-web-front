import React, { Component } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, FormControl} from 'react-bootstrap';

type profileProps = {
  token: string;
}

type profileState = {
  id: string;
  email: string;
  urls: Array<any>;
  url: string;
  shortUrl: string;
  baseUrl: string;
}

class Profile extends Component<profileProps, profileState> {
  state = {
    id: '',
    email: '',
    urls: [],
    url: '',
    shortUrl: '',
    baseUrl: ''
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
        throw new Error ("Http error: " + res.status)
      }
      return res.json()
    })
    .then(result => {
      this.setState({...this.state, id: result._id, email: result.email, urls: result.urls})
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
        throw new Error("Http error"+res.status);
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
      <div className="h-100 d-flex justify-content-center" style={{marginTop: "15px"}}>
        <Row>
          <Col>
            <Card style={{padding: "20px", backgroundColor: "#b0ffcd"}}>
              <Form.Label>Long URL:</Form.Label>
              <InputGroup>
                <FormControl placeholder="Paste long URL here" aria-label="Long URL" value={this.state.url} onChange={this.handleUrl}/>
                <InputGroup.Append>
                  <Button variant="outline-primary" onClick={this.handleCreateShortcut}>Create Shortcut</Button>
                </InputGroup.Append>
              </InputGroup>
              <Form.Label>Shortcut:</Form.Label>
              <InputGroup>
                <FormControl placeholder="Short URL will appear here" readOnly={true} value={this.state.shortUrl}/>
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={() => this.handleClipboardCopy(this.state.shortUrl)}>Copy to clipboard</Button>
                </InputGroup.Append>
              </InputGroup>
            </Card>
            <div>
              {this.state.urls.map(url => 
              //@ts-ignore
              <Card key={url._id} style={{marginTop: "15px"}}>
                <Card.Body>
                  <InputGroup>
                    {(() => {
                      //@ts-ignore
                      return <FormControl value={url.longUrl} readOnly={true}
                    />})()}
                    <InputGroup.Append>
                      <Button variant="outline-dark" onClick={() => {
                          //@ts-ignore
                          this.handleOpenUrl(url.longUrl)
                        }}>Open</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup style={{marginTop: "10px"}}>
                      {(()=>{
                        //@ts-ignore
                        return <FormControl value={this.state.baseUrl+'/'+url.shortUrl} readOnly={true}/>
                      })()}
                      <InputGroup.Append>
                        <Button variant="outline-success" onClick={() => {
                          //@ts-ignore
                          this.handleClipboardCopy(this.state.baseUrl+'/'+url.shortUrl);
                        }}>Copy to clipboard</Button>
                      </InputGroup.Append>
                  </InputGroup>
                  <Button variant="warning" style={{marginTop:"10px"}} onClick={() => {
                      //@ts-ignore
                      this.handleDeleteShortcut(url._id);
                    }
                  }>Delete shortcut</Button>
                </Card.Body>
              </Card>)}
            </div>       
          </Col>
        </Row>
        <Row>
          <Col>
            
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;