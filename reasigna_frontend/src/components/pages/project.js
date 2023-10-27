import React, { Component, useEffect, useState } from 'react'
import project_service from '../../services/project_service'
import { Box, Button, Container, Dialog, Divider, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Delete, Edit, ViewCarousel, ViewComfy, ViewInAr, ViewStream, Visibility } from '@mui/icons-material'
import { DashboardLayout } from '../dashboard/dashboard-layout'
import Head from 'next/head'
import { useNavigate } from 'react-router-dom'

const Project = () => {

    let navigate = useNavigate();

    const [projects, setProjects] = useState([])
    const [projectName, setProjectName] = useState("")
    const [open, setOpen] = useState(false)

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


    useEffect(() => {
        project_service.getAllProjectos().then((response) => {
            setProjects(response.data)

        }, error => {
            console.log(error)
        })

    }, [])

    const createProject = () => {
        var project = {
            projectName: projectName
        }
        project_service.newProject(project).then((response) => {
            project_service.getAllProjectos().then((response) => {
                setProjects(response.data)
                setOpen(false)

            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)
        })
    }

    const deleteProject = (projectId) => {
        project_service.deleteProject(projectId).then((response) => {
            project_service.getAllProjectos().then((response) => {
                setProjects(response.data)
            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <DashboardLayout>
            <Head>
                <title>Proyectos</title>
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
                                PROYECTOS
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Button
                                    onClick={() => setOpen(true)}
                                    color="primary"
                                    variant="contained"
                                >
                                    Crear proyecto
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
                                        {projects
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((project, index) => {
                                                return (
                                                    <TableRow key={project?.id} tabIndex={-1} hover>
                                                        <TableCell>{project?.id}</TableCell>
                                                        <TableCell>{project?.projectName}</TableCell>


                                                        <TableCell>
                                                            <IconButton
                                                                color="primary"
                                                                variant="contained"
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                            <IconButton onClick={() => navigate(`/proyectos/${project.id}`)} color="primary" variant="contained">
                                                                <Visibility />
                                                            </IconButton>
                                                            <IconButton
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => deleteProject(project.id)}
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
                                rowsPerPageOptions={[1, 10, 25, projects.length]}
                                component="div"
                                count={projects.length}
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
                                    <Input type="text" onChange={(e) => setProjectName(e.target.value)} />
                                </TableCell>
                                <TableCell align={'center'}>
                                    <Button variant="contained" color="primary" onClick={() => createProject()}>
                                        Crear
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </DashboardLayout >
    )
}

export default Project