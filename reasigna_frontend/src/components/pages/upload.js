import { Alert, Backdrop, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DashboardLayout } from "../dashboard/dashboard-layout";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import gtfs_service from "../../services/gtfs_service";

const Upload = () => {
  const navigate = useNavigate();

  const { id } = useParams()

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [message, setMessage] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loadingGtfs, setLoadingGtfs] = useState(false);
  const [valid, setValid] = useState(true);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    setMessage([]);
    setSummary([]);
    setLoadingGtfs(true);
    let currentFile = selectedFiles[0];
    gtfs_service.createZip(currentFile)
      .then((response) => {
        setLoadingGtfs(false);
        console.log(response)
        if (response.data) {
          setMessage(response.data.notices)
          setSummary(response.data.summary)
          setValid(response.data.OK)
          console.log(response.data.summary)
          console.log(response.data.notices)
        }
      })
      .catch((error) => {
        setMessage(error.status);
      });
  };

  useEffect(() => {
    setOpenSnackbar(true)

  }, [])


  const saveOnDatabase = () => {
    setLoadingGtfs(true);
    setOpen(false);
    let currentFile = selectedFiles[0];
    setSelectedFiles(undefined);
    console.log(id)
    gtfs_service.saveOnDatabase(currentFile, name, id).then((response) => {
      setLoadingGtfs(false);
      setOpenSnackbar(true);
      var gtfs_id = response.data
      gtfs_id = gtfs_id.split("/")
      gtfs_id = gtfs_id[gtfs_id.length - 1]
      navigate(`/gtfs/${gtfs_id}`)
    }).catch((error) => {
      console.log(error)
      setMessage(error.status);
    });
  };



  const handleClose = () => {
    setLoadingGtfs(false);
  };


  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedHeaders, setSelectedHeaders] = useState([]);

  function messageE() {
    const handleRowClick = (index) => {
      if (selectedRow === index) {
        setSelectedRow(null);
        setSelectedHeaders([]);
      } else {
        setSelectedRow(index);
        setSelectedHeaders(Object.keys(message[index].sampleNotices[0]));
      }
    };

    return (
      <div>
        {summary && summary?.agencies?.length > 0 ? (
          <div>
            <Typography sx={{ m: 1 }} variant="h4">
              Summary
            </Typography>
            <TableContainer sx={{ m: 2 }} component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Agencies included</TableCell>
                    <TableCell>Files included</TableCell>
                    <TableCell>Counts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ verticalAlign: "top" }}>
                      {summary.agencies.map((agency) => (
                        <div key={agency.name}>
                          <a href={agency.url} target="_blank" rel="noopener noreferrer">
                            {agency.name}
                          </a>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ verticalAlign: "top" }}>
                      {summary.files.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </TableCell>
                    <TableCell style={{ verticalAlign: "top" }}>
                      <ul>
                        {Object.entries(summary.counts).map(([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div></div>
        )}

        {message && message.length > 0 ? (
          <>
            <Typography sx={{ m: 1 }} variant="h4">
              Errores
            </Typography>
            <TableContainer sx={{ m: 2 }} component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>NOTICE CODE</TableCell>
                    <TableCell>SEVERITY</TableCell>
                    <TableCell>TOTAL NOTICES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {message.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow hover onClick={() => handleRowClick(index)}>
                        <TableCell>
                          {selectedRow === index ? "-" : "+"} {item.code}
                        </TableCell>
                        <TableCell>
                          {item.severity === "ERROR" ? (
                            <span style={{ color: "red" }}>🔴 </span>
                          ) : item.severity === "WARNING" ? (
                            <span style={{ color: "orange" }}>🟠 </span>
                          ) : (
                            <span style={{ color: "gray" }}>⚪ </span>
                          )}
                          {item.severity}
                        </TableCell>
                        <TableCell>{item.totalNotices}</TableCell>
                      </TableRow>
                      {selectedRow === index && (
                        <TableRow>
                          <TableCell colSpan={3}>
                            <TableContainer component={Paper}>
                              <p>{item?.description}</p>
                              <br />
                              <p>{item?.shortSummary}</p>
                              <br />
                              <p>
                                You can see more about this notice{" "}
                                <a
                                  href={item?.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  here
                                </a>
                              </p>
                              <br />
                              <Table >
                                <TableHead>
                                  <TableRow>
                                    {selectedHeaders.map((header, index) => (
                                      <TableCell key={index}>{header}</TableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {item.sampleNotices.map((notice, i) => (
                                    <TableRow key={i}>
                                      {selectedHeaders.map((header, index) => (
                                        <TableCell key={index}>
                                          {notice[header]}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth={false}>
          <div>
            <Button variant="contained" component="label" color="primary">
              {" "}
              <AddIcon /> Selecciona un GTFS
              <input
                type="file"
                hidden
                onChange={selectFile}
                accept="file/zip"
              />
            </Button>
            <Button
              className="btn btn-success"
              disabled={!selectedFiles}
              onClick={upload}
              sx={{ m: 1 }}
            >
              Validación GTFS
            </Button>
            <Button
              className="btn btn-success"
              disabled={!valid}
              sx={{ m: 1 }}
              onClick={() => setOpen(true)}
            >Guradar GTFS en base de datos</Button>
            <div>{messageE()}</div>
          </div>
        </Container>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingGtfs}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Simple dialog with a string */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: "100%" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Nombre del GTFS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => saveOnDatabase()} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          GTFS Guardado en la base de datos.
        </Alert>
      </Snackbar>


    </DashboardLayout>
  );
};

export default Upload;
