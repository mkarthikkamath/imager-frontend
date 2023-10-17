import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const AdminHome = () => (
    <Container fluid  >
     <Row >
       <Col><div >
          <Card bg={'Secondary'.toLowerCase()}
                border="light"
                text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2">
              <Card.Body><h5>Admin View</h5></Card.Body>
          </Card>
           </div></Col>
     </Row>
     <Row>

        <div>        
          <Nav fill variant="tabs" >
          <Nav.Item>
              <Nav.Link  href="/adminlogin">Login In</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="/adminsignup" href="/adminsignup">Create New Account</Nav.Link>
          </Nav.Item>
          </Nav>
        </div>
      
      </Row>
    </Container>);

export default AdminHome;