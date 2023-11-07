import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Backdrop, Box, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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

    const { g_id } = useParams()
    const { p_id } = useParams()

    const [routes, setRoutes] = useState([])
    const [agencies, setAgencies] = useState([])
    const [json, setJson] = useState([])
    const [map, setMap] = useState("");
    const [geojsonKey, setgeojsonKey] = useState("");
    const [loading, setLoading] = useState(true);

    const divMapaRef = useRef();

    useEffect(() => {
        gtfs_service.getGtfsById(g_id).then((response) => {
            setLoading(false)
            setRoutes(response.data.routes)
            setAgencies(response.data.agencies)
            const data = JSON.parse(response.data.geojson)
            setJson(data)
        }, error => {
            console.log(error)
        })
    }, [])

    function rutas(feature, layer) {
        // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // layer.setStyle({ color: `#${randomColor}` });
        console.log(feature)

        // Add onClick event to the layer
        layer.bindPopup(feature.properties.id + " - " + feature.properties.shape_id)
        layer.bindPopup(feature.properties.trips.map((trip) => {
            return trip
        }).join("<br>"))


    }

    function map_shapes() {
        if (true) {
            const bounds = L.geoJSON(json.features).getBounds();
            return (
                <div ref={divMapaRef}>
                    <MapContainer
                        style={{ height: "100vh", width: "100%" }}
                        className="Map"
                        scrollWheelZoom={true}
                        whenCreated={setMap}
                        bounds={bounds}
                    >
                        <LayersControl>
                            <GeoJSON
                                key={geojsonKey}
                                data={json.features}
                                color="red"
                                weight={5}
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


    const getRouteType = (type) => {
        switch (type) {
            case "0":
                return 'Tram';
            case "1":
                return 'Subway';
            case "2":
                return 'Rail';
            case "3":
                return 'Bus';
            case "4":
                return 'Ferry';
            case "5":
                return 'Cable car';
            case "6":
                return 'Gondola';
            case "7":
                return 'Funicular';
            case "11":
                return 'Trolleybus';
            case "12":
                return 'Monorail';
            default:
                return '';
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'route_short_name',
                accessor: 'route_short_name',
            },
            {
                Header: 'route_type',
                accessor: 'route_type',
                Cell: ({ value }) => getRouteType(value),
            },
            {
                Header: 'agency_id',
                accessor: 'agency.agency_name',
            },
            {
                Header: 'agency_url',
                accessor: 'agency.agency_url',
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
                            GTFS - {g_id}
                        </Typography>
                        <Button sx={{ m: 1 }} variant="contained" onClick={() => navigate(`/proyectos/${p_id}/`)}>
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
                                                        {column.isSorted ? (column.isSortedDesc ? '\n   🔽' : '   🔼') : ''}
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
                                            <TableRow hover onClick={() => navigate(`/gtfs/${g_id}/route/${row.original.id}`)} {...row.getRowProps()}>
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </DashboardLayout>
    );
}


export default Gtfs_Details