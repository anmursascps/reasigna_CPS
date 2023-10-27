import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from "react-i18next";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <DashboardNavbarRoot
        sx={{ left: { lg: 280 }, width: { lg: "calc(100% - 280px)" } }}
        {...other}
      >
        <Toolbar disableGutters sx={{ minHeight: 64, left: 0, px: 2 }}>
          <IconButton
            onClick={onSidebarOpen}
            sx={{ display: { xs: "inline-flex", lg: "none" } }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              {/* <SearchIcon fontSize="small" /> */}
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              {/* <UsersIcon fontSize="small" /> */}
            </IconButton>
          </Tooltip>
          {/* <Tooltip> */}
            <IconButton >
              {/* <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge> */}
              {/* <LanguageSelector /> */}
            </IconButton>
          {/* </Tooltip> */}

          {/* <Button
            sx={{ m: 1 }}
            variant="contained"
            onClick={function () {
              AuthService.logout();
              navigate("/login");
            }}
          >
            <p>{t("Logout")}</p>
          </Button> */}
          <Typography sx={{ ml: 4 }} style={{ color: "black" }}>
            <strong>{user ? user.username : ""}</strong>
          </Typography>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src={process.env.PUBLIC_URL + "/static/images/avatars/avatar_1.png"}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
