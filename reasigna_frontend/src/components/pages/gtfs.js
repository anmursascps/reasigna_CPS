import React, { Component, useEffect, useState } from 'react'
import project_service from '../../services/project_service'
import { Backdrop, Box, Button, CircularProgress, Container, Dialog, Divider, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Delete, Edit, ViewCarousel, ViewComfy, ViewInAr, ViewStream, Visibility } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import gtfs_service from '../../services/gtfs_service'
import { DashboardLayout } from '../dashboard/dashboard-layout'
import Head from 'next/head'

const Gtfs = () => {

    let navigate = useNavigate();

    const { id } = useParams()

    const [gtfs, setGtfs] = useState([])
    const [gtfsName, setGtfsName] = useState("")
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    // Páginas
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Cambiar filas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleClose = () => {
        setOpen(false)
    }

    const deleteGtfs = (gtfsId) => {
        setDeleting(true)
        gtfs_service.deleteGtfs(gtfsId).then((response) => {
            gtfs_service.getGtfsByProjectId(id).then((response) => {
                setDeleting(false)
                setGtfs(response.data)
            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)
        })
    }

    const createGtfs = () => {
        var gtfs = {
            gtfsName: gtfsName,
            project: {
                "id": parseInt(id)
            }
        }
        gtfs_service.createGtfs(gtfs).then((response) => {
            gtfs_service.getGtfsByProjectId(id).then((response) => {
                setGtfs(response.data)
                setOpen(false)

            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)
        })
    }

    useEffect(() => {
        gtfs_service.getGtfsByProjectId(id).then((response) => {
            setGtfs(response.data)

        }, error => {
            console.log(error)
        })
    }, [])


    return (
        <DashboardLayout>
            <Head>
                <title>GTFS - </title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 5 }}>
                <Container maxWidth={false}>
                    <div>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                m: -1
                            }}>
                            <Typography sx={{ m: 1 }} variant="h4">
                                GTFS
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Button
                                    sx={{ m: 1 }}
                                    variant="contained"
                                    onClick={() => navigate(-1)}

                                >
                                    <p>Back</p>
                                </Button>
                                <Button
                                    onClick={() => navigate(`/proyectos/${id}/gtfs`)}
                                    color="primary"
                                    variant="contained"
                                >
                                    Crear gtfs
                                </Button>
                            </Box>
                        </Box>

                        <Paper
                            style={{ borderRadius: "25px" }}
                            sx={{ width: "100%", mb: 2, mt: 2 }}
                            elevation={10}
                        >
                            <TableContainer sx={{ minWidth: 128 }} style={{ borderRadius: "25px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>NOMBRE</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {gtfs
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((gtfss, index) => {
                                                return (
                                                    <TableRow key={gtfss?.id} tabIndex={-1} hover>
                                                        <TableCell>{gtfss?.id}</TableCell>
                                                        <TableCell>{gtfss?.gtfsName}</TableCell>


                                                        <TableCell>
                                                            <IconButton
                                                                color="primary"
                                                                variant="contained"
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                            <IconButton onClick={() => navigate(`gtfs/${gtfss.id}`)} color="primary" variant="contained">
                                                                <Visibility />
                                                            </IconButton>
                                                            <IconButton
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => deleteGtfs(gtfss.id)}
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </TableCell>
                                                        <Divider />
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[1, 10, 25, gtfs.length]}
                                component="div"
                                count={gtfs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div >
                </Container>
            </Box>
            <Dialog open={open} onClose={handleClose}>

                <TableContainer style={{ borderRadius: '25px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}
                                    style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                    Nombre
                                </TableCell >
                                <TableCell align={'center'}
                                    style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                    Acción
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align={'center'}>
                                    <Input type="text" onChange={(e) => setGtfsName(e.target.value)} />
                                </TableCell>
                                <TableCell align={'center'}>
                                    <Button variant="contained" color="primary" onClick={() => createGtfs()}>
                                        Crear
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={deleting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </DashboardLayout >
    )
}

export default Gtfs