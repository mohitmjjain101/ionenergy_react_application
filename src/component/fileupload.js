import React from 'react'
import axios from 'axios'
export default class FileUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            selectedFile: null
        }
    }

    onFileChange = async event => {
        // Update the state 
        // console.log(event);
        // console.log(event.target.files[0])
        await this.setState({ selectedFile: event.target.files[0] });



    };




    onFileUpload = () => {

        if (this.state.selectedFile == null) {
            alert("Please Upload File First")
        } else {
            console.log("iiiiiii")

            let formData = new FormData();
            // formData.append('file',  this.state.selectedFile);
            formData.append( 
                "file", 
                this.state.selectedFile, 
                this.state.selectedFile.name 
              ); 
            axios.post("http://localhost:3001/uploadFile",formData,  (err, data) => {
                console.log(err, data);
            });
        }

    }
    fileData = () => {
        if (this.state.selectedFile) {

            return (
                <div style={{ marginTop: "200px" }}>

                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <label>Upload a File</label>

                <input type="file" onChange={this.onFileChange}></input>
                <button onClick={this.onFileUpload}>Upload File</button>

                {this.fileData()}
            </div>
        )
    }
}