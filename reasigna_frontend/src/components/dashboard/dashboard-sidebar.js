import React, { useEffect } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Cog as CogIcon } from "../../icons/cog";
import { User as UserIcon } from "../../icons/user";
import { Users as UsersIcon } from "../../icons/users";
import BugReportIcon from "@mui/icons-material/BugReport";
import MapIcon from "@mui/icons-material/Map";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import AuthService from "../../services/auth.service";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocation, useNavigate } from "react-router-dom";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useTranslation } from "react-i18next";

export const DashboardSidebar = (props) => {
  const { t } = useTranslation();
  const [admin, setAdmin] = React.useState(true);
  const items = [
    // {
    //   href: "/",
    //   icon: <ChartBarIcon fontSize="small" />,
    //   title: "Dashboard",
    // },
    // {
    //   href: "/customers",
    //   icon: <UsersIcon fontSize="small" />,
    //   title: <p>{t("Usuarios")}</p>,
    //   visibility: !admin,
    // },
    // {
    //   href: "/products",
    //   icon: <SummarizeIcon fontSize="small" />,
    //   title: <p>{t("Expedientes")}</p>,
    // },
    // {
    //   href: "/asistencias",
    //   icon: <SummarizeIcon fontSize="small" />,
    //   title: <p>{t("Asistencias")}</p>,
    // },
    // {
    //   href: "/account",
    //   icon: <UserIcon fontSize="small" />,
    //   title: "Cuenta",
    // },
    {
      href: "/proyectos",
      icon: <CogIcon fontSize="small" />,
      title: "Proyectos",
    },
    {
      href: "/upload",
      icon: <BugReportIcon fontSize="small" />,
      title: "Subir ficheros",
    },
    // {
    //   href: "/maps",
    //   icon: <MapIcon fontSize="small" />,
    //   title: "Mapas",
    // },
  ];
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  var navigate = useNavigate();
  const location = useLocation();

  function signout() {
    AuthService.logout();
    navigate("/login");
  }



  const content = (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <Logo sx={{ height: 42, width: 42 }} />
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            ></Box>
          </Box>
        </div>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <div hidden={item.visibility} key={item.title}>
              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
              <Divider
                sx={{ borderColor: "#2D3748", my: 1 }}
                variant="middle"
              />
            </div>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />

        <Box sx={{ px: 2, py: 3 }}>
          <Box
            sx={{
              display: "flex",
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          ></Box>

          <Button
            color="error"
            endIcon={<ExitToAppIcon />}
            fullWidth
            onClick={signout}
            variant="contained"
          >
            Signout
          </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: { backgroundColor: "neutral.900", color: "#FFFFFF", width: 280 },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { backgroundColor: "neutral.900", color: "#FFFFFF", width: 280 },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
