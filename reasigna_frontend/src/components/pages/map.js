import React, { useEffect, useRef, useState } from "react";
import ValueServices from "../../services/ValueServices";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  LayersControl,
  GeoJSON,
  MapContainer,
  TileLayer,
  FeatureGroup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import * as L from "leaflet";
import { DashboardLayout } from "../dashboard/dashboard-layout";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();

  // GEOJSON's
  const [ejes_calle, setEjes_calle] = useState("");
  const [contenidors, setContenidors] = useState(null);
  const [barrios, setBarrios] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [data, setData] = useState(null);
  const [map, setMap] = useState(null);

  // Valores desplegables
  const [tipoContenedores, setTipoContenedores] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [productor, setProductor] = useState([]);
  const [modelo, setModelo] = useState([]);

  // Valores seleccionados
  const [tiposS, setTiposS] = useState([]);
  const [empresaS, setEmpresaS] = useState("");
  const [productorS, setProductorS] = useState("");
  const [modeloS, setModeloS] = useState("");
  const [distritoS, setDistritoS] = useState("");
  const [barriosS, setBarriosS] = useState("");
  const [coddistrit, setCoddistrit] = useState(0);

  const [geojsonKey, setgeojsonKey] = useState("");

  const geojsonRef = useRef();
  const barriosRef = useRef();
  const distritosRef = useRef();
  const mkRef = useRef();
  const divMapaRef = useRef();

  var modelosAuto = [];
  for (let index = 0; index < modelo.length; index++) {
    modelosAuto.push({
      label: modelo[index],
      id: index,
    });
  }

  function onChangeDistrito(checked, event) {
    setCoddistrit(event.props.id);
    setDistritoS(event.props.value);
    setBarriosS(null);
  }

  function onChangeBarrio(checked, event) {
    setCoddistrit(event.props.id);
    setBarriosS(event.props.value);
  }

  function calles(feature, layer) {
    layer.bindPopup(
      feature.properties.codtipovia + " " + feature.properties.nomoficial
    );
  }

  function popupBarrios(feature, layer) {
    layer.bindPopup(feature.properties.nombre);
  }

  function popupDistritos(feature, layer) {
    layer.bindPopup(feature.properties.nombre);
  }

  function contenedoresPopup(feature, layer) {
    layer.bindPopup(
      feature.properties.tipo_resid.toString() +
        " - " +
        feature.properties.empresa
    );
  }

  // Filtro para mostrar los distritos que cumplan la condición seleccionada
  function filtroDistritos(feature, layer) {
    return feature.properties.nombre === distritoS;
  }

  // Filtro para mostrar los barrios que cumplan la condición seleccionada
  function filtroBarrios(feature, layer) {
    return feature.properties.ogc_fid === barriosS;
  }

  // Crear los puntos a partir de GeoJSON de contenedores
  function pointToLayer(feature, latlng) {
    return L.marker(latlng);
  }

  // Al pulsar el botón, a contenidors se le asigna data y cambia el valor de geojsonKey
  function buscar() {
    var json = {
      tipo_resid: tiposS,
      empresa: empresaS,
      productor: productorS,
      modelo: modeloS,
      distrito: coddistrit,
      barrio: barriosS,
    };

    ValueServices.getTest(json)
      .then((response) => {
        const data = JSON.parse(JSON.stringify(response.data));
        console.log(response.data);
        console.log(data);
        setContenidors(data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    divMapaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setgeojsonKey(geojsonKey + 1);
  }

  useEffect(() => {
    if (contenidors) {
      map.flyToBounds(mkRef.current.getBounds());
    }
  }, [geojsonKey]);

  useEffect(() => {
    setgeojsonKey(geojsonKey + 1);
  }, [contenidors]);


  // Filtros de búsqueda
  function selects() {
    return (
      <>
        {" "}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel>Tipo contenedor: </InputLabel>
              <Select
                multiple
                value={tiposS}
                onChange={(e) => setTiposS(e.target.value)}
              >
                {tipoContenedores.map((tipo) => (
                  <MenuItem key={tipo} divider value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel>Empresa: </InputLabel>
              <Select onChange={(e) => setEmpresaS(e.target.value)}>
                {empresa.map((tipo) => (
                  <MenuItem key={tipo} divider value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel>Productor: </InputLabel>
              <Select onChange={(e) => setProductorS(e.target.value)}>
                {productor.map((productor) => (
                  <MenuItem key={productor} divider value={productor}>
                    {productor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs>
            <FormControl fullWidth>
              <Autocomplete
                autoHighlight={false}
                options={modelosAuto}
                getOptionLabel={(option) => option.label}
                onChange={(e) => setModeloS(e.target.textContent)}
                renderInput={(params) => (
                  <TextField required {...params} label="Modelo:" />
                )}
              />
            </FormControl>
          </Grid>

          {distritos ? (
            <Grid item xs>
              <FormControl fullWidth>
                <InputLabel>Distritos </InputLabel>
                <Select onChange={onChangeDistrito}>
                  {distritos.map((distrito) => {
                    return (
                      <MenuItem
                        divider
                        id={distrito.properties.coddistrit}
                        value={distrito.properties.nombre}
                      >
                        {distrito.properties.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <></>
          )}

          {barrios.features ? (
            <Grid item xs>
              <FormControl disabled={!distritoS} fullWidth>
                <InputLabel>Barrios </InputLabel>
                <Select onChange={onChangeBarrio}>
                  {barrios.features.map((barrio) => {
                    if (
                      coddistrit === 0 ||
                      barrio.properties.coddistrit === coddistrit
                    )
                      return (
                        <MenuItem
                          divider
                          id={barrio.properties.coddistrit}
                          value={barrio.properties.ogc_fid}
                        >
                          {barrio.properties.nombre}
                        </MenuItem>
                      );
                  })}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs>
            <Button onClick={(e) => buscar()} variant="contained">
              Buscar
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  // Mapa con sus GeoJSON's
  function mapa() {
    if (!data) {
      return (
        <div ref={divMapaRef}>
          <MapContainer
            style={{ height: 600, width: "100%" }}
            className="Map"
            zoom={9}
            scrollWheelZoom={true}
            center={[39.47058066029149, -0.37831246400076907]}
            whenCreated={setMap}
          >
            <LayersControl>
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                />
              </LayersControl.BaseLayer>

              <LayersControl.Overlay name="Callesss">
                <GeoJSON
                  ref={distritosRef}
                  key={geojsonKey}
                  data={ejes_calle.features}
                  color="black"
                  weight={3}
                  onEachFeature={calles}
                />
              </LayersControl.Overlay>

              <LayersControl.BaseLayer name="OpenStreetMap FR">
                <TileLayer
                  attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              {/* CALLES */}
            </LayersControl>

            <FeatureGroup>
              {/* DISTRITOS */}
              <GeoJSON
                ref={distritosRef}
                key={geojsonKey}
                data={distritos}
                color="blue"
                fillColor="lightblue"
                onEachFeature={popupDistritos}
                filter={filtroDistritos}
              />
            </FeatureGroup>

            <FeatureGroup>
              {/* BARRIOS */}
              <GeoJSON
                ref={barriosRef}
                key={geojsonKey}
                data={barrios}
                color="red"
                fillColor="lightred"
                onEachFeature={popupBarrios}
                filter={filtroBarrios}
              />
            </FeatureGroup>

            {/* <MarkerClusterGroup ref={mkRef}>
                        {contenidors ?
                            contenidors.map(contenidor => {
                                var temp = contenidor.wkb_geometry.slice(1, -1);
                                var coords = temp.split(",");
                                return (
                                    <Marker position={[coords[1], coords[0]]} />
                                )
                            })
                            : <>
                                <Marker position={[49.8397, 24.0297]} />
                                <Marker position={[52.2297, 21.0122]} />
                                <Marker position={[51.5074, -0.0901]} />
                            </>
                        }




                    </MarkerClusterGroup> */}

            <MarkerClusterGroup ref={mkRef} options={{ maxClusterRadius: 1 }}>
              <GeoJSON
                ref={geojsonRef}
                key={geojsonKey}
                data={contenidors}
                weight={3}
                pointToLayer={pointToLayer}
                onEachFeature={contenedoresPopup}
              />
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      );
    } else {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2, mt: 2 }}
        >
          <Grid item xs>
            <CircularProgress size={90} />
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <DashboardLayout>
      <Container maxWidth={false}>
        <div>
          <Card sx={{ mb: 2, mt: 2 }}>
            <CardContent>
              <Box>{selects()}</Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <PerfectScrollbar>
              <Box>{mapa()}</Box>
            </PerfectScrollbar>
          </Card>
        </div>
      </Container>
    </DashboardLayout>
  );
};
export default Map;
