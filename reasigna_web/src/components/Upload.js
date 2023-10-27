import { Box, Button, Container, Typography } from '@mui/material';
import React, { Component, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import routes_service from '../services/routes_service';
import agency_service from '../services/agency_service';


const Upload = () => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [message, setMessage] = useState([]);
    const [fileName, setFileName] = useState("");

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
        setFileName(event.target.files[0].name);
    };



    const upload_zip = () => {
        let currentFile = selectedFiles[0];
        routes_service.createZip(currentFile).then((response => {
            setMessage(response.data.message);
            console.log(response.data);
        }), (error) => {
            console.log(error)
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
        })
    }

    return (
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
            <Container maxWidth={false}>
                <div>


                    <Typography variant="h4" component="h1" gutterBottom>
                        .ZIP
                    </Typography>
                    <Button variant="contained" component="label" color="primary">
                        {" "}
                        <AddIcon /> Selecciona un archivo
                        <input
                            type="file"
                            hidden
                            onChange={selectFile}
                            accept="text/txt"
                        />
                    </Button>
                    <Button
                        className="btn btn-success"
                        disabled={!selectedFiles}
                        onClick={upload_zip}
                    >
                        Upload a file
                    </Button>

                    {fileName}
                <br/>
                <br/>
                <br/>
                <br/>
                {message.length > 0 ? (
                    <Button variant="contained" color="error">
                        {message}
                    </Button>
                ) : (
                    <div></div>
                )}
            </div>
        </Container>
        </Box >
    )
}

export default Upload