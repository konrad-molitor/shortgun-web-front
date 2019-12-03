import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Contacts = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Card style={{width: "70%"}}>
        <Card.Header>
          <img
            src="chat.svg"
            height="25px"
            width="25px"
            alt="Contacts Icon"
            className="d-inline-block align-top"
          />{' '}
          Contacts
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Feel free to contact me about this project.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button 
            variant="outline-dark" 
            style={{marginRight: "10px"}}
            onClick={() => {window.open("https://github.com/konrad-molitor", "_blank")}}
          >
            <img
              src="github.svg"
              height="25px"
              width="25px"
              alt="Github Icon"
              className="d-inline-block align-top"
            />{' '}
            Github
          </Button>
          <Button 
            variant="outline-dark" 
            style={{marginRight: "10px"}}
            onClick={() => {window.open("https://t.me/kmolitor", "_blank")}}
            >
            <img
              src="telegram.svg"
              height="25px"
              width="25px"
              alt="Telegram Icon"
              className="d-inline-block align-top"
            />{' '}
            Telegram
          </Button>
          <Button 
            variant="outline-dark" 
            style={{marginRight: "10px"}}
            onClick={() => {window.open("https://www.linkedin.com/in/исмаил-валиев-6ab150186", "_blank")}}
            >
            <img
              src="linkedin.svg"
              height="25px"
              width="25px"
              alt="LinkedIn Icon"
              className="d-inline-block align-top"
            />{' '}
            LinkedIn
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default Contacts;