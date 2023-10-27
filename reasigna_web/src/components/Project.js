import React, { Component, useEffect, useState } from 'react'
import project_service from '../services/project_service'
import { Box, Button, Dialog, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Delete, Edit, ViewCarousel, ViewComfy, ViewInAr, ViewStream } from '@mui/icons-material'

const Project = () => {

    const [projects, setProjects] = useState([])
    const [projectName, setProjectName] = useState("")
    const [open, setOpen] = useState(false)


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
        <Box sx={{ mb: 10 }}>
            <Typography
                sx={{ flex: "1 1 100%", paddingTop: 2, mb: 2 }}
                variant="h4"
                style={{ fontWeight: "bold" }}
            >
                PROYECTOS
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Crear proyecto
            </Button>
            <Box sx={{ border: 0, padding: '5px 15px 5px 15px' }}>
                <Paper style={{ borderRadius: '25px' }} sx={{ width: '100%' }} elevation={5}>
                    <TableContainer style={{ borderRadius: '25px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'center'}
                                        style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                        ID
                                    </TableCell >
                                    <TableCell align={'center'}
                                        style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                        Nombre
                                    </TableCell>
                                    <TableCell align={'center'}
                                        style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                        
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell  width="45%" align={'center'}>{project.id}</TableCell>
                                        <TableCell  width="45%" align={'center'}>{project.projectName}</TableCell>
                                        <TableCell  width="10%" >
                                            <IconButton
                                                color='primary'
                                                variant="contained">
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color='primary'
                                                variant="contained"
                                                onClick={() => deleteProject(project.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                            <IconButton
                                                color='primary'
                                                variant="contained">

                                                <ViewStream />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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
        </Box >
    )
}

export default Project