import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AdminDelete from './AdminDelete';
import AdminDownload from './AdminDownload';
import AdminViewAll from './AdminViewAll';
import AdminView from './AdminView';
import {
  Link
} from "react-router-dom";


class AdminPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          selectValue: "",
          adminFname :'', 
          adminLname : '', 
          adminEmail : '',
          showAdminDelete: false,
          showAdminDownload: false,
          showAllImages: false,
          showUserImages: false
        };
    }

    componentDidMount(props){

        this.setState({
          adminEmail: this.props.myPropEmail
        })
        this.setState({
          adminFname: this.props.myPropFname
        })
        this.setState({
          adminLname: this.props.myPropLname
        })
      
    }
 
    adminDelete=(event)=>{
      event.preventDefault();
      this.setState({
        showAllImages: false,
        showUserImages: false,
        showAdminDelete: true,
        showAdminDownload: false
       })     
    }

    adminDownload=(event)=>{
      event.preventDefault();
      
      this.setState({
        showAllImages: false,
        showUserImages: false,
        showAdminDelete: false,
        showAdminDownload: true
       })
    }

    fetchAllImages =(event)=>{
      event.preventDefault();
      this.setState({
        showAdminDelete: false,
        showAdminDownload: false,
        showAllImages: true,
        showUserImages: false

       })     
    }

    fetchUserImages =(event)=>{
      event.preventDefault();
      
      this.setState({
        showAllImages: false,
        showUserImages: true,
        showAdminDelete: false,
        showAdminDownload: false
       })
    }
    render() {
      const { selectValue } = this.state;
     
      return (
      <React.Fragment>
          <h3>Hello, {this.props.myPropFname}&nbsp;{this.props.myPropLname}</h3>
          <div class="col d-flex justify-content-center">
         <ButtonGroup>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.fetchAllImages}>All Images</Button>{' '}
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.fetchUserImages}>User Gallery</Button>{' '}
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.adminDelete}>Delete Image</Button>{' '}
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.adminDownload}>Download Image</Button>{' '}
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <Link to="/"> <Button variant="secondary">Logout</Button></Link>
        </ButtonGroup>
        <div>&nbsp;</div> 
        </div>
      {this.state.showAllImages=== true? (<AdminViewAll adminEmailProp={this.state.adminEmail}></AdminViewAll>):(<div></div>)}
      {this.state.showUserImages=== true? (<AdminView adminEmailProp={this.state.adminEmail}></AdminView>):(<div></div>)}
      {this.state.showAdminDelete=== true? (<AdminDelete adminEmailProp={this.state.adminEmail}></AdminDelete>):(<div></div>)}
      {this.state.showAdminDownload=== true? (<AdminDownload adminEmailProp={this.state.adminEmail}></AdminDownload>):(<div></div>)} 

      </React.Fragment>);
    }
  }

export default AdminPage;