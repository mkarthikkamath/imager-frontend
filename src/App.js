import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from './components/user/UserHome';
import AdminHome from './components/admin/AdminHome';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignUp from './components/admin/AdminSignUp';
import UserLogin from './components/user/UserLogin';
import UserSignUp from './components/user/UserSignUp';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { Card } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import UserPage from './components/user/UserPage';


function App() {

  return (<React.Fragment>   
    <BrowserRouter>
          <Container fluid>
          
              <Row>
                <Col><div class="header" >
                  <Card bg={'Success'.toLowerCase()}
                      border="light"
                      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                      className="mb-2">
                        <Card.Body>
                          <Row>
                          <Col>
                          <h4>Imager</h4>
                          </Col><Col> </Col>
                          <Col>
                          <Link to="/userhome"> <Button variant="light">Are you a User?</Button></Link>
                          &nbsp;&nbsp;
                          &nbsp;&nbsp;
                          <Link to="/adminhome"> <Button variant="light">Are you an Admin?</Button></Link>
                          &nbsp;&nbsp;
                          &nbsp;&nbsp;
                          <Link to="/"> <Button variant="light">Home</Button></Link>
                          </Col>
                          </Row>
                        </Card.Body>
                  </Card>
                </div></Col>
              </Row>
              
                <Routes>
                  <Route path="/userhome" element={<UserHome/>}/>
                  <Route path="/adminhome" element={<AdminHome/>}/>
                  <Route path='/usersignup' element={<UserSignUp/>} />
                  <Route path='/userpage' element={<UserPage/>} />
                  <Route path='/userlogin' element={<UserLogin/>} />
                  <Route path='/adminsignup' element={<AdminSignUp/>} />
                  <Route path='/adminlogin' element={<AdminLogin/>} />
                  <Route path='/' />
                </Routes>
           
          </Container>
          </BrowserRouter>
       
         </React.Fragment>
        );
}

export default App;