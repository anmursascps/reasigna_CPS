import Head from "next/head";
import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
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
import { DashboardLayout } from "../dashboard/dashboard-layout";
import { useEffect, useState } from "react";
import { Delete, Edit, ResetTv, RestartAlt, RestorePage, Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import asistenciaServices from "../../services/asistenciaServices";
import ValueServices from "../../services/ValueServices";

const Asistencias = () => {
    const [asistencias, setAsistencias] = useState([]);
    const { t } = useTranslation();

    // Nueva asistencia
    const [anyo, setAnyo] = useState(0);
    const [codigo, setCodigo] = useState(0);
    const [expediente, setExpediente] = useState(null);
    const [tecnico, setTecnico] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [f_alta, setF_alta] = useState("");
    const [f_recepcion, setF_recepcion] = useState("");
    const [f_cumplimentado, setF_cumplimentado] = useState("");
    const [f_limite, setF_limite] = useState("");
    const [f_entrega, setF_entrega] = useState("");
    const [calle, setCalle] = useState(null);

    // Filas unidades_asistencias
    const [rows, setRows] = useState([{ cantidad: "", unidad_obra: null }]);

    // Listas
    const [tecnicos, setTecnicos] = useState([]);
    const [expedientes, setExpedientes] = useState([]);
    const [calles, setCalles] = useState([]);
    const [unidades_obra, setUnidades_obra] = useState([]);

    const [updating, setUpdating] = useState(false);
    const [id_asistencia, setId_asistencia] = useState("");
    const [open, setOpen] = useState(false);
    const [open_cookie, setOpen_cookie] = useState(false);
    const [open_buscar, setOpenBuscar] = useState(false);
    const [buscar_fade, setBuscarFade] = useState(false);

    // Buscar vars
    const [anyo_buscar, setAnyo_buscar] = useState("");
    const [codigo_buscar, setCodigo_buscar] = useState("");
    const [expediente_buscar, setExpediente_buscar] = useState(null);
    const [tecnico_buscar, setTecnico_buscar] = useState(null);
    const [fecha_alta_1, setFecha_alta_1] = useState("");
    const [fecha_alta_2, setFecha_alta_2] = useState("");
    const [fecha_recepcion_1, setFecha_recepcion_1] = useState("");
    const [fecha_recepcion_2, setFecha_recepcion_2] = useState("");
    const [fecha_cumplimentado_1, setFecha_cumplimentado_1] = useState("");
    const [fecha_cumplimentado_2, setFecha_cumplimentado_2] = useState("");
    const [fecha_limite_1, setFecha_limite_1] = useState("");
    const [fecha_limite_2, setFecha_limite_2] = useState("");
    const [fecha_entrega_1, setFecha_entrega_1] = useState("");
    const [fecha_entrega_2, setFecha_entrega_2] = useState("");
    const [descripcion_buscar, setDescripcion_buscar] = useState("");

    // Cargar datos
    useEffect(() => {
        asistenciaServices.getAllAsistencias().then((response) => {
            console.log(response.data);
            setAsistencias(response.data);
        });

        asistenciaServices.getAllUnidadesObraVigentes().then((response) => {
            setUnidades_obra(response.data);
        });

        ValueServices.getExpedientes().then((response) => {
            setExpedientes(response.data);
        });

        ValueServices.getTecnicos().then((response) => {
            setTecnicos(response.data);
        });

        ValueServices.getCalles().then((response) => {
            setCalles(response.data);
        });


    }, []);

    const clearData = () => {
        setAnyo("")
        setCodigo("")
        setExpediente("")
        setTecnico("")
        setDescripcion("")
        setF_alta("")
        setF_recepcion("")
        setF_cumplimentado("")
        setF_limite("")
        setF_entrega("")
        setCalle("")
        setRows([{ cantidad: "", unidad_obra: null }])
        setAnyo_buscar("")
        setCodigo_buscar("")
        setExpediente_buscar(null)
        setTecnico_buscar(null)
        setFecha_alta_1("")
        setFecha_alta_2("")
        setFecha_recepcion_1("")
        setFecha_recepcion_2("")
        setFecha_cumplimentado_1("")
        setFecha_cumplimentado_2("")
        setFecha_limite_1("")
        setFecha_limite_2("")
        setFecha_entrega_1("")
        setFecha_entrega_2("")
        setDescripcion_buscar("")
        asistenciaServices.getAllAsistencias().then((response) => {
            setAsistencias(response.data);
        });


    }

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

    // Funcion para crear asistencia
    const createAsistencia = () => {
        var asistencia_unidades = rows.map((row) => {
            return {
                cantidad: row.cantidad,
                precio: row.unidad_obra.precio,
                unidadesObra: {
                    id: row.unidad_obra.id
                }
            }
        })
        var asistencia = {
            anyo: anyo,
            codigo: codigo,
            f_recepcion: f_recepcion ? f_recepcion : null,
            f_alta: f_alta ? f_alta : null,
            f_cumplimentado: f_cumplimentado ? f_cumplimentado : null,
            f_limite: f_limite ? f_limite : null,
            f_entrega: f_entrega ? f_entrega : null,
            descripcion: descripcion,
            calle: calle == null ? null : {
                id_calle: calle.id_calle
            },
            tecnico: {
                id: tecnico
            },
            expediente: expediente == null ? null : {
                id: expediente
            },
            asistenciaUnidades: asistencia_unidades
        };
        if (id_asistencia !== "") {
            asistencia.id = id_asistencia
            asistenciaServices.updateAsistencia(asistencia).then((response) => {
                handleClose();
                asistenciaServices.getAllAsistencias().then((response) => {
                    setAsistencias(response.data);
                });
            }, (error) => {
                console.log(error);
            });

        } else {
            asistenciaServices.createAsistencia(asistencia).then((response) => {
                handleClose();
                asistenciaServices.getAllAsistencias().then((response) => {
                    setAsistencias(response.data);
                });
            }, (error) => {
                console.log(error);
            });
        }
    }

    // Funcion para borrar asistencia
    const deleteAsistencia = (id) => {
        asistenciaServices.deleteAsistencia(id).then((response) => {
            setOpen_cookie(true);
            console.log(response.data);
            asistenciaServices.getAllAsistencias().then((response) => {
                console.log(response.data);
                setAsistencias(response.data);
            });
        }, (error) => {
            console.log(error);
        });
    }

    // Buscar asistencia por filtros
    const buscarAsistencia = () => {
        var asistencia = {
            anyo: anyo_buscar ? anyo_buscar : null,
            codigo: codigo_buscar ? codigo_buscar : null,
            f_recepcion_1: fecha_recepcion_1 ? fecha_recepcion_1 : null,
            f_recepcion_2: fecha_recepcion_2 ? fecha_recepcion_2 : null,
            f_alta_1: fecha_alta_1 ? fecha_alta_1 : null,
            f_alta_2: fecha_alta_2 ? fecha_alta_2 : null,
            f_cumplimentado_1: fecha_cumplimentado_1 ? fecha_cumplimentado_1 : null,
            f_cumplimentado_2: fecha_cumplimentado_2 ? fecha_cumplimentado_2 : null,
            f_limite_1: fecha_limite_1 ? fecha_limite_1 : null,
            f_limite_2: fecha_limite_2 ? fecha_limite_2 : null,
            f_entrega_1: fecha_entrega_1 ? fecha_entrega_1 : null,
            f_entrega_2: fecha_entrega_2 ? fecha_entrega_2 : null,
            descripcion: descripcion_buscar ? descripcion_buscar : null,
            tecnico: tecnico_buscar == null ? null : tecnico_buscar,
            expediente: expediente_buscar == null ? null : expediente_buscar
        };

        asistenciaServices.getAsistenciasByFilters(asistencia).then((response) => {
            console.log(response.data);
            setAsistencias(response.data);
        });


        console.log(asistencia)
    }



    // Abrir dialogo para actualizar asistencia
    const openUpdateAsistencia = (asistencia) => {
        console.log(asistencia.asistenciaUnidades)
        setId_asistencia(asistencia.id)
        setUpdating(true)
        setOpen(true);
        setAnyo(asistencia.anyo);
        setCodigo(asistencia.codigo);
        setExpediente(asistencia.expediente.id);
        setTecnico(asistencia.tecnico.id);
        setDescripcion(asistencia.descripcion);
        setF_alta(asistencia.f_alta);
        setF_recepcion(asistencia.f_recepcion);
        setF_cumplimentado(asistencia.f_cumplimentado);
        setF_limite(asistencia.f_limite);
        setF_entrega(asistencia.f_entrega);
        setCalle(asistencia.calle);

        var newRows = asistencia.asistenciaUnidades.map((asistencia_unidad) => {
            return {
                cantidad: asistencia_unidad.cantidad,
                unidad_obra: asistencia_unidad.unidadesObra
            }
        })
        console.log(newRows)

        setRows(newRows);

    }


    const openBuscar = () => {
        if (open_buscar === false) {
            setOpenBuscar(true)
            setBuscarFade(true)
        } else {
            setBuscarFade(false)
            setTimeout(() => {
                setOpenBuscar(false)
            }, 400);
        }
    }




    // Cerrar diálogo
    const handleClose = () => {
        setOpen(false);
        setUpdating(false)
        clearData();
    };


    // CSS classes for header items
    const headerItemStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#33649e",
        textAlign: "center",
    };

    // Actualizar fila
    const updateRow = (index, updatedRow) => {
        console.log(updatedRow)
        const newRows = [...rows];
        newRows[index] = updatedRow;
        console.log(newRows)
        console.log(rows)
        setRows(newRows);
    };

    // Añadir fila
    const handleAddRow = () => {
        const newRow = { cantidad: "", unidad_obra: null };
        setRows([...rows, newRow]);
    };


    // Componente crear asistencia
    const create_asistencia_component = () => {
        return (
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
                <DialogTitle>{updating ? "Actualizar asistencia" : "Nueva asistencia"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form>
                            <Grid sx={{ mt: 3 }} container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel required>Año</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="anyo"
                                        onChange={(e) => setAnyo(e.target.value)}
                                        required
                                        value={anyo}
                                        type="number"
                                        variant="outlined"
                                        inputProps={{
                                            min: 1970,
                                            max: new Date().getFullYear() + 5,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel required>Fecha alta:</InputLabel>
                                    <TextField
                                        fullWidth
                                        label=""
                                        onChange={(e) => setF_alta(e.target.value)}
                                        required
                                        value={f_alta}
                                        type="date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel required>Código:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="codigo"
                                        onChange={(e) => setCodigo(e.target.value)}
                                        required
                                        value={codigo}
                                        type="text"
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Fecha entrega::</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="f_entrega"
                                        onChange={(e) => setF_entrega(e.target.value)}
                                        required
                                        value={f_entrega}
                                        type="date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel required>
                                        Técnico:
                                    </InputLabel>
                                    <Select
                                        onChange={(e) => setTecnico(e.target.value)}
                                        fullWidth
                                        value={tecnico}
                                    >
                                        {tecnicos.map((tecnico) => (
                                            <MenuItem
                                                divider key={tecnico.id} value={tecnico.id}>
                                                {tecnico.apellido}, {tecnico.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel> Fecha recepción:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="f_recepcion"
                                        onChange={(e) => setF_recepcion(e.target.value)}
                                        required
                                        value={f_recepcion}
                                        type="date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>
                                        Expediente:
                                    </InputLabel>
                                    <Select
                                        onChange={(e) => setExpediente(e.target.value)}
                                        fullWidth
                                        value={expediente}
                                    >
                                        {expedientes.map((expediente) => (
                                            <MenuItem
                                                divider key={expediente.id} value={expediente.id}>
                                                {expediente.expediente}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Fecha límite:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="f_limite"
                                        onChange={(e) => setF_limite(e.target.value)}
                                        required
                                        value={f_limite}
                                        type="date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>
                                        Calle:
                                    </InputLabel>
                                    <Autocomplete
                                        value={calle}
                                        fullWidth
                                        onChange={(e, value) => setCalle(value)}
                                        getOptionLabel={(option) =>
                                            option.nomoficial ? option.nomoficial : ""
                                        }
                                        options={calles}
                                        renderOption={(props, option) => (
                                            <Box {...props} key={option.id}>
                                                {option.codtipovia}/ {option.nomoficial} - {option.ultnum}
                                            </Box>
                                        )}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Fecha cumplimentado:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="f_cumplimentado"
                                        onChange={(e) => setF_cumplimentado(e.target.value)}
                                        required
                                        value={f_cumplimentado}
                                        type="date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid sx={{ pb: 3 }} item xs={12} sm={12}>
                                    <InputLabel required>Descripción:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="descripcion"
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        required
                                        value={descripcion}
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={0.5} ></Grid>
                                <Grid item xs={12} sm={1} sx={headerItemStyles}>
                                    <Typography variant="h6">Cantidad</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6.5} sx={headerItemStyles}>
                                    <Typography variant="h6">Unidad de obra</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2} sx={headerItemStyles}>
                                    <Typography variant="h6">Importe</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2} sx={headerItemStyles}>
                                    <Typography variant="h6">Importe total</Typography>
                                </Grid>
                                {rows.map((row, index) => (
                                    <React.Fragment key={row}>
                                        {/* Row */}
                                        {/* Individual row cells */}
                                        <Grid item xs={12} sm={0.5}>
                                            {/* Red cross icon that is a button */}
                                            <IconButton color="secondary" variant="contained" onClick={() => { rows.splice(index, 1); setRows([...rows]) }}>
                                                <Delete />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            {/* Textfield only numbers */}
                                            <TextField
                                                fullWidth
                                                required
                                                type="number"
                                                inputProps={{
                                                    min: 1,
                                                    max: 100,
                                                }}
                                                onChange={(e) =>
                                                    updateRow(index, {
                                                        ...rows[index],
                                                        cantidad: e.target.value,
                                                    })
                                                }
                                                value={rows[index]?.cantidad || ""}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6.5}>
                                            <Autocomplete
                                                fullWidth
                                                getOptionLabel={(option) =>
                                                    option.concepto ? option.concepto : ""
                                                }
                                                onChange={(e, value) =>
                                                    updateRow(index, {
                                                        ...rows[index],
                                                        unidad_obra: value,
                                                    })
                                                }
                                                options={unidades_obra}
                                                renderOption={(props, option) => (
                                                    <Box {...props} key={option.id}>
                                                        {option.concepto}
                                                    </Box>
                                                )}
                                                renderInput={(params) => <TextField {...params} />}
                                                value={rows[index]?.unidad_obra || ""}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <TextField
                                                fullWidth
                                                name="precio"
                                                value={rows[index]?.unidad_obra?.precio ? ((rows[index]?.unidad_obra?.precio).toFixed(2) + "€") : ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            {/* Value is equal to the precio * cantidad in this row */}
                                            <TextField
                                                fullWidth
                                                name="cantidad"
                                                value={
                                                    (rows[index]?.unidad_obra?.precio * rows[index]?.cantidad)
                                                        ? ((rows[index]?.unidad_obra?.precio * rows[index]?.cantidad).toFixed(2) + "€")
                                                        : ""
                                                }
                                                disabled
                                            />


                                        </Grid>
                                    </React.Fragment>
                                ))}
                                <Grid item xs={12} sm={5}></Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button onClick={handleAddRow}>Añadir Fila</Button>

                                </Grid>
                                <Grid item xs={12} sm={2}></Grid>
                                <Grid item xs={12} sm={1}>
                                    TOTAL
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        name="total"
                                        value={(rows.reduce((acc, row) => {
                                            return (
                                                acc +
                                                (row?.unidad_obra?.precio * row?.cantidad || 0)
                                            );
                                        }, 0)).toFixed(2) + "€"}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </form>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="error"
                        variant="contained"
                    >Cancelar</Button>

                    <Button
                        // Disable if anyo, f_alta, tecnico, and descripción are empty
                        disabled={anyo === "" || f_alta === "" || tecnico === "" || descripcion === ""}
                        onClick={createAsistencia}
                        variant="contained"
                        color="success"
                    >{updating ? "Actualizar" : "Crear"}</Button>

                </DialogActions>
            </Dialog >
        );
    };


    const list_asistencias_component = () => {
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
                                <TableCell>{t("AÑO")}</TableCell>
                                <TableCell>{t("CÓDIGO")}</TableCell>
                                <TableCell>{t("EXPEDIENTE")}</TableCell>
                                <TableCell>{t("TÉCNICO")}</TableCell>
                                <TableCell>DESC</TableCell>
                                <TableCell>F. ALTA</TableCell>
                                <TableCell>F. RECEP.</TableCell>
                                <TableCell>F. CUMPLI.</TableCell>
                                <TableCell>F. LÍMITE</TableCell>
                                <TableCell>F. ENTREGA</TableCell>
                                <TableCell>TOTAL</TableCell>

                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {asistencias
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((asistencia, index) => {
                                    return (
                                        <TableRow key={asistencia?.id} tabIndex={-1} hover>
                                            <TableCell>{asistencia?.anyo}</TableCell>
                                            <TableCell>{asistencia?.codigo}</TableCell>
                                            <TableCell>{asistencia?.expediente?.id}</TableCell>
                                            <TableCell>{asistencia?.tecnico?.username}</TableCell>
                                            <TableCell>{asistencia?.descripcion}</TableCell>
                                            <TableCell>{asistencia?.f_alta}</TableCell>
                                            <TableCell>{asistencia?.f_recepcion}</TableCell>
                                            <TableCell>{asistencia?.f_cumplimentado}</TableCell>
                                            <TableCell>{asistencia?.f_limite}</TableCell>
                                            <TableCell>{asistencia?.f_entrega}</TableCell>
                                            <TableCell>
                                                {(
                                                    asistencia?.asistenciaUnidades.reduce((acc, row) => {
                                                        return acc + (row?.unidadesObra?.precio * row?.cantidad || 0);
                                                    }, 0) || 0
                                                ).toFixed(2) + "€"}
                                            </TableCell>



                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => { openUpdateAsistencia(asistencia) }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={() => deleteAsistencia(asistencia.id)}
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
                    rowsPerPageOptions={[1, 10, 25, asistencias.length]}
                    component="div"
                    count={asistencias.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        );
    };

    const buscar_asistencia_component = () => {
        return (
            <div hidden={!open_buscar}>
                <Box style={{ background: "#ffffff" }}>
                    <Collapse in={buscar_fade}>
                        <Grid sx={{ mt: 1 }} container spacing={2}>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Año:</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={anyo_buscar}
                                    onChange={(e) => setAnyo_buscar(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Fecha alta:</InputLabel>
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Desde"
                                    fullWidth
                                    type="date"
                                    value={fecha_alta_1}
                                    onChange={(e) => setFecha_alta_1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Hasta"
                                    fullWidth
                                    type="date"
                                    value={fecha_alta_2}
                                    onChange={(e) => setFecha_alta_2(e.target.value)}
                                />
                            </Grid>

                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Código:</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={codigo_buscar}
                                    onChange={(e) => setCodigo_buscar(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Fecha entrega:</InputLabel>
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Desde"
                                    fullWidth
                                    type="date"
                                    value={fecha_entrega_1}
                                    onChange={(e) => setFecha_entrega_1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Hasta"
                                    fullWidth
                                    type="date"
                                    value={fecha_entrega_2}
                                    onChange={(e) => setFecha_entrega_2(e.target.value)}
                                />
                            </Grid>

                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Técnico:</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    onChange={(e) => setTecnico_buscar(e.target.value)}
                                    fullWidth
                                    value={tecnico_buscar}
                                >
                                    {tecnicos.map((tecnico) => (
                                        <MenuItem
                                            divider key={tecnico.id} value={tecnico.id}>
                                            {tecnico.apellido}, {tecnico.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Fecha recepción:</InputLabel>
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Desde"
                                    fullWidth
                                    type="date"
                                    value={fecha_recepcion_1}
                                    onChange={(e) => setFecha_recepcion_1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Hasta"
                                    fullWidth
                                    type="date"
                                    value={fecha_recepcion_2}
                                    onChange={(e) => setFecha_recepcion_2(e.target.value)}
                                />
                            </Grid>

                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Expediente:</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    onChange={(e) => setExpediente_buscar(e.target.value)}
                                    fullWidth
                                    value={expediente_buscar}
                                >
                                    {expedientes.map((expediente) => (
                                        <MenuItem
                                            divider key={expediente.id} value={expediente.id}>
                                            {expediente.expediente}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Fecha cumplimentado:</InputLabel>
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Desde"
                                    fullWidth
                                    type="date"
                                    value={fecha_cumplimentado_1}
                                    onChange={(e) => setFecha_cumplimentado_1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Hasta"
                                    fullWidth
                                    type="date"
                                    value={fecha_cumplimentado_2}
                                    onChange={(e) => setFecha_cumplimentado_2(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={5.5}></Grid>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Fecha límite:</InputLabel>
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Desde"
                                    fullWidth
                                    type="date"
                                    value={fecha_limite_1}
                                    onChange={(e) => setFecha_limite_1(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={2.5}>
                                <TextField
                                    helperText="Hasta"
                                    fullWidth
                                    type="date"
                                    value={fecha_limite_2}
                                    onChange={(e) => setFecha_limite_2(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                justifyContent="left"
                                display="flex"
                                alignItems="center"
                                item
                                xs={1.5}
                            >
                                <InputLabel>Descripción:</InputLabel>

                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    value={descripcion_buscar}
                                    onChange={(e) => setDescripcion_buscar(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={5.5}></Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={() => buscarAsistencia()}
                                >
                                    BUSCAR
                                </Button>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Box>
            </div >
        )
    }

    return (
        <DashboardLayout>
            <Head>
                <title>Asistencias</title>
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
                                Asistencias
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Button
                                    onClick={() => setOpen(true)}
                                    color="primary"
                                    variant="contained"
                                >
                                    Crear asistencia
                                </Button>
                            </Box>
                        </Box>
                        <Paper sx={{ mb: 5, mt: 2 }} elevation={9}>
                            <Card>
                                <CardContent>
                                    <Box>
                                        <Button
                                            sx={{ mb: 1 }}
                                            variant="contained"
                                            onClick={() => openBuscar()}
                                        >
                                            <Search />
                                        </Button>
                                        <Button
                                            sx={{ mb: 1, ml: 1 }}
                                            variant="contained"
                                            onClick={() => clearData()}>
                                            <RestartAlt />
                                        </Button>
                                        <div
                                            style={{
                                                borderBottom: "2px solid grey",
                                            }}
                                        ></div>
                                        {buscar_asistencia_component()}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Paper>
                        {list_asistencias_component()}
                    </div>
                </Container>
            </Box>

            {create_asistencia_component()}
            <Snackbar
                open={open_cookie}
                autoHideDuration={6000}
                onClose={function () {
                    setOpen_cookie(false);
                }}
                message="Asistencia eliminada correctamente"
            />
        </DashboardLayout>
    );
};

export default Asistencias;
