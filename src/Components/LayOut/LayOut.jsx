import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Draweer from "../Draweer/Draweer";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

export default function LayOut() {
  const [myMode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode")
  );
  const [shawDrawer, setshawDrawer] = useState("none");
  const [togglepermanent, settogglePermanent] = useState("permanent");

  const darkTheme = createTheme({
    palette: {
      mode: myMode,
    },
  });

  const drawerWidth = 240;

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <NavBar
        {...{drawerWidth, setshawDrawer, settogglePermanent}}
        />
        <Draweer
        {...{drawerWidth, setmyMode, myMode, shawDrawer, togglepermanent, setshawDrawer, settogglePermanent}}
        />

        <Box
          sx={{
            marginLeft: { xs: "0", md: `${drawerWidth}px` },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "30px",
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          }}
          component={'main'}
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}
