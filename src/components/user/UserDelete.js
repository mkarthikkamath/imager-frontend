import React from 'react';
import axios from 'axios';
import { ButtonGroup, Dropdown, DropdownButton, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import urls from '../utils';
class UserDelete extends React.Component {

    constructor(props) {
        super(props);

       this.state ={
           selectValue: "",
           userImages:[],
           showDeleteButton: false
       }
       this.handleDeleteDropdownChange = this.handleDeleteDropdownChange.bind(this);
    }

    componentDidMount(props){

        const postUser = {
            userEmail: this.props.userEmailProp
        }

        console.log(postUser)

        const headers = {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*",
            "Access-Control-Allow-Credentials":"*"
          };

        axios.post(urls.backendURL+'/imager/userView', postUser, headers).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({userImages:data})
       });

    }

    
    handleDeleteDropdownChange = selectedOption => { 
        console.log(selectedOption)
        this.setState({showDeleteButton:true})
        this.setState({selectValue:selectedOption})

       console.log(`Show value`,this.state.showUpdateComponents)
       console.log(`Selected Value`,this.state.selectValue)

    }

    onFileDelete = () => {

        const selectedFile = `${this.state.selectValue}`
        console.log(`Deleting file and data`,this.state.selectValue)

        const headers = {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*",
            "Access-Control-Allow-Credentials":"*"
          };
        
        axios.get(urls.backendURL+'/imager/delete/'+selectedFile, headers)
            .then(response => response.data)
             .then((data) => {
             console.log(data)
        });  

        const postUser = {
            userEmail: this.props.userEmailProp
        }

        console.log(postUser)

        axios.post(urls.backendURL+'/imager/userView', postUser, headers).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({userImages:data})
       });

        this.setState({
            selectValue:''
        })

        alert("Deleted Successfully")
    }

    render(){
        const { selectValue } = this.state;
        return (
        <React.Fragment>
            <Card style={{ width: '52rem' }}>
                <Card.Body>

            <div class="col d-flex justify-content-center">
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Select the image to delete" id="bg-nested-dropdown" 
                    onSelect={this.handleDeleteDropdownChange} value={selectValue}>
                   
                    {this.state.userImages.map(item => (
                         <Dropdown.Item eventKey={item.fileName}>{item.fileName}</Dropdown.Item>
                        
                    ))}
                </DropdownButton>
            </ButtonGroup>
            </div>
            <div class="col d-flex justify-content-center">

             {this.state.showDeleteButton=== true? (
                <div>
                    <div>&nbsp;&nbsp;</div>
                    {this.state.selectValue}
                    <div>&nbsp;&nbsp;</div>
                   <Button  onClick={this.onFileDelete} variant="primary">Delete</Button>{' '}
                </div>
             ):(<div></div>)} 
             </div>
        </Card.Body></Card>
        </React.Fragment>)
    }
}

export default UserDelete;