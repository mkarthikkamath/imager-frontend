import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AdminPage from './AdminPage';
import urls from '../utils';

class AdminLogin extends Component {

  constructor(props){
    super(props);
    this.state =  { adminEmail: '',
                    adminPassword: '',
                    adminFirstName: '',
                    adminLastName: '',
                    isValid: false
                  };
}

handleAdminEmailChange = (e) => {
    this.setState({ adminEmail: e.target.value });
}

handleAdminPasswordChange = (e) => {
    this.setState({ adminPassword: e.target.value });
}

loginAdmin=(event)=>{
    event.preventDefault();

    const postData = {
        adminEmail: this.state.adminEmail,
        adminPassword: this.state.adminPassword
      }

      const headers = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"*",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Credentials":"*"
      };

      console.log(postData)
      axios.post(urls.backendURL+'/admin/authenticate', postData, headers).then(response => response.data)
      .then((data) => {
        console.log(data)

        this.setState({
            isValid: true
        })

        this.setState({
            adminFirstName: data.adminFirstName
        })
        this.setState({
            adminLastName: data.adminLastName
        })

        console.log(this.state.adminFirstName)
        console.log(this.state.adminLastName)

      });
   }

render() {
    return (<React.Fragment>
    
        <Container fluid>
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
        {this.state.isValid===false? (
                    <Row >
                    <Col>
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                        <form onSubmit={this.loginAdmin}>
                        <Form.Group as={Row} className="mb-3" controlId="1">
                            <Form.Label column sm="6"><div><h5>Log In</h5></div></Form.Label>
                            <Form.Control type="email" placeholder="Email" value={this.state.adminEmail} onChange={this.handleAdminEmailChange}/>
                            <Form.Control type="password" placeholder="Password" value={this.state.adminPassword} onChange={this.handleAdminPasswordChange}/>
                        </Form.Group>
                        <Button type="submit" variant="primary" size="md" active>Login In</Button>
                        </form>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
        ):(
            <AdminPage  myPropEmail={this.state.adminEmail} 
                        myPropFname={this.state.adminFirstName}
                        myPropLname={this.state.adminLastName}></AdminPage>
        )}

          
        </Container>
        </React.Fragment>
        )
    }
}

export default AdminLogin;