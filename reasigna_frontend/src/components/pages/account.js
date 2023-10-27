import Head from "next/head";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../dashboard/dashboard-layout";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import ValueServices from "../../services/ValueServices";
import ReactPasswordChecklist from "react-password-checklist";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Account = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  

  const [user_, setUser_] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const updatePassword = () => {
    var user_ = {
      username: user.username,
      oldPassword: currentPassword,
      newPassword: newPassword,
    };

    AuthService.change_password(user_).then(
      (response) => {
        setOpen(false);
        navigate("/");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
      }
    );
  };

  return (
    <>
      <DashboardLayout>
        <Head>
          <title>Cuenta | Material Kit</title>
        </Head>
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Cuenta
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={user.avatar}
                        sx={{
                          height: 64,
                          mb: 2,
                          width: 64,
                        }}
                      />
                      <Typography color="textPrimary" gutterBottom variant="h5">
                        {user_.username}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {/* Iterate over user_.roles */}
                        {user_.roles &&
                          user_.roles.map((role, index) => (
                            <div key={index}>{role.name}</div>
                          ))}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  {/* <CardActions>
                    <Button color="primary" fullWidth variant="text">
                      Upload picture
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <form autoComplete="off" noValidate>
                  <Card>
                    <CardHeader
                      // subheader="The information can be edited"
                      title="Profile"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <label>Nombre</label>
                          <TextField
                            fullWidth
                            // helperText="Please specify the first name"
                            name="firstName"
                            value={user_.nombre}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <label>Apellido</label>
                          <TextField
                            fullWidth
                            name="lastName"
                            value={user_.apellido}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <label>Email</label>
                          <TextField
                            fullWidth
                            name="email"
                            required
                            value={user_.email}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <label> Último cambio de contraseña</label>
                          <TextField
                            fullWidth
                            name="phone"
                            variant="outlined"
                            value={user_.last_password_change}
                          />
                        </Grid>
                      </Grid>
                      {/* Section to update your password */}
                      <Box sx={{ mt: 3 }}>
                        <Button
                          onClick={(e) => handleClickOpen()}
                          color="primary"
                          fullWidth
                          variant="contained"
                        >
                          Actualizar contraseña
                        </Button>
                      </Box>
                    </CardContent>
                    <Divider />
                  </Card>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* Dialog update password, give current password and new password repeated */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Actualizar contraseña</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para actualizar tu contraseña, ingresa tu contraseña actual y la
              nueva contraseña dos veces.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="currentPassword"
              label="Contraseña actual"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="newPassword"
              label="Nueva contraseña"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="newPasswordRepeated"
              label="Repetir nueva contraseña"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setNewPassword2(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => setShowPassword(!showPassword)}
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
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              onChange={(e) =>
                e ? setPasswordValid(false) : setPasswordValid(true)
              }
              minLength={20}
              value={newPassword}
              valueAgain={newPassword2}
              messages={{
                minLength: "La contraseña tiene más de 20 caracteres.",
                specialChar: "La contraseña tiene caracteres especiales.",
                number: "La contraseña tiene un número.",
                capital: "La contraseña tiene una letra mayúscula.",
                match: "Las contraseñas coinciden.",
              }}
            />
            {message && ( // If there is a message, show it
              <Alert severity="error">{message}</Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={updatePassword}>Actualizar</Button>
          </DialogActions>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default Account;
