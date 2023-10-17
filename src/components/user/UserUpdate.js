import React from 'react';
import axios from 'axios';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Form, FormControl, InputGroup, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import urls from '../utils';

class UserUpdate extends React.Component {

     constructor(props) {
         super(props);

        this.state ={
            selectValue: "",
            userImages:[],
            showUpdateComponents: false,
            selectedFile: null,
            uploadDate:null,
            about:'',

        }

        this.handleUpdateDropdownChange = this.handleUpdateDropdownChange.bind(this);

     }

     onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleAboutChange = (e) => {
      this.setState({ about: e.target.value });
    }

    onFileUpdate = () => {
    
        const formData = new FormData();
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
             + (currentdate.getMonth()+1)  + "/" 
             + currentdate.getFullYear() + " - "  
             + currentdate.getHours() + ":"  
             + currentdate.getMinutes() + ":" 
             + currentdate.getSeconds();

         console.log(datetime)
        
        if(this.state.selectedFile===null){

        }else{

            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name
              );

              const fileData = {
                "fileId" : this.state.selectValue,
                "fileName" : this.state.selectedFile.name,
                "fileURL" : urls.cloudfront+this.state.selectedFile.name,
                "updateDate" : datetime
              }

                console.log(`updating file details with file`,fileData)
                console.log(`updating file details with file`,this.state.selectedFile.name)


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


                  const headers = {
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Methods":"*",
                    "Access-Control-Allow-Headers":"*",
                    "Access-Control-Allow-Credentials":"*"
                  };

                 axios.post(urls.backendURL+'/imager/updateImageDetail', fileData, headers).then(response => response.data)
                 .then((data) => {
                 console.log(data)
             });  
        }
      
        if(this.state.about===''){

        }else{
                const fileDataAbout = {
                    "fileId" : this.state.selectValue,
                    "fileDesc" : this.state.about,
                    "updateDate" : datetime,
                    "fileName" : this.state.selectedFile.name,
                    "fileURL" : urls.cloudfront+this.state.selectedFile.name,
                }

                console.log(`Updating file desc`,fileDataAbout)

                const headers = {
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Methods":"*",
                    "Access-Control-Allow-Headers":"*",
                    "Access-Control-Allow-Credentials":"*"
                  };

                 axios.post(urls.backendURL+'/imager/updateImageAbout', fileDataAbout, headers).then(response => response.data)
                     .then((data) => {
                     console.log(data)
                 });  
        }

        this.setState({
          selectedFile: null,
          about: ''
        })

        alert("Updated Successfully")

      };

    componentDidMount(props){

        const postUser = {
            userEmail: this.props.userEmailProp
        }

        const headers = {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*",
            "Access-Control-Allow-Credentials":"*"
          };

        console.log(`email id`,this.props.myPropEmail)
        axios.post(urls.backendURL+'/imager/userView', postUser, headers).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({userImages:data})
       });

    }

    handleUpdateDropdownChange = selectedOption => {
    
        console.log(selectedOption)
        this.setState({showUpdateComponents:true})
        this.setState({selectValue:selectedOption})

        
       console.log(`Show value`,this.state.showUpdateComponents)
       console.log(`Selected Value`,this.state.selectValue)

    }

    render() {
       
        const { selectValue } = this.state;
        return (
        <React.Fragment>
              <Card style={{ width: '52rem' }}>
                <Card.Body>
             
            <div class="col d-flex justify-content-center">
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Select the image to update" id="bg-nested-dropdown" 
                    onSelect={this.handleUpdateDropdownChange} value={selectValue}>
                   
                    {this.state.userImages.map(item => (
                         <Dropdown.Item eventKey={item.fileId}>{item.fileName}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </ButtonGroup>
            </div>
            
             {this.state.showUpdateComponents=== true? (
                 <div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose file to update</Form.Label>
                        <Form.Control type="file"  onChange={this.onFileChange}/>
                    </Form.Group>
                    
                    <InputGroup>
                        <InputGroup.Text>About</InputGroup.Text>
                        <FormControl value={this.state.about} 
                        onChange={this.handleAboutChange}
                        as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <div>&nbsp;&nbsp;</div>
                    <Button  onClick={this.onFileUpdate} variant="primary">Update</Button>{' '}
                             </div>
             ):(<div></div>)} 
               </Card.Body></Card>

        </React.Fragment>)
    }
}

export default UserUpdate;