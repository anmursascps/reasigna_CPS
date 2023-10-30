import React, { useEffect, useRef, useState } from 'react'
import { Backdrop, Box, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from '../dashboard/dashboard-layout'
import Head from 'next/head'
import routes_service from '../../services/routes_service'
import {
    LayersControl,
    GeoJSON,
    MapContainer,
    TileLayer,
    FeatureGroup,
    Marker,
    Popup,
} from "react-leaflet";

import * as L from "leaflet";

const Route_Details = () => {

    let navigate = useNavigate();

    const { id } = useParams()
    const { route_id } = useParams()
    const [trips, setTrips] = useState([])

    const [loading, setLoading] = useState(false)
    const [shapes, setShapes] = useState([])

    const mkRef = useRef();


    const handleClose = () => {
        setLoading(false)
    }






    useEffect(() => {
        setLoading(true)
        routes_service.getRoutesById(route_id).then((response) => {
            // setAgencies(response.data.agencies)
            setTrips(response.data.tripsWithStops)

            const data = JSON.parse(response.data.geojson);
            setShapes(data)
            setLoading(false)
        }, error => {
            console.log(error)
        })
    }, [])
    const divMapaRef = useRef();
    const [map, setMap] = useState("");
    const [geojsonKey, setgeojsonKey] = useState("");
    function rutas(feature, layer) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        layer.setStyle({ color: `#${randomColor}` });
    }


    function map_shapes() {
        if (true) {
            console.log(shapes.features);
            const bounds = L.geoJSON(shapes.features).getBounds();
            return (
                <div ref={divMapaRef}>
                    <MapContainer
                        style={{ height: "85vh", width: "100%" }}
                        className="Map"
                        scrollWheelZoom={true}
                        whenCreated={setMap}
                        bounds={bounds}
                    >
                        <LayersControl>
                            <GeoJSON
                                key={geojsonKey}
                                data={shapes.features}
                                color="black"
                                weight={6}
                                onEachFeature={rutas}
                            />
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

    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleTripClick = (index, trip) => {
        if (selectedTrip === index) {
            setSelectedTrip(null);
            // remove all markers from the map
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

        } else {
            setSelectedTrip(index);
            // remove all markers from the map
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            // iterate over trip.stopTimes and add the markers to the map
            trip.stopTimes.forEach((stopTime) => {
                const marker = L.marker([
                    stopTime.stop.stop_lat,
                    stopTime.stop.stop_lon,
                ]).addTo(map);
                marker.bindPopup(
                    `${stopTime.stop.stop_name}<br>${stopTime.stopTime.arrival_time}<br>${stopTime.stopTime.departure_time}`
                );
            });
        }
    };

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
                            }}
                        >
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

                        <Typography sx={{ m: 1 }} variant="h4">
                            TRIPS
                        </Typography>
                        {shapes.features?.length > 0 ? map_shapes() : <p>NO HAY DATOS</p>}

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
                                            <TableCell>tripId</TableCell>
                                            <TableCell>tripHeadSign</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {trips.map((trip, index) => (
                                            <React.Fragment key={trip.id}>
                                                <TableRow
                                                    hover
                                                    onClick={() => handleTripClick(index, trip)}
                                                >
                                                    <TableCell>{trip.trip.id}</TableCell>
                                                    <TableCell>{trip.trip.tripId}</TableCell>
                                                    <TableCell>{trip.trip.tripHeadsign}</TableCell>
                                                </TableRow>

                                                {selectedTrip === index && (
                                                    <TableRow>
                                                        <TableCell colSpan={3}>
                                                            <TableContainer component={Paper}>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Stop Name</TableCell>
                                                                            <TableCell>Arrival Time</TableCell>
                                                                            <TableCell>Departure Time</TableCell>
                                                                            <TableCell>Stop Sequence</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>

                                                                    <TableBody>
                                                                        {trip.stopTimes.map((stopTime) => (
                                                                            <TableRow key={stopTime.stop.stop_name}>
                                                                                <TableCell>{stopTime.stop.stop_name}</TableCell>
                                                                                <TableCell>{stopTime.stopTime.arrival_time}</TableCell>
                                                                                <TableCell>{stopTime.stopTime.departure_time}</TableCell>
                                                                                <TableCell>{stopTime.stopTime.stop_sequence}</TableCell>
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
                        </Paper>
                    </div>
                </Container>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        </DashboardLayout >
    )
}

export default Route_Details