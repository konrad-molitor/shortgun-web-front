import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const About = () => {
  let history = useHistory();
  return(
    <div className="h-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: "50%" }}>
          <Card.Header>
            <img
              src="info.svg"
              height="20"
              width="20"
              alt="Info icon"
              className="d-inline-block align-top"
              />
              {' '}
            Hi there! This is Short.Gun!
          </Card.Header>
          <Card.Body>
            <Card.Text>We provide URL shortener service for various purposes, such as Twitter messaging, instant messaging, blogging, email and more.
                This service built for learning purposes so we provide no guarantees. Don't use this service for your production/commercial/other critical purposes.
            </Card.Text>      
          </Card.Body>              
          <Card.Footer>
            <Button onClick={() => history.push("/")}>Got it!</Button>
          </Card.Footer>
        </Card>
    </div>
  )
}

export default About;