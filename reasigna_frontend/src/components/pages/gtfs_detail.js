import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import gtfs_service from '../../services/gtfs_service'
import { DashboardLayout } from '../dashboard/dashboard-layout'
import Head from 'next/head'

const Gtfs_Details = () => {

    let navigate = useNavigate();

    const { id } = useParams()

    const [routes, setRoutes] = useState([])
    const [agencies, setAgencies] = useState([])

    useEffect(() => {
        gtfs_service.getGtfsById(id).then((response) => {
            setRoutes(response.data.routes)
            setAgencies(response.data.agencies)
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
                                GTFS - {id}
                            </Typography>
                            <Button
                                sx={{ m: 1 }}
                                variant="contained"
                                onClick={() => navigate(-1)}

                            >
                                <p>Back</p>
                            </Button>

                        </Box>

                        {/* <Typography sx={{ m: 1 }} variant="h4">
                            Agencias
                        </Typography>

                        <Paper
                            style={{ borderRadius: "25px" }}
                            sx={{ width: "100%", mb: 2, mt: 2 }}
                            elevation={10}
                        >
                            <TableContainer style={{ borderRadius: "25px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>agency_id</TableCell>
                                            <TableCell>agency_name</TableCell>
                                            <TableCell>agency_url</TableCell>
                                            <TableCell>agency_timezone</TableCell>
                                        </TableRow>
                                    </TableHead>


                                    <TableBody>
                                        {agencies.map((agency) => (
                                            <TableRow
                                                hover
                                                key={agency.id}
                                            >
                                                <TableCell >{agency.id}</TableCell>
                                                <TableCell>{agency.agency_id}</TableCell>
                                                <TableCell>{agency.agency_name}</TableCell>
                                                <TableCell>{agency.agency_url}</TableCell>
                                                <TableCell>{agency.agency_timezone}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper> */}
                        <Typography sx={{ m: 1 }} variant="h4">
                            Rutas
                        </Typography>

                        <Paper
                            style={{ borderRadius: "25px" }}
                            sx={{ width: "100%", mb: 2, mt: 2 }}
                            elevation={10}
                        >
                            <TableContainer style={{ borderRadius: "25px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>routeId</TableCell>
                                            <TableCell>route_short_name</TableCell>
                                            <TableCell>route_type</TableCell>
                                            <TableCell>agency_id</TableCell>
                                        </TableRow>
                                    </TableHead>


                                    <TableBody>
                                        {routes.map((route) => (
                                            <TableRow
                                                hover
                                                key={route.id}
                                                onClick={() => navigate("/gtfs/" + id + "/route/" + route.id)}
                                            >
                                                <TableCell>{route.id}</TableCell>
                                                <TableCell>{route.routeId}</TableCell>
                                                <TableCell>{route.route_short_name}</TableCell>
                                                <TableCell>{route.route_type}</TableCell>
                                                <TableCell>{route.agency_id}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>


                    </div >
                </Container>
            </Box>
        </DashboardLayout >
    )
}

export default Gtfs_Details