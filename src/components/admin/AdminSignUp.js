import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AdminPage from './AdminPage';
import urls from '../utils';

class AdminSignUp extends Component {

    constructor(props){
        super(props);
        this.state =  { adminEmail: '',
                        adminFirstName: '',
                        adminLastName: '',
                        adminPassword: '',
                        isValid:false
                      };
    }

    handleAdminEmailChange = (e) => {
        this.setState({ adminEmail: e.target.value });
    }
    handleAdminFirstNameChange = (e) => {
        this.setState({ adminFirstName: e.target.value });
    }
    handleAdminLastNameChange = (e) => {
        this.setState({ adminLastName: e.target.value });
    }
    handleAdminPasswordChange = (e) => {
        this.setState({ adminPassword: e.target.value });
    }

    createAdmin=(event)=>{
        event.preventDefault();

        const headers = {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*",
            "Access-Control-Allow-Credentials":"*"
          };

        const postData = {
            adminEmail: this.state.adminEmail,
            adminFirstName: this.state.adminFirstName,
            adminLastName: this.state.adminLastName,
            adminPassword: this.state.adminPassword
          }
          axios.post(urls.backendURL+'/admin/addNew', postData, headers).then(response => response.data)
          .then((data) => {
            console.log(data)

            this.setState({
                isValid: true
            })
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
            {this.state.isValid===false?(
                            <Row >
                            <Col>
                            <Card style={{ width: '30rem' }}>
                                <Card.Body>
                                <form onSubmit={this.createAdmin}>
                                <Form.Group as={Row} className="mb-5" controlId="1">
                                    <Form.Label column sm="6"><div><h5>Create account</h5></div></Form.Label>
                                    <Form.Control type="email" placeholder="Email" value={this.state.adminEmail} onChange={this.handleAdminEmailChange}/>
                                    <Form.Control type="text" placeholder="First Name" value={this.state.adminFirstName} onChange={this.handleAdminFirstNameChange}/>
                                    <Form.Control type="text" placeholder="Last Name" value={this.state.adminLastName} onChange={this.handleAdminLastNameChange}/>
                                    <Form.Control type="password" placeholder="Password" value={this.state.adminPassword} onChange={this.handleAdminPasswordChange}/>
                                </Form.Group>
                                <Button type="submit" variant="primary" size="md" active>Sign Up</Button>
                                </form>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
            
            ):(
                <AdminPage myPropEmail={this.state.adminEmail} 
                            myPropFname={this.state.adminFirstName}
                            myPropLname={this.state.adminLastName}></AdminPage>
            )}
            
            </Container>
            </React.Fragment>
            )
        }
}

export default AdminSignUp;