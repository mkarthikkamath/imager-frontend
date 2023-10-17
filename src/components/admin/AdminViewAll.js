import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import urls from '../utils';

class AdminViewAll extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            allImages:[]
        }
    }

    componentDidMount(props){

      const headers = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"*",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Credentials":"*"
      };
      
        axios.get(urls.backendURL+'/imager/allImages', headers).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({ allImages: data})
       });
    }

    render(){
        return(
        <React.Fragment>
                {(this.state.allImages.length === 0) ? (
				<div></div>
			   ):(
        <div>
          <Table >
            {this.state.allImages.length ===0?(<div></div>):(
              <thead class="thead-dark">
              <tr><th>#</th><th>Name</th><th>About</th><th>Click to view</th><th>By</th>
              <th>Uploaded On</th><th>Updated On</th></tr>
            </thead> 
            )}

          {this.state.allImages.map(item => (

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
        </React.Fragment>)
    }
}

export default AdminViewAll;