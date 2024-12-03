import React from "react";

import { Avatar, IconButton, Link, Typography } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar({ drawerWidth , setshawDrawer , settogglePermanent}) {
  return (
    <>
      <AppBar
        sx={{
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { xs: "0", md: `${drawerWidth}px` },
        }}
        position="static"
      >
        <Toolbar>
          <IconButton 
          onClick={() => { 
            settogglePermanent('temporary')
            setshawDrawer('block')
           }}
          sx={{ display: { xs: "block", md: "none" },mr:'9px', color:'#fff'}}>
            <MenuIcon />
          </IconButton>
          <Link
            color="inherit"
            underline="none"
            fontSize="large"
            sx={{ flexGrow: 1 }}
          >
          My Purchases
          </Link>

          <Typography mr={2} variant="body1" color="inherit">
            omair mohamed
          </Typography>

          <Avatar alt="Omair mohammed" src="./images/2.jpg" />
        </Toolbar>
      </AppBar>
    </>
  );
}
