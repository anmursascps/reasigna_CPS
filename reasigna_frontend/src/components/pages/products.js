import Head from "next/head";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
// import { products } from "../../__mocks__/products";
import { DashboardLayout } from "../dashboard/dashboard-layout";
import { useEffect, useState } from "react";
import ValueServices from "../../services/ValueServices";
import { Delete, Edit, Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [tipo_asunto, setTipo_asunto] = useState([]);
  const [tipo_expediente, setTipo_expediente] = useState([]);
  const [calles, setCalles] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const { t } = useTranslation();

  const [open_cookie, setOpen_cookie] = useState(false);

  // New expediente vars
  const [fecha_entrada_1, setFecha_entrada_1] = useState(0);
  const [fecha_salida_1, setFecha_salida_1] = useState(0);
  const [tipo_expediente_selected, setTipo_expediente_selected] = useState("");
  const [tecnico_selected, setTecnico_selected] = useState("");
  const [anyo_selected, setAnyo_selected] = useState("");
  const [codigo_selected, setCodigo_selected] = useState("");
  const [expediente_selected, setExpediente_selected] = useState("");
  const [titular_selected, setTitular_selected] = useState("");
  const [tipo_asunto_selected, setTipo_asunto_selected] = useState("");
  const [calle_selected, setCalle_selected] = useState("");
  const [numero_selected, setNumero_selected] = useState("");
  const [distrito_selected, setDistrito_selected] = useState("");
  const [observaciones, setObservaciones] = useState("");

  // Update expediente
  const [expediente_id_update, setExpediente_id_update] = useState(0);
  const [fecha_entrada_1_update, setFecha_entrada_1_update] = useState(0);
  const [fecha_salida_1_update, setFecha_salida_1_update] = useState(0);
  const [tecnico_1_update, setTecnico_1_update] = useState("");
  const [fehca_entrada_2_update, setFecha_entrada_2_update] = useState(0);
  const [fecha_salida_2_update, setFecha_salida_2_update] = useState(0);
  const [tecnico_2_update, setTecnico_2_update] = useState("");
  const [fecha_entrada_3_update, setFecha_entrada_3_update] = useState(0);
  const [fecha_salida_3_update, setFecha_salida_3_update] = useState(0);
  const [tecnico_3_update, setTecnico_3_update] = useState("");
  const [fecha_entrada_4_update, setFecha_entrada_4_update] = useState(0);
  const [fecha_salida_4_update, setFecha_salida_4_update] = useState(0);
  const [tecnico_4_update, setTecnico_4_update] = useState("");
  const [fecha_entrada_5_update, setFecha_entrada_5_update] = useState(0);
  const [fecha_salida_5_update, setFecha_salida_5_update] = useState(0);
  const [tecnico_5_update, setTecnico_5_update] = useState("");
  const [anyo_update, setAnyo_upadte] = useState("");
  const [tipo_asunto_update, setTipo_asunto_update] = useState("");
  const [expediente_t_update, setExpediente_t_update] = useState("");
  const [titular_update, setTitular_update] = useState("");
  const [observaciones_update, setObservaciones_update] = useState("");
  const [tipo_expediente_selected_update, setTipo_expediente_selected_update] =
    useState("");
  const [calle_update, setCalle_update] = useState("");
  const [distrito_update, setDistrito_update] = useState("");
  const [numero_update, setNumero_update] = useState("");
  const [isCruce, setIsCruce] = useState(false);
  const [calle_2_update, setCalle_2_update] = useState(false);

  // Search vars
  const [buscar, setBuscar] = useState(false);
  const [buscar_fade, setBuscar_fade] = useState(false);
  const [fecha_entrada_inicial, setFecha_entrada_inicial] = useState(0);
  const [fecha_entrada_final, setFecha_entrada_final] = useState(0);
  const [fecha_salida_inicial, setFecha_salida_inicial] = useState(0);
  const [fecha_salida_final, setFecha_salida_final] = useState(0);
  const [tipo_expediente_buscar, setTipo_expediente_buscar] = useState("");
  const [tecnico_buscar, setTecnico_buscar] = useState("");
  const [anyo_buscar, setAnyo_buscar] = useState("");
  const [distrito_buscar, setDistrito_buscar] = useState("");
  const [codigo_buscar, setCodigo_buscar] = useState("");
  const [expediente_buscar, setExpediente_buscar] = useState("");
  const [titular_buscar, setTitular_buscar] = useState("");
  const [tipo_asunto_buscar, setTipo_asunto_buscar] = useState("");
  const [calle_buscar, setCalle_buscar] = useState("");
  const [observaciones_buscar, setObservaciones_buscar] = useState("");

  const reset_values = () => {
    setFecha_entrada_1(0);
    setFecha_salida_1(0);
    setTipo_expediente_selected("");
    setTecnico_selected("");
    setAnyo_selected("");
    setCodigo_selected("");
    setExpediente_selected("");
    setTitular_selected("");
    setTipo_asunto_selected("");
    setCalle_selected("");
    setDistrito_selected("");
    setObservaciones("");
    setNumero_selected("");
    setTipo_expediente_selected_update("");
    setFecha_entrada_1_update(0);
    setFecha_salida_1_update(0);
    setTecnico_1_update("");
    setFecha_entrada_2_update(0);
    setFecha_salida_2_update(0);
    setTecnico_2_update("");
    setFecha_entrada_3_update(0);
    setFecha_salida_3_update(0);
    setTecnico_3_update("");
    setFecha_entrada_4_update(0);
    setFecha_salida_4_update(0);
    setTecnico_4_update("");
    setFecha_entrada_5_update(0);
    setFecha_salida_5_update(0);
    setTecnico_5_update("");
    setAnyo_upadte("");
    setTipo_asunto_update("");
    setExpediente_t_update("");
    setTitular_update("");
    setObservaciones_update("");
    setCalle_update("");
    setDistrito_update("");
    setNumero_update("");
    setCalle_2_update("");
    setIsCruce(false);
  };

  var btn_enabled = false;
  // enable when values are introduced
  if (
    fecha_entrada_1 &&
    fecha_salida_1 &&
    tipo_expediente_selected &&
    tecnico_selected &&
    anyo_selected &&
    codigo_selected &&
    expediente_selected &&
    titular_selected &&
    tipo_asunto_selected &&
    calle_selected &&
    distrito_selected
  ) {
    btn_enabled = true;
  }

  const [open, setOpen] = useState(false);
  const [open_update, setOpenUpdate] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const createExpediente = () => {
    var data = {
      fecha_entrada_1: fecha_entrada_1,
      fecha_salida_1: fecha_salida_1,
      tipo_expediente: tipo_expediente_selected,
      tipo_asunto: tipo_asunto_selected,
      tecnico: tecnico_selected,
      anyo: anyo_selected,
      codigo_selected: codigo_selected,
      expediente_selected: expediente_selected,
      titular: titular_selected,
      calle_1: calle_selected.id_calle,
      distrito: distrito_selected.ogc_fid,
      observaciones: observaciones,
      numero: numero_selected,
    };
    console.log(data);
    ValueServices.createExpediente(data)
      .then((response) => {
        ValueServices.getExpedientes().then((response) => {
          setExpedientes(response.data);
        });

        console.log(response.data);
        reset_values();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteExpediente = (id) => {
    ValueServices.deleteExpediente(id)
      .then((response) => {
        // When delete open a cookie dialog
        setOpen_cookie(true);

        ValueServices.getExpedientes().then((response) => {
          setExpedientes(response.data);
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openUpdateExp = (exp) => {
    console.log(exp);
    setExpediente_id_update(exp.id);
    setFecha_entrada_1_update(exp.fecha_entrada_1);
    setFecha_salida_1_update(exp.fecha_salida_1);
    setTecnico_1_update(exp.tecnico?.id);
    setFecha_entrada_2_update(exp.fecha_entrada_2);
    setFecha_salida_2_update(exp.fecha_salida_2);
    setTecnico_2_update(exp.tecnico_2?.id);
    setFecha_entrada_3_update(exp.fecha_entrada_3);
    setFecha_salida_3_update(exp.fecha_salida_3);
    setTecnico_3_update(exp.tecnico_3?.id);
    setFecha_entrada_4_update(exp.fecha_entrada_4);
    setFecha_salida_4_update(exp.fecha_salida_4);
    setTecnico_4_update(exp.tecnico_4?.id);
    setFecha_entrada_5_update(exp.fecha_entrada_5);
    setFecha_salida_5_update(exp.fecha_salida_5);
    setTecnico_5_update(exp.tecnico_5?.id);
    setTipo_expediente_selected_update(exp.tipo_expediente.id);
    setAnyo_upadte(exp.anyo);
    setTitular_update(exp.titular);
    setTipo_asunto_update(exp.tipo_asunto.id);
    setExpediente_t_update(exp.expediente);
    setObservaciones_update(exp.observaciones);
    setCalle_2_update(exp.calle_2);
    setCalle_update(exp.calle_1);
    setDistrito_update(exp.distrito);
    setIsCruce(exp.es_cruce);
    setNumero_update(exp.numero);

    setOpenUpdate(true);
  };

  const updateExpediente = (id) => {
    var data = {
      fecha_entrada_1: fecha_entrada_1_update,
      fecha_salida_1: fecha_salida_1_update,
      tecnico_1: tecnico_1_update,
      fecha_entrada_2: fehca_entrada_2_update,
      fecha_salida_2: fecha_salida_2_update,
      tecnico_2: tecnico_2_update,
      fecha_entrada_3: fecha_entrada_3_update,
      fecha_salida_3: fecha_salida_3_update,
      tecnico_3: tecnico_3_update,
      fecha_entrada_4: fecha_entrada_4_update,
      fecha_salida_4: fecha_salida_4_update,
      tecnico_4: tecnico_4_update,
      fecha_entrada_5: fecha_entrada_5_update,
      fecha_salida_5: fecha_salida_5_update,
      tecnico_5: tecnico_5_update,
      tipo_expediente: tipo_expediente_selected_update,
      anyo: anyo_update,
      titular: titular_update,
      tipo_asunto: tipo_asunto_update,
      expediente: expediente_t_update,
      observaciones: observaciones_update,
      calle_1: calle_update?.id_calle,
      calle_2_update: calle_2_update?.id_calle,
      distrito: distrito_update?.ogc_fid,
      isCruce: isCruce,
      numero: numero_update,
    };
    ValueServices.updateExpediente(expediente_id_update, data)
      .then((response) => {
        setOpenUpdate(false);
        setOpen_cookie(true);
        ValueServices.getExpedientes().then((response) => {
          setExpedientes(response.data);
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getExpedientesByFilter = () => {
    var buscar = {
      fecha_entrada_inicial: fecha_entrada_inicial,
      fecha_entrada_final: fecha_entrada_final,
      fecha_salida_inicial: fecha_salida_inicial,
      fecha_salida_final: fecha_salida_final,
      tipo_expediente_buscar: tipo_expediente_buscar,
      tecnico_buscar: tecnico_buscar,
      anyo_buscar: anyo_buscar,
      distrito_buscar: distrito_buscar.ogc_fid,
      codigo_buscar: codigo_buscar,
      expediente_buscar: expediente_buscar,
      titular_buscar: titular_buscar,
      tipo_asunto_buscar: tipo_asunto_buscar,
      calle_buscar: calle_buscar?.id_calle,
      observaciones_buscar: observaciones_buscar,
    };
    ValueServices.getExpedienteByFilters(buscar).then((response) => {
      setBuscar_fade(false);
      // setTimeout(() => {
      //   setBuscar(false);
      // }, 500);
      setExpedientes(response.data);
    });
  };

  const buscarOpen = () => {
    if (buscar === false) {
      setBuscar(true);
      setBuscar_fade(true);
    } else {
      setBuscar_fade(false);
      setTimeout(() => {
        setBuscar(false);
      }, 400);
    }
  };

  const handleClose = () => {
    reset_values();
    setOpen(false);
    setOpenUpdate(false);
  };

  useEffect(() => {
    ValueServices.getAllDistritos().then((response) => {
      setDistritos(response.data);
    });
    ValueServices.getExpedientes().then((response) => {
      setExpedientes(response.data);
    });
    ValueServices.getTecnicos().then((response) => {
      setTecnicos(response.data);
    });

    ValueServices.getTipoAsunto().then((response) => {
      setTipo_asunto(response.data);
    });

    ValueServices.getTipoExpediente().then((response) => {
      setTipo_expediente(response.data);
    });

    ValueServices.getCalles().then((response) => {
      setCalles(response.data);
    });
  }, []);

  // Cambiar filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const dialog_update_expediente = () => {
    return (
      // Dialog form to update expediente, it has three rows and 6 columns, do it pretty
      <Dialog
        maxWidth="xl"
        fullWidth
        open={open_update}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Actualizar expediente</DialogTitle>
        <DialogContent>
          <Grid sx={{ pt: 1 }} container spacing={3}>
            <Grid
              justifyContent="left"
              item
              display="flex"
              alignItems="center"
              xs={1}
            >
              <InputLabel>Fecha entrada:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={(e) => setFecha_entrada_1_update(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(1)</InputAdornment>
                  ),
                }}
                type="date"
                value={fecha_entrada_1_update}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_entrada_2_update(e.target.value)}
                fullWidth
                value={fehca_entrada_2_update}
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(2)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_entrada_3_update(e.target.value)}
                fullWidth
                type="date"
                value={fecha_entrada_3_update}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(3)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_entrada_4_update(e.target.value)}
                type="date"
                fullWidth
                value={fecha_entrada_4_update}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(4)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_entrada_5_update(e.target.value)}
                type="date"
                fullWidth
                value={fecha_entrada_5_update}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(5)</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Fecha salida:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={(e) => setFecha_salida_1_update(e.target.value)}
                fullWidth
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(1)</InputAdornment>
                  ),
                }}
                value={fecha_salida_1_update}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_salida_2_update(e.target.value)}
                fullWidth
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(2)</InputAdornment>
                  ),
                }}
                value={fecha_salida_2_update}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_salida_3_update(e.target.value)}
                fullWidth
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(3)</InputAdornment>
                  ),
                }}
                value={fecha_salida_3_update}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_salida_4_update(e.target.value)}
                fullWidth
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(4)</InputAdornment>
                  ),
                }}
                value={fecha_salida_4_update}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setFecha_salida_5_update(e.target.value)}
                fullWidth
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(5)</InputAdornment>
                  ),
                }}
                value={fecha_salida_5_update}
              />
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Técnico:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Técnico 1</InputLabel>
              <Select
                error={tecnico_1_update === ""}
                onChange={(e) => setTecnico_1_update(e.target.value)}
                fullWidth
                value={tecnico_1_update}
              >
                {tecnicos.map((tecnico) => (
                  <MenuItem divider key={tecnico.id} value={tecnico.id}>
                    {tecnico.apellido}, {tecnico.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <InputLabel>Técnico 2</InputLabel>
              <Select
                onChange={(e) => setTecnico_2_update(e.target.value)}
                fullWidth
                value={tecnico_2_update}
              >
                {tecnicos.map((tecnico) => (
                  <MenuItem divider key={tecnico.id} value={tecnico.id}>
                    {tecnico.apellido}, {tecnico.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <InputLabel>Técnico 3</InputLabel>
              <Select
                onChange={(e) => setTecnico_3_update(e.target.value)}
                fullWidth
                value={tecnico_3_update}
              >
                {tecnicos.map((tecnico) => (
                  <MenuItem divider key={tecnico.id} value={tecnico.id}>
                    {tecnico.apellido}, {tecnico.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <InputLabel>Técnico 4</InputLabel>
              <Select
                onChange={(e) => setTecnico_4_update(e.target.value)}
                fullWidth
                value={tecnico_4_update}
              >
                {tecnicos.map((tecnico) => (
                  <MenuItem divider key={tecnico.id} value={tecnico.id}>
                    {tecnico.apellido}, {tecnico.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <InputLabel>Técnico 5</InputLabel>
              <Select
                onChange={(e) => setTecnico_5_update(e.target.value)}
                fullWidth
                value={tecnico_5_update}
              >
                {tecnicos.map((tecnico) => (
                  <MenuItem divider key={tecnico.id} value={tecnico.id}>
                    {tecnico.apellido}, {tecnico.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid sx={{ pt: 2 }} container spacing={3}>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Tipo Expediente:</InputLabel>
            </Grid>

            <Grid item xs={3}>
              <Select
                onChange={(e) =>
                  setTipo_expediente_selected_update(e.target.value)
                }
                fullWidth
                value={tipo_expediente_selected_update}
              >
                {tipo_expediente.map((tipo_expediente) => (
                  <MenuItem
                    divider
                    key={tipo_expediente.id}
                    value={tipo_expediente.id}
                  >
                    {tipo_expediente.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Titular:</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                value={titular_update}
                onChange={(e) => setTitular_update(e.target.value)}
              />
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Año:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Select
                error={anyo_update === ""}
                onChange={(e) => setAnyo_upadte(e.target.value)}
                fullWidth
                value={anyo_update}
              >
                {Array.from(
                  { length: new Date().getFullYear() - 1950 },
                  (_, index) => index + 1970
                ).map((anyo) => (
                  <MenuItem divider key={anyo} value={anyo}>
                    {anyo}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Asunto:</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <Select
                error={tipo_asunto_update === ""}
                onChange={function (e) {
                  console.log(tipo_asunto_update);
                  console.log(e.target.value);
                  setTipo_asunto_update(e.target.value);
                }}
                fullWidth
                value={tipo_asunto_update}
              >
                {tipo_asunto.map((tipo_asunto) => (
                  <MenuItem divider key={tipo_asunto.id} value={tipo_asunto.id}>
                    {tipo_asunto.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Expediente:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                value={expediente_t_update}
                onChange={(e) => setExpediente_t_update(e.target.value)}
              />
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Observaciones:</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <TextField
                onBlur={(e) => setObservaciones_update(e.target.value)}
                fullWidth
                value={observaciones_update}
                onChange={(e) => setObservaciones_update(e.target.value)}
              />
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Vía:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                value={calle_update}
                onChange={(e, value) => setCalle_update(value)}
                getOptionLabel={(option) =>
                  option.nomoficial ? option.nomoficial : ""
                }
                options={calles}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.codtipovia}/ {option.nomoficial} - {option.ultnum}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid justifyContent={"right"} item xs={1}>
              <InputLabel>Distrito:</InputLabel>
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                value={distrito_update}
                onChange={(e, value) => setDistrito_update(value)}
                getOptionLabel={(option) =>
                  option.nombre ? option.nombre : ""
                }
                options={distritos}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.ogc_fid}>
                    {option.nombre}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <Checkbox
                checked={isCruce}
                sx={{ ml: -3 }}
                onClick={(e) => setIsCruce(!isCruce)}
              />
              <InputLabel>Es cruce con:</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                disabled={!isCruce}
                fullWidth
                id="combo-box-demo"
                value={calle_2_update}
                onChange={(e, value) => setCalle_2_update(value)}
                getOptionLabel={(option) =>
                  option.nomoficial ? option.nomoficial : ""
                }
                options={calles}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.codtipovia}/ {option.nomoficial} - {option.ultnum}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid
              justifyContent="left"
              display="flex"
              alignItems="center"
              item
              xs={1}
            >
              <InputLabel>Número:</InputLabel>
            </Grid>
            <Grid item xs={1}>
              <TextField
                disabled={isCruce}
                type="number"
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: calle_update.ultnum,
                  },
                }}
                helperText={!isCruce ? "Fill number" : ""}
                fullWidth
                value={numero_update}
                onChange={(e) => setNumero_update(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={(e) => updateExpediente()}
            color="primary"
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const CreateExpedienteComponent = () => {
    return (
      <Dialog onClose={handleClose} fullWidth maxWidth="lg" open={open}>
        <DialogTitle>Nuevo expediente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form>
              <Grid sx={{ mt: 1 }} container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    focused={true}
                    type="date"
                    fullWidth
                    label="Fecha entrada"
                    name="fecha_entrada_1"
                    required
                    variant="outlined"
                    value={fecha_entrada_1}
                    onChange={(e) => setFecha_entrada_1(e.target.value)}
                    error={fecha_entrada_1 === 0}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    focused={true}
                    type="date"
                    fullWidth
                    label="Fecha salida"
                    name="fecha_salida_1"
                    required
                    variant="outlined"
                    value={fecha_salida_1}
                    onChange={(e) => setFecha_salida_1(e.target.value)}
                    error={fecha_salida_1 === 0}
                  />
                </Grid>

                <Grid fullWidth item xs={12} md={6}>
                  <InputLabel required error={tipo_expediente_selected === ""}>
                    Tipo expediente:
                  </InputLabel>
                  <Select
                    onChange={(e) =>
                      setTipo_expediente_selected(e.target.value)
                    }
                    fullWidth
                    value={tipo_expediente_selected}
                    error={tipo_expediente_selected === ""}
                  >
                    {tipo_expediente.map((tipo_expediente) => (
                      <MenuItem
                        divider
                        key={tipo_expediente.id}
                        value={tipo_expediente.id}
                      >
                        {tipo_expediente.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid fullWidth item xs={12} md={6}>
                  <InputLabel required error={tecnico_selected === ""}>
                    Técnico:
                  </InputLabel>
                  <Select
                    error={tecnico_selected === ""}
                    onChange={(e) => setTecnico_selected(e.target.value)}
                    fullWidth
                    value={tecnico_selected}
                  >
                    {tecnicos.map((tecnico) => (
                      <MenuItem divider key={tecnico.id} value={tecnico.id}>
                        {tecnico.apellido}, {tecnico.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid fullWidth item xs={12} md={6}>
                  <InputLabel required error={anyo_selected === ""}>
                    Año:
                  </InputLabel>
                  <Select
                    error={anyo_selected === ""}
                    onChange={(e) => setAnyo_selected(e.target.value)}
                    fullWidth
                    value={anyo_selected}
                  >
                    {Array.from(
                      { length: new Date().getFullYear() - 1950 },
                      (_, index) => index + 1970
                    ).map((anyo) => (
                      <MenuItem divider key={anyo} value={anyo}>
                        {anyo}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel error={codigo_selected === ""}>
                    Código:
                  </InputLabel>
                  <TextField
                    error={codigo_selected === ""}
                    fullWidth
                    name="codigo"
                    required
                    value={codigo_selected}
                    type="number"
                    variant="outlined"
                    onChange={(e) => setCodigo_selected(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* Textfield  expediente */}
                  <TextField
                    error={expediente_selected === ""}
                    fullWidth
                    label="Expediente"
                    name="expediente"
                    type="tel"
                    required
                    variant="outlined"
                    value={expediente_selected}
                    onChange={(e) => setExpediente_selected(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={titular_selected === ""}
                    fullWidth
                    label="Titular"
                    name="titular"
                    type="text"
                    required
                    variant="outlined"
                    value={titular_selected}
                    onChange={(e) => setTitular_selected(e.target.value)}
                  />
                </Grid>
                <Grid fullWidth item xs={12} md={6}>
                  <InputLabel required error={tipo_asunto_selected === ""}>
                    Tipo asunto:
                  </InputLabel>
                  <Select
                    error={tipo_asunto_selected === ""}
                    onChange={(e) => setTipo_asunto_selected(e.target.value)}
                    fullWidth
                    value={tipo_asunto_selected}
                  >
                    {tipo_asunto.map((tipo_asunto) => (
                      <MenuItem
                        divider
                        key={tipo_asunto.id}
                        value={tipo_asunto.id}
                      >
                        {tipo_asunto.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} md={5}>
                  <InputLabel error={calle_selected === ""} required>
                    Calle:
                  </InputLabel>
                  <Autocomplete
                    error={calle_selected === ""}
                    fullWidth
                    id="combo-box-demo"
                    value={calle_selected}
                    onChange={(e, value) => setCalle_selected(value)}
                    getOptionLabel={(option) =>
                      option.nomoficial ? option.nomoficial : ""
                    }
                    options={calles}
                    renderOption={(props, option) => (
                      <Box component="li" {...props} key={option.id}>
                        {option.codtipovia}/ {option.nomoficial} -{" "}
                        {option.ultnum}
                      </Box>
                    )}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                {calle_selected !== "" ? (
                  <Grid item xs={12} md={1}>
                    <InputLabel error={numero_selected === ""} required>
                      Numero:
                    </InputLabel>
                    <TextField
                      error={numero_selected === ""}
                      fullWidth
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: Math.max(1, calle_selected.ultnum),
                          max: calle_selected.ultnum,
                        },
                      }}
                      required
                      variant="outlined"
                      value={numero_selected}
                      onChange={(e) => setNumero_selected(e.target.value)}
                    />
                  </Grid>
                ) : (
                  ""
                )}

                <Grid item xs={12} md={6}>
                  <InputLabel required error={distrito_selected === ""}>
                    Distrito:
                  </InputLabel>
                  <Autocomplete
                    error={distrito_selected === ""}
                    fullWidth
                    value={distrito_selected}
                    onChange={(e, value) => setDistrito_selected(value)}
                    getOptionLabel={(option) =>
                      option.nombre ? option.nombre : ""
                    }
                    options={distritos}
                    renderOption={(props, option) => (
                      <Box component="li" {...props} key={option.ogc_fid}>
                        {option.nombre}
                      </Box>
                    )}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    multiline
                    fullWidth
                    label="Observaciones"
                    name="observaciones"
                    required
                    variant="outlined"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!btn_enabled}
            onClick={(e) => createExpediente(e)}
            color="primary"
            variant="contained"
          >
            Crear
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const buscar_expediente_component = () => {
    return (
      <div hidden={!buscar}>
        <Box style={{ background: "#ffffff" }}>
          <Collapse in={buscar_fade}>
            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Fecha entrada:</InputLabel>
              </Grid>
              <Grid item xs={2.5}>
                <TextField
                  helperText="Desde"
                  fullWidth
                  type="date"
                  value={fecha_entrada_inicial}
                  onChange={(e) => setFecha_entrada_inicial(e.target.value)}
                />
              </Grid>

              <Grid item xs={2.5}>
                <TextField
                  helperText="Hasta"
                  fullWidth
                  type="date"
                  value={fecha_entrada_final}
                  onChange={(e) => setFecha_entrada_final(e.target.value)}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Fecha salida:</InputLabel>
              </Grid>
              <Grid item xs={2.5}>
                <TextField
                  helperText="Desde"
                  fullWidth
                  type="date"
                  value={fecha_salida_inicial}
                  onChange={(e) => setFecha_salida_inicial(e.target.value)}
                />
              </Grid>

              <Grid item xs={2.5}>
                <TextField
                  helperText="Hasta"
                  fullWidth
                  type="date"
                  value={fecha_salida_final}
                  onChange={(e) => setFecha_salida_final(e.target.value)}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Tipo expediente:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <Select
                  error={tipo_expediente === ""}
                  onChange={function (e) {
                    setTipo_expediente_buscar(e.target.value);
                  }}
                  fullWidth
                  value={tipo_expediente_buscar}
                >
                  <MenuItem value={""}>Todos</MenuItem>
                  {tipo_expediente.map((tipo_expediente) => (
                    <MenuItem
                      key={tipo_expediente.id}
                      value={tipo_expediente.id}
                    >
                      {tipo_expediente.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Titular:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  value={titular_buscar}
                  onChange={(e) => setTitular_buscar(e.target.value)}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Técnico:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <Select
                  onChange={function (e) {
                    setTecnico_buscar(e.target.value);
                  }}
                  fullWidth
                  value={tecnico_buscar}
                >
                  <MenuItem value={""}>Todos</MenuItem>
                  {tecnicos.map((tecnico) => (
                    <MenuItem key={tecnico.id} value={tecnico.id}>
                      {tecnico.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Asunto:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <Select
                  fullWidth
                  value={tipo_asunto_buscar}
                  onChange={function (e) {
                    setTipo_asunto_buscar(e.target.value);
                  }}
                >
                  <MenuItem value={""}>Todos</MenuItem>
                  {tipo_asunto.map((asunto) => (
                    <MenuItem key={asunto.id} value={asunto.id}>
                      {asunto.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Año:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <Select
                  fullWidth
                  value={anyo_buscar}
                  onChange={function (e) {
                    setAnyo_buscar(e.target.value);
                  }}
                >
                  <MenuItem value={""}>Todos</MenuItem>
                  {Array.from(
                    { length: new Date().getFullYear() - 1950 },
                    (_, index) => index + 1970
                  ).map((anyo) => (
                    <MenuItem divider key={anyo} value={anyo}>
                      {anyo}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Vía:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                  fullWidth
                  id="combo-box-demo"
                  value={calle_buscar}
                  onChange={(e, value) => setCalle_buscar(value)}
                  getOptionLabel={(option) => option.nomoficial || ""}
                  options={calles}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.id}>
                      {option.codtipovia}/ {option.nomoficial} - {option.ultnum}
                    </Box>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Distrito:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                  fullWidth
                  value={distrito_buscar}
                  onChange={(e, value) => setDistrito_buscar(value)}
                  getOptionLabel={(option) => option.nombre || ""}
                  options={distritos}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.ogc_fid}>
                      {option.nombre}
                    </Box>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Observaciones:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  value={observaciones_buscar}
                  onChange={(e) => setObservaciones_buscar(e.target.value)}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Codigo:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  value={codigo_buscar}
                  onChange={(e) => setCodigo_buscar(e.target.value)}
                />
              </Grid>
              <Grid
                justifyContent="left"
                display="flex"
                alignItems="center"
                item
                xs={1}
              >
                <InputLabel>Expediente:</InputLabel>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  value={expediente_buscar}
                  onChange={(e) => setExpediente_buscar(e.target.value)}
                />
              </Grid>
              <Grid item xs={5.5}></Grid>
              <Grid item>
                <Button
                  onClick={() => getExpedientesByFilter()}
                  variant="contained"
                >
                  BUSCAR
                </Button>
              </Grid>
              <Grid item xs={5.5}></Grid>
            </Grid>
          </Collapse>
        </Box>
      </div>
    );
  };

  const list_expedientes_component = () => {
    return (
      <Paper
        style={{ borderRadius: "25px" }}
        sx={{ width: "100%", mb: 2 }}
        elevation={10}
      >
        <TableContainer sx={{ minWidth: 128 }} style={{ borderRadius: "25px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("tipo")}</TableCell>
                <TableCell>{t("AÑO")}</TableCell>
                <TableCell>{t("CÓDIGO")}</TableCell>
                <TableCell>{t("EXPEDIENTE")}</TableCell>
                <TableCell>{t("TITULAR")}</TableCell>
                <TableCell>{t("ASUNTO")}</TableCell>
                <TableCell>{t("FENTRADA")}</TableCell>
                <TableCell>{t("TÉCNICO")}</TableCell>
                <TableCell>{t("FSALIDA")}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {expedientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((expediente, index) => {
                  return (
                    <TableRow key={expediente.id} tabIndex={-1} hover>
                      <TableCell>{expediente.tipo_expediente.nombre}</TableCell>
                      <TableCell>{expediente.anyo}</TableCell>
                      <TableCell>{expediente.codigo}</TableCell>
                      <TableCell>{expediente.expediente}</TableCell>
                      <TableCell>{expediente.titular}</TableCell>
                      <TableCell>{expediente.tipo_asunto.nombre}</TableCell>
                      <TableCell>{expediente.fecha_entrada_1}</TableCell>
                      <TableCell>{expediente.tecnico.username}</TableCell>
                      <TableCell>{expediente.fecha_salida_1}</TableCell>

                      <TableCell>
                        <IconButton
                          onClick={(e) => openUpdateExp(expediente)}
                          color="primary"
                          variant="contained"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={function () {
                            deleteExpediente(expediente.id);
                          }}
                          color="secondary"
                          variant="contained"
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
          rowsPerPageOptions={[1, 10, 25, expedientes.length]}
          component="div"
          count={expedientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Expedientes</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth={false}>
          <div>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                Expedientes
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  onClick={function () {
                    setOpen(true);
                  }}
                  color="primary"
                  variant="contained"
                >
                  Crear expedientes
                </Button>
              </Box>
            </Box>
            <Paper sx={{ mb: 5, mt: 2 }} elevation={9}>
              <Card>
                <CardContent>
                  <Box>
                    <Button
                      sx={{ mb: 1 }}
                      onClick={(e) => buscarOpen()}
                      variant="contained"
                    >
                      <Search />
                    </Button>
                    <div
                      style={{
                        borderBottom: "2px solid grey",
                      }}
                    ></div>
                    {buscar_expediente_component()}
                  </Box>
                </CardContent>
              </Card>
            </Paper>
            {list_expedientes_component()}
          </div>
        </Container>
      </Box>
      {CreateExpedienteComponent()}

      <Snackbar
        open={open_cookie}
        autoHideDuration={6000}
        onClose={function () {
          setOpen_cookie(false);
        }}
        message="Expediente eliminado correctamente"
      />

      {dialog_update_expediente()}
    </DashboardLayout>
  );
};

export default Products;
