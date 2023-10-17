import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserUpload from './UserUpload';
import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';
import UserDownload from './UserDownload';
import urls from '../utils';
import {
  Link
} from "react-router-dom";


class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          selectValue: "",
          showMyImages: false,
          showOtherImages: false,
          userImages: [],
          otherImages: [],
          userFname :'', 
          userLname : '', 
          userEmail : '',
          showUserUpload: false,
          showUserUpdate: false,
          showUserDelete: false,
          showUserDownload: false,
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount(props){

        this.setState({
          userEmail: this.props.myPropEmail
        })
        this.setState({
          userFname: this.props.myPropFname
        })
        this.setState({
          userLname: this.props.myPropLname
        })
      
    }
  
    handleDropdownChange = selectedOption => {

     this.setState({
      showUserUpdate: false,
      showUserUpload: false,
      showUserDelete: false,
      showUserDownload: false,
      
     })

     console.log(`Upload`,this.state.showUserUpload)
     console.log(`Update`,this.state.showUserUpdate)
     console.log(`Delete`,this.state.showUserDelete)
     console.log(`Download`,this.state.showUserDownload)

     const headers = {
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"*",
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Credentials":"*"
    };

     this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
      const postUser = {
        userEmail: this.props.myPropEmail
      }
      if(selectedOption == 1){
        console.log(`Fetch my images :`, selectedOption);
        axios.post(urls.backendURL+'/imager/userView', postUser, headers).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({ userImages: data})
       });

       this.setState({
        showMyImages: true,
        showOtherImages: false,
        otherImages:[]
       })

      }else{
        console.log(`Fetch all the other images :`, selectedOption);

        axios.post(urls.backendURL+'/imager/view',postUser,headers).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({ otherImages: data})
       });

       this.setState({
        showMyImages: false,
        showOtherImages: true,
        userImages:[]
       })

       console.log(`user`, this.state.otherImages)
       console.log(`length`, this.state.otherImages)

      }
    }

    userUpload=(event)=>{
      event.preventDefault();
      
      this.setState({
        showMyImages: false,
        showOtherImages: false,
        userImages:[],
        otherImages:[],
        showUserUpload:true,
        showUserUpdate: false,
        showUserDelete: false,
        showUserDownload: false
       })
     

    }

    userUpdate=(event)=>{
      event.preventDefault();
      this.setState({
        showMyImages: false,
        showOtherImages: false,
        userImages:[],
        otherImages:[],
        showUserUpload:false,
        showUserUpdate: true,
        showUserDelete: false,
        showUserDownload: false
       })
    }

    userDelete=(event)=>{
      event.preventDefault();
      this.setState({
        showMyImages: false,
        showOtherImages: false,
        userImages:[],
        otherImages:[],
        showUserUpload:false,
        showUserUpdate: false,
        showUserDelete: true,
        showUserDownload: false
       })
     
    }

    userDownload=(event)=>{
      event.preventDefault();
      
      this.setState({
        showMyImages: false,
        showOtherImages: false,
        userImages:[],
        otherImages:[],
        showUserUpload: false,
        showUserUpdate: false,
        showUserDelete: false,
        showUserDownload: true
       })
      }


    render() {
      const { selectValue } = this.state;
     
      return (
      <React.Fragment>
        <h3>Hello, {this.props.myPropFname}&nbsp;{this.props.myPropLname}</h3>
        <div class="col d-flex justify-content-center">
        <ButtonGroup>
          <DropdownButton as={ButtonGroup} title="View Images" id="bg-nested-dropdown" 
            onSelect={this.handleDropdownChange} value={selectValue}>
            <Dropdown.Item eventKey="1">My Images</Dropdown.Item>
            <Dropdown.Item eventKey="2">Other Images</Dropdown.Item>
          </DropdownButton>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.userUpload}>Upload Image</Button>{' '}
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.userUpdate}>Update Image</Button>{' '}
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.userDelete}>Delete Image</Button>{' '}
          &nbsp;&nbsp;
          <Button variant="primary" onClick={this.userDownload}>Download Image</Button>{' '}
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <Link to="/"> <Button variant="secondary">Logout</Button></Link>
        </ButtonGroup>
        </div>
        {console.log(`my images `,this.state.showMyImages)}
        {console.log(`other images`,this.state.showOtherImages)}
       {(this.state.userImages.length === 0  && this.state.showMyImages === true) ? (
				<div></div>
			   ):(
        <div>
          <Table>
            {this.state.userImages.length === 0 ? (<div></div>):(
            <thead>
              <tr><th>#</th><th>Name</th><th>Click to view</th><th>About</th><th>Uploaded On</th><th>Updated On</th></tr>
            </thead> 
            )}
          {this.state.userImages.map(item => (
            <tbody>
              <tr key={item.fileId}>
                <td>{item.fileId}</td>
                <td>{item.fileName}</td>
                <td>{item.fileDesc}</td>
                <td><a href={item.fileURL} target="_blank" rel="noreferrer noopener">{item.fileName}</a></td>
                <td>{item.uploadDate}</td>
                <td>{item.updateDate}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>)} 
      {(this.state.otherImages.length === 0 && this.state.showOtherImages === true) ? (
				<div></div>
			   ):(
        <div>
         
          <Table >
            {this.state.otherImages.length ===0?(<div></div>):(
              <thead>
              <tr><th>#</th><th>Name</th><th>About</th><th>Click to view</th><th>By</th>
              <th>Uploaded On</th><th>Updated On</th></tr>
            </thead> 
            )}

          {this.state.otherImages.map(item => (
           
            <tbody>
              <tr key={item.fileId}>
                <td>{item.fileId}</td>
                <td>{item.fileName}</td>
                <td>{item.fileDesc}</td>
                <td><a href={item.fileURL} target="_blank" rel="noreferrer noopener">{item.fileName}</a></td>
                <td>{item.userEmail}</td>
                <td>{item.uploadDate}</td>
                <td>{item.updateDate}</td>
              </tr>
            </tbody>
           
          ))} </Table>
      </div>)}

      {this.state.showUserUpload=== true? (<UserUpload userEmailProp={this.state.userEmail}></UserUpload>):(<div></div>)}
      {this.state.showUserUpdate=== true? (<UserUpdate userEmailProp={this.state.userEmail}></UserUpdate>):(<div></div>)}
      {this.state.showUserDelete=== true? (<UserDelete userEmailProp={this.state.userEmail}></UserDelete>):(<div></div>)}
      {this.state.showUserDownload=== true? (<UserDownload userEmailProp={this.state.userEmail}></UserDownload>):(<div></div>)}

      </React.Fragment>);
    }
  }

export default UserPage;