import React, { Component } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserPage from './UserPage';
import urls from '../utils';

class UserLogin extends Component {

  constructor(props){
    super(props);
    this.state =  { userEmail: '',
                    userPassword: '',
                    userFirstName: '',
                    userLastName: '',
                    isValid:false};
}

handleUserEmailChange = (e) => {
    this.setState({ userEmail: e.target.value });
}

handleUserPasswordChange = (e) => {
    this.setState({ userPassword: e.target.value });
}

loginUser=(event)=>{
    event.preventDefault();

    const postData = {
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword
    }

    const headers = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"*",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Credentials":"*"
      };
    
    axios.post(urls.backendURL+'/user/authenticateUser', postData, headers)
    .then(response => response.data)
     .then((data) => {
       console.log(data)

       this.setState({
           isValid: true
       })

        this.setState({
            userFirstName: data.userFirstName
        })
        this.setState({
            userLastName: data.userLastName
        })

        console.log(this.state.userFirstName)
        console.log(this.state.userLastName)
    }).catch(function (error){
        console.log(error);
      });
 }

render() {
    return (<React.Fragment>
    
        <Container fluid>
    
        <Row>
          <Col><div >
          <Card bg={'Secondary'.toLowerCase()}
                border="light"
                text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2">
              <Card.Body><h5>User View</h5></Card.Body>
          </Card>
           </div></Col>
        
        </Row>
        {this.state.isValid=== false ? (
        <Row >
            <Col>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
               <form onSubmit={this.loginUser}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6"><div><h5>Log In</h5></div></Form.Label>
                    <Form.Control type="email" placeholder="Email" id="email" value={this.state.userEmail} onChange={this.handleUserEmailChange}/>
                    <Form.Control type="password" placeholder="Password" id="password" value={this.state.userPassword} onChange={this.handleUserPasswordChange}/>
                </Form.Group>
               
                <Button type="submit" variant="primary" size="md" active>Login In</Button>
               
                </form>
                </Card.Body>
            </Card>
            </Col>
        </Row>): (
                <div>
                   <UserPage myPropEmail={this.state.userEmail} 
                          myPropFname={this.state.userFirstName}
                          myPropLname={this.state.userLastName}></UserPage> 
                
                </div>)}          
        </Container>
        </React.Fragment>
        )
    }
}

export default UserLogin;