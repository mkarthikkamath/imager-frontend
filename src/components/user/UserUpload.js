import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form, FormControl, InputGroup, Card } from 'react-bootstrap';
import urls from '../utils';

class UserUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            uploadDate:null,
            about:'',
            user:''
          };

    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleAboutChange = (e) => {
      this.setState({ about: e.target.value });
  }

    onFileUpload = () => {
    
        const formData = new FormData();
      
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
             + (currentdate.getMonth()+1)  + "/" 
             + currentdate.getFullYear() + " - "  
             + currentdate.getHours() + ":"  
             + currentdate.getMinutes() + ":" 
             + currentdate.getSeconds();

         console.log(datetime)

        const fileData = {
          "fileName" : this.state.selectedFile.name,
          "fileDesc" : this.state.about,
          "fileURL" : urls.cloudfront+this.state.selectedFile.name,
          "uploadDate" : datetime,
          "updateDate" : datetime,
          "userEmail" : this.props.userEmailProp
        }

        const headers = {
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Methods":"*",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Credentials":"*"
        };

        console.log(fileData)
       
        formData.append("file", this.state.selectedFile);
         axios.post(urls.backendURL+'/imager/uploadImage', formData, {
             headers: {
               'Content-Type': 'multipart/form-data',
               "Access-Control-Allow-Origin":"*",
               "Access-Control-Allow-Methods":"*",
               "Access-Control-Allow-Headers":"*",
               "Access-Control-Allow-Credentials":"*"
             }
         }).then(response => response.data).then((data) => {
              console.log(data)
        });
      
        axios.post(urls.backendURL+'/imager/uploadImageDetails', fileData, headers
        ).then(response => response.data)
          .then((data) => {
            console.log(data)
        }).catch(function (error){
          console.log(error);
        });

        this.setState({
          selectedFile: null,
          about: ''
        })

        alert("Uploaded Successfully")

      };

      fileData = () => {
    
        if (this.state.selectedFile) {  
            
           var currentdate = new Date(); 
           var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " - "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

            console.log(datetime)
            
          return (
            <div>
                  <p>{this.state.selectedFile.type}&nbsp;Uploaded on: {datetime}</p>
            </div>
          );}
        
      };

    render() {
      
       

        return (
        <React.Fragment>
         
        <div>
            <div>
            <Card style={{ width: '52rem' }}>
                <Card.Body>
               <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Select the image that you want to upload</Form.Label>
                      <Form.Control type="file"  onChange={this.onFileChange}/>
                </Form.Group>
                
                <InputGroup>
                    <InputGroup.Text>About</InputGroup.Text>
                    <FormControl value={this.state.about} 
                    onChange={this.handleAboutChange}
                    as="textarea" aria-label="With textarea" />
                </InputGroup>
                <div>&nbsp;&nbsp;</div>
                <Button  onClick={this.onFileUpload} variant="primary">Click here to Upload</Button>{' '}
                {this.fileData()}
                </Card.Body></Card>
            </div>
          
        </div>
        
        </React.Fragment>)
    }
}

export default UserUpload;