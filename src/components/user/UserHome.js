import React from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';

const UserHome = () => (
    <Container fluid  >
     <Row >
       <Col><div >
          <Card bg={'Secondary'.toLowerCase()}
                border="light"
                text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2">
              <Card.Body><h5>User View</h5></Card.Body>
          </Card>
           </div></Col>
      </Row>
      <Row>
      
        <div>        
          <Nav fill variant="tabs" >
          <Nav.Item>
              <Nav.Link  href="/userlogin">Login In</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="/usersignup" href="/usersignup">Create New Account</Nav.Link>
          </Nav.Item>
          </Nav>
        </div>
       
      </Row>
    </Container>);

export default UserHome;