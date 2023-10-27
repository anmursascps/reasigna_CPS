import React, { Component, useEffect, useRef, useState } from 'react'
import project_service from '../../services/project_service'
import { Box, Button, Container, Dialog, Divider, IconButton, Input, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Delete, Edit, ViewCarousel, ViewComfy, ViewInAr, ViewStream, Visibility } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import gtfs_service from '../../services/gtfs_service'
import { DashboardLayout } from '../dashboard/dashboard-layout'
import Head from 'next/head'
import {
    LayersControl,
    GeoJSON,
    MapContainer,
    TileLayer,
    FeatureGroup,
    Marker,
    Popup,
} from "react-leaflet";

const Trip_Details = () => {

    let navigate = useNavigate();


    // get the tripId from url
    const { trip_id } = useParams()

    const [trips, setTrips] = useState([])
    const [shape, setShape] = useState([])
    const [GEOJson, setGEOJson] = useState([])
    const [calendar, setCalendar] = useState([])

    const [data, setData] = useState([])

    const [map, setMap] = useState("");
    const [geojsonKey, setgeojsonKey] = useState("");
    const [stops, setStops] = useState([])

    const divMapaRef = useRef();

    function rutas(feature, layer) {
        console.log(feature)
        console.log(layer)
    }









    useEffect(() => {
        gtfs_service.getTripById(trip_id).then((response) => {
            setTrips(response.data.trips)
            setShape(response.data.trips.shapes)
            setStops(response.data.stops)
            setCalendar(response.data.trips.calendar)
            const data = JSON.parse(response.data.geojson);
            setGEOJson(data)
        }, error => {
            console.log(error)
        })
    }, [])



    function map_shapes() {
        const markers = stops.map((stop) => (
            <Marker key={stop.stop_name} position={[stop.stop_lat, stop.stop_lon]}>
                <Popup>{stop.stop_name}</Popup>
            </Marker>
        ));
        if (true) {
            console.log(GEOJson);
            return (
                <div ref={divMapaRef}>
                    <MapContainer
                        style={{ height: "85vh", width: "100%" }}
                        className="Map"
                        zoom={9}
                        scrollWheelZoom={true}
                        center={[39.47058066029149, -0.37831246400076907]}
                        whenCreated={setMap}
                    >
                        <LayersControl>
                            
                            <GeoJSON
                                key={geojsonKey}
                                data={GEOJson.features}
                                color="black"
                                weight={3}
                                onEachFeature={rutas}
                            />
                            <FeatureGroup>{markers}</FeatureGroup>

                            <LayersControl.BaseLayer checked name="OpenStreetMap">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    maxZoom={19}
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>
                    </MapContainer>
                </div>
            );
        }
    }



    return (
        <DashboardLayout>
            <Head>
                <title>GTFS-</title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 5 }}>
                <Container maxWidth={false}>
                    <Typography sx={{ m: 1 }} variant="h4">
                        Calendar
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
                                        <TableCell>serviceId</TableCell>
                                        <TableCell>monday</TableCell>
                                        <TableCell>tuesday</TableCell>
                                        <TableCell>wednesday</TableCell>
                                        <TableCell>thursday</TableCell>
                                        <TableCell>friday</TableCell>
                                        <TableCell>saturday</TableCell>
                                        <TableCell>sunday</TableCell>
                                        <TableCell>start_date</TableCell>
                                        <TableCell>end_date</TableCell>
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    <TableRow
                                        hover
                                        key={calendar?.id}
                                    >
                                        <TableCell>{calendar?.id}</TableCell>
                                        <TableCell>{calendar?.serviceId}</TableCell>
                                        <TableCell>{calendar?.monday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.tuesday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.wednesday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.thursday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.friday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.saturday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.sunday == true ? "🟢" : "🔴"}</TableCell>
                                        <TableCell>{calendar?.start_date}</TableCell>
                                        <TableCell>{calendar?.end_date}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {/* Sidebar for Stops */}
                        <div style={{ width: '30%', marginRight: '10px' }}>
                            <Typography sx={{ m: 1 }} variant="h4">
                                Stops
                            </Typography>
                            <List component="nav">
                                {stops.map((stop) => (
                                    <div key={stop.id}>
                                        <ListItem button>
                                            <ListItemText primary={stop.stop_name} secondary={`Arrival Time: ${stop.arrival_time}`} />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>
                        </div>

                        {/* Map */}
                        <div style={{ width: '70%' }}>
                            {GEOJson.features?.length > 0 ? map_shapes() : console.log("nohayshapes")}
                        </div>
                    </div>

                    {/* Clear float */}
                    <div style={{ clear: 'both' }}></div>

                </Container>
            </Box>
        </DashboardLayout>
    );
}

export default Trip_Details