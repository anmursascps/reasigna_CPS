import Head from "next/head";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Search as SearchIcon } from "../../icons/search";

import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
  TableContainer,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import ValueServices from "../../services/ValueServices";
import { useRouter } from "next/router";
import { DashboardLayout } from "../dashboard/dashboard-layout";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import {
  Block,
  Check,
  Delete,
  Edit,
  Password,
  PasswordSharp,
  Security,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import ReactPasswordChecklist from "react-password-checklist";
import PasswordStrengthBar from "react-password-strength-bar";

const Customers = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUser, setOpenUser] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  // Usuario
  const [email_user, setEmail_user] = useState("");
  const [password_user, setPassword_user] = useState("");
  const [repeated_password_user, setRepeated_password_user] = useState("");
  const [old_password_user, setOld_password_user] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [apellido_user, setApellido_user] = useState("");
  const [nombre_user, setNombre_user] = useState("");
  const [roles_user, setRoles_user] = useState([]);

  const [passwordValid, setPasswordValid] = useState(false);

  const [message, setMessage] = useState("");

  const [editing_user, setEditing_user] = useState(false);
  const [editing_user_id, setEditing_user_id] = useState("");

  const navigate = useNavigate();

  

  const openEditUser = (e) => {
    setEditing_user_id(e.id);
    setEditing_user(true);
    setOpenUser(true);
    setEmail_user(e.email);
    setApellido_user(e.apellido);
    setNombre_user(e.nombre);
    setRoles_user(e.roles.map((item) => item.name));
  };

  const openResetPassword_ = (e) => {
    setOpenResetPassword(true);
    setEditing_user_id(e.id);
    setEditing_user(e);
  };

  const resetPassword = (e) => {
    var user = {
      username: editing_user.email,
      newPassword: password_user,
    };
    console.log(user);
    AuthService.resetPassword(user).then(
      (response) => {
        handleClose();
        ValueServices.getAllUsers().then((response) => {
          setUsers(response.data);
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  const deleteUser = (id) => {
    ValueServices.deleteUser(id)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to activate user based on the id
  const activateUser = (id) => {
    ValueServices.activateUser(id)
      .then((response) => {
        ValueServices.getAllUsers().then((response) => {
          setUsers(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to deactivate user based on the id
  const deactivateUser = (id) => {
    ValueServices.deactivateUser(id)
      .then((response) => {
        ValueServices.getAllUsers().then((response) => {
          setUsers(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createUser = (e) => {
    var user = {
      username: email_user,
      nombre: nombre_user,
      apellido: apellido_user,
      email: email_user,
      password: password_user,
      role: roles_user,
    };

    AuthService.register(user).then(
      (response) => {
        handleClose();
        ValueServices.getAllUsers().then((response) => {
          setUsers(response.data);
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  const editUser = (e) => {
    var user = {
      username: email_user,
      nombre: nombre_user,
      apellido: apellido_user,
      email: email_user,
      password: password_user,
      oldpassword: old_password_user,
      role: roles_user,
    };
    AuthService.updateUser(editing_user_id, user).then(
      (response) => {
        handleClose();
        ValueServices.getAllUsers().then((response) => {
          setUsers(response.data);
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  const handleClose = (e) => {
    setOpenUser(false);
    setEmail_user("");
    setApellido_user("");
    setNombre_user("");
    setRoles_user([]);
    setPassword_user("");
    setOld_password_user("");
    setRepeated_password_user("");
    setMessage("");
    setOpenResetPassword(false);
  };

  const openUser_ = (e) => {
    setEditing_user(false);
    setOpenUser(true);
  };

  // Cambiar filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Usuarios | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <div>
            <Box sx={{ mb: 3 }}>
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
                  Usuarios
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Button
                    onClick={(e) => openUser_(e)}
                    color="primary"
                    variant="contained"
                  >
                    Crear usuario
                  </Button>
                </Box>
              </Box>
              <Box>
                <Card>
                  <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon color="action" fontSize="small">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Buscar usuario"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Card>
              <TableContainer sx={{ minWidth: 128 }}>
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 1050 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Apellido</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Roles</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {users
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((user, index) => {
                            return (
                              // If user.activo is true the TableRow will be normal but if not it will be grey

                              <TableRow
                                key={user.id}
                                style={
                                  user.activo
                                    ? null
                                    : { backgroundColor: "#e0e0e0" }
                                }
                                hover
                              >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>{user.apellido}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                  {user.roles.map((role) => (
                                    <div key={role.name}>{role.name}</div>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={(e) => {
                                      openEditUser(user);
                                    }}
                                    color="primary"
                                    variant="contained"
                                  >
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => openResetPassword_(user)}
                                  >
                                    <Security />
                                  </IconButton>
                                  <IconButton
                                    onClick={(e) => {
                                      deleteUser(user.id);
                                    }}
                                    color="secondary"
                                    variant="contained"
                                  >
                                    <Delete />
                                  </IconButton>
                                  {/* If user.activo is true then it will show a block button but if not it will show an habilitate button */}
                                  {user.activo ? (
                                    <IconButton
                                      onClick={(e) => {
                                        deactivateUser(user.id);
                                      }}
                                      color="primary"
                                      variant="contained"
                                    >
                                      <Block />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      onClick={(e) => {
                                        activateUser(user.id);
                                      }}
                                      color="primary"
                                      variant="contained"
                                    >
                                      <Check />
                                    </IconButton>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[1, 10, 25, users.length]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </div>
        </Container>
      </Box>

      <Dialog open={openUser} onClose={handleClose}>
        <DialogTitle>
          {editing_user ? "Actualizando usuario" : "Nuevo usuario"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate onSubmit={createUser} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nombre"
                  autoFocus
                  value={nombre_user}
                  onChange={(e) => setNombre_user(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Apellido(s)"
                  value={apellido_user}
                  onChange={(e) => setApellido_user(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Nombre de usuario"
                  name="email"
                  autoComplete="email"
                  value={email_user}
                  onChange={(e) => setEmail_user(e.target.value)}
                  error={email_user.length === 0}
                  helperText={
                    email_user.length === 0
                      ? "Debes introducir un nombre de usuario"
                      : ""
                  }
                />
              </Grid>
              {/* If the editing var is true it will add an aditional grid and textfield to verify old password */}
              {editing_user ? (
                // <Grid item xs={12}>
                //   <TextField
                //     required
                //     fullWidth
                //     label="Contraseña Antigua"
                //     type={showPassword ? "text" : "password"}
                //     autoComplete="old-password"
                //     value={old_password_user}
                //     onChange={(e) => setOld_password_user(e.target.value)}
                //     error={old_password_user.length === 0}
                //     helperText={
                //       password_user.length === 0
                //         ? "Debes introducir la contraseña antigua"
                //         : ""
                //     }
                //     InputProps={{
                //       endAdornment: (
                //         <InputAdornment position="end">
                //           <IconButton
                //             onClick={(e) => setshowPassword(!showPassword)}
                //             edge="end"
                //           >
                //             {showPassword ? <VisibilityOff /> : <Visibility />}
                //           </IconButton>
                //         </InputAdornment>
                //       ),
                //     }}
                //   />
                // </Grid>
                <></>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label={editing_user ? "Nueva contraseña" : "Contraseña"}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password_user}
                      onChange={(e) => setPassword_user(e.target.value)}
                      error={
                        password_user.length === 0 || password_user.length <= 8
                      }
                      helperText={
                        password_user.length === 0 || password_user.length <= 8
                          ? "La contraseña debe tener al menos 20 caracteres"
                          : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => setshowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Repita la contraseña"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={repeated_password_user}
                      error={password_user !== repeated_password_user}
                      onChange={(e) =>
                        setRepeated_password_user(e.target.value)
                      }
                      helperText={
                        password_user !== repeated_password_user
                          ? "Las contraseñas no coinciden"
                          : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => setshowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ReactPasswordChecklist
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      onChange={(e) =>
                        e ? setPasswordValid(false) : setPasswordValid(true)
                      }
                      minLength={20}
                      value={password_user}
                      valueAgain={repeated_password_user}
                      messages={{
                        minLength: "La contraseña tiene más de 20 caracteres.",
                        specialChar:
                          "La contraseña tiene caracteres especiales.",
                        number: "La contraseña tiene un número.",
                        capital: "La contraseña tiene una letra mayúscula.",
                        match: "Las contraseñas coinciden.",
                      }}
                    />
                    <PasswordStrengthBar password={password_user} />
                  </Grid>
                </>
              )}
            </Grid>

            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={
                    roles_user.some((item) => item.name === "ROLE_ADMIN") ||
                    roles_user.includes("ROLE_ADMIN")
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (!roles_user.includes("ROLE_ADMIN")) {
                        setRoles_user([...roles_user, "ROLE_ADMIN"]);
                      }
                    } else {
                      if (roles_user.includes("ROLE_ADMIN")) {
                        setRoles_user(
                          roles_user.filter((item) => item !== "ROLE_ADMIN")
                        );
                      }
                      if (
                        roles_user.some((item) => item.name === "ROLE_ADMIN")
                      ) {
                        setRoles_user(
                          roles_user.filter(
                            (item) => item.name !== "ROLE_ADMIN"
                          )
                        );
                      }
                    }
                  }}
                  name="checkedA"
                />
              }
              label="Administrador"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    roles_user.some((item) => item.name === "ROLE_USER") ||
                    roles_user.includes("ROLE_USER")
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (!roles_user.includes("ROLE_USER")) {
                        setRoles_user([...roles_user, "ROLE_USER"]);
                      }
                    } else {
                      if (roles_user.includes("ROLE_USER")) {
                        setRoles_user(
                          roles_user.filter((item) => item !== "ROLE_USER")
                        );
                      }
                      if (
                        roles_user.some((item) => item.name === "ROLE_USER")
                      ) {
                        setRoles_user(
                          roles_user.filter((item) => item.name !== "ROLE_USER")
                        );
                      }
                    }
                  }}
                  name="checkedB"
                />
              }
              label="Usuario"
            /> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    roles_user.some((item) => item.name === "ROLE_TECNICO") ||
                    roles_user.includes("ROLE_TECNICO")
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (!roles_user.includes("ROLE_TECNICO")) {
                        setRoles_user([...roles_user, "ROLE_TECNICO"]);
                      }
                    } else {
                      if (roles_user.includes("ROLE_TECNICO")) {
                        setRoles_user(
                          roles_user.filter((item) => item !== "ROLE_TECNICO")
                        );
                      }
                      if (
                        roles_user.some((item) => item.name === "ROLE_TECNICO")
                      ) {
                        setRoles_user(
                          roles_user.filter(
                            (item) => item.name !== "ROLE_TECNICO"
                          )
                        );
                      }
                    }
                  }}
                  name="checkedB"
                />
              }
              label="Tecnico"
            />

            <Button
              disabled={editing_user ? false : passwordValid}
              onClick={editing_user ? editUser : createUser}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {editing_user ? "EDITAR USUARIO" : "CREAR USUARIO"}
            </Button>
          </Box>
          {message && <Alert severity="error">{message}</Alert>}
        </DialogContent>
      </Dialog>
      <Dialog open={openResetPassword} onClose={handleClose}>
        <DialogTitle>Reiniciar contraseña</DialogTitle>
        <DialogContent>
          {/* Two textfields to change password */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ mt: 1, mb: 1 }}
                required
                fullWidth
                label="Nueva contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password_user}
                onChange={(e) => setPassword_user(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) => setshowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ReactPasswordChecklist
                sx={{ mt: 2 }}
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                onChange={(e) =>
                  e ? setPasswordValid(false) : setPasswordValid(true)
                }
                minLength={20}
                value={password_user}
                valueAgain={repeated_password_user}
                messages={{
                  minLength: "La contraseña tiene más de 20 caracteres.",
                  specialChar: "La contraseña tiene caracteres especiales.",
                  number: "La contraseña tiene un número.",
                  capital: "La contraseña tiene una letra mayúscula.",
                  match: "Las contraseñas coinciden.",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Repetir contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={repeated_password_user}
                onChange={(e) => setRepeated_password_user(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) => setshowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button disabled={passwordValid} onClick={resetPassword}>
              Reiniciar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Customers;
