// React component with 3 input fields, one for username, one for old password, and one for new password.
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Head from "next/head";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthService from "../../services/auth.service";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReactPasswordChecklist from "react-password-checklist";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  let navigate = useNavigate();

  const change_password = (user) => {
    var user_ = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    AuthService.change_password(user_).then(
      (response) => {
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
        setUsername("");
        setOldPassword("");
        setNewPassword("");
      }
    );
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Button
            onClick={(e) => navigate("/")}
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
          >
            Dashboard
          </Button>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Cambiar contraseña
            </Typography>
            {/* Subtitle  */}
            <Typography color="textSecondary" gutterBottom variant="body2">
              Su contraseña ha expirado, por favor proporcione una nueva
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Nombre de usuario"
            margin="normal"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="currentPassword"
            label="Contraseña actual"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setOldPassword(e.target.value)}
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
          <Box sx={{ py: 2 }}>
            <Button
              disabled={
                // If any of the fields is empty, or the passwords don't match, or the password is not valid, disable the button
                !username ||
                !oldPassword ||
                !newPassword ||
                !newPassword2 ||
                newPassword !== newPassword2 ||
                passwordValid
              }
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              onClick={() =>
                change_password({ username, oldPassword, newPassword })
              }
            >
              Cambiar contraseña
            </Button>
          </Box>
          {message && <Alert severity="error">{message}</Alert>}
        </Container>
      </Box>
    </>
  );
};
export default ChangePassword;
