import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import gtfs_service from '../../services/gtfs_service'
import { DashboardLayout } from '../dashboard/dashboard-layout'
import Head from 'next/head'
import {
    LayersControl,
    GeoJSON,
    MapContainer,
    TileLayer,
} from "react-leaflet";
import { useTable, useSortBy } from 'react-table';
import * as L from "leaflet";

const Gtfs_Details = () => {

    let navigate = useNavigate();

    const { id } = useParams()

    const [routes, setRoutes] = useState([])
    const [agencies, setAgencies] = useState([])
    const [json, setJson] = useState([])
    const [map, setMap] = useState("");
    const [geojsonKey, setgeojsonKey] = useState("");

    const divMapaRef = useRef();

    useEffect(() => {
        gtfs_service.getGtfsById(id).then((response) => {
            setRoutes(response.data.routes)
            setAgencies(response.data.agencies)
            const data = JSON.parse(response.data.geojson)
            setJson(data)
        }, error => {
            console.log(error)
        })
    }, [])

    function rutas(feature, layer) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        layer.setStyle({ color: `#${randomColor}` });

        // Add onClick event to the layer
        layer.on('click', function (e) {
            // Create a popup with information about the feature
            const popupContent = `
                <div>
                    <h3>${feature.properties.shape_id}</h3>
                    <p>Some information about the feature</p>
                </div>
            `;
            L.popup()
                .setLatLng(e.latlng)
                .setContent(popupContent)
                .openOn(map);
        });
    }

    function map_shapes() {
        if (true) {
            const bounds = L.geoJSON(json.features).getBounds();
            return (
                <div ref={divMapaRef}>
                    <MapContainer
                        style={{ height: "50vh", width: "50%" }}
                        className="Map"
                        scrollWheelZoom={true}
                        whenCreated={setMap}
                        bounds={bounds}
                    >
                        <LayersControl>
                            <GeoJSON
                                key={geojsonKey}
                                data={json.features}
                                color="black"
                                weight={3}
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


    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'routeId',
                accessor: 'routeId',
            },
            {
                Header: 'route_short_name',
                accessor: 'route_short_name',
            },
            {
                Header: 'route_type',
                accessor: 'route_type',
            },
            {
                Header: 'agency_id',
                accessor: 'agency_id',
            },
        ],
        []
    );

    const data = useMemo(() => routes, [routes]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);



    return (
        <DashboardLayout>
            <Head>
                <title>GTFS - </title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 5 }}>
                <Container maxWidth={false}>


                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1,
                        }}
                    >
                        <Typography sx={{ m: 1 }} variant="h4">
                            GTFS - {id}
                        </Typography>
                        <Button sx={{ m: 1 }} variant="contained" onClick={() => navigate(-1)}>
                            <p>Back</p>
                        </Button>
                    </Box>
                    {json.features?.length > 0 ? map_shapes() : <p>NO HAY DATOS</p>}

                    <Typography sx={{ m: 1 }} variant="h4">
                        Rutas
                    </Typography>

                    <Paper style={{ borderRadius: '25px' }} sx={{ width: '100%', mb: 2, mt: 2 }} elevation={10}>
                        <TableContainer style={{ borderRadius: '25px' }}>
                            <Table {...getTableProps()}>
                                <TableHead>
                                    {headerGroups.map((headerGroup) => (
                                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render('Header')}
                                                    <span>
                                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                    </span>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHead>

                                <TableBody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <TableRow hover onClick={() => navigate(`/gtfs/${id}/route/${row.original.id}`)} {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                                ))}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Box>
        </DashboardLayout>
    );
}


export default Gtfs_Details