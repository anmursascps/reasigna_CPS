import React, { Component, useEffect, useState } from 'react'
import project_service from '../services/project_service'
import { Box, Button, Dialog, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Delete, Edit, ViewCarousel, ViewComfy, ViewInAr, ViewStream } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import gtfs_service from '../services/gtfs_service'

const Gtfs = () => {

    const { id } = useParams()

    const [gtfs, setGtfs] = useState([])
    const [gtfsName, setGtfsName] = useState("")
    const [open, setOpen] = useState(false)



    const handleClose = () => {
        setOpen(false)
    }

    const deleteGtfs = (gtfsId) => {
        gtfs_service.deleteGtfs(gtfsId).then((response) => {
            gtfs_service.getGtfsByProjectId(id).then((response) => {
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
            projectId: id
        }
        gtfs_service.newGtfs(gtfs).then((response) => {
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
            console.log(response.data)
            
        }, error => {
            console.log(error)
        })
    }, [])


    return (
        <Box sx={{ mb: 10 }}>
            <Typography
                sx={{ flex: "1 1 100%", paddingTop: 2, mb: 2 }}
                variant="h4"
                style={{ fontWeight: "bold" }}
            >
                GTFS Proyecto {id}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Subir GTFS
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

                                {gtfs.map((gtf) => (
                                    <TableRow key={gtf.id}>
                                        <TableCell width="45%" align={'center'}>{gtf.id}</TableCell>
                                        <TableCell width="45%" align={'center'}>{gtf.gtfs_name}</TableCell>
                                        <TableCell width="10%" >
                                            <IconButton
                                                color='primary'
                                                variant="contained">
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color='primary'
                                                variant="contained"
                                                onClick={() => deleteGtfs(gtf.id)}
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
        </Box >
    )
}

export default Gtfs