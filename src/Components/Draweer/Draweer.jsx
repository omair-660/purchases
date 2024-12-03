import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import { yellow } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

export default function Draweer({ drawerWidth, setmyMode, myMode,setshawDrawer, shawDrawer ,togglepermanent,settogglePermanent}) {
  let navegate = useNavigate();
  function toggleMode() {
    myMode === "light" ? setmyMode("dark") : setmyMode("light");
    localStorage.setItem("currentMode", myMode === "light" ? "dark" : "light");
  }
  let loaction = useLocation();

  const  myList = [
    {path : '/', text: "Home", icon: <HomeIcon/>},
    {path : '/create', text: "create", icon: <CreateIcon/>},
    {path : '/profile', text: "profile", icon: <AccountCircleIcon/>},
    {path : '/settings', text: "settings", icon: <SettingsIcon/>}
  ]
  const handleLogout = () => {
   
    window.location.replace('about:blank'); 
  };

  return (
    <>
      <Drawer
      component={'nav'}
        sx={{
          display: {xs : shawDrawer , md: "block"},
          width: `${drawerWidth}px`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: `${drawerWidth}px`,
            boxSizing: "border-box",
          },
        }}
        variant={togglepermanent}
        anchor="left"
        open={true}
        onClose={() => { 
          settogglePermanent('permanent')
          setshawDrawer('none')
         }}
      >
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "7.4px",
          }}
        >
          <IconButton onClick={() => toggleMode()}>
            {myMode === "light" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon sx={{ color: yellow[700] }} />
            )}
          </IconButton>
        </ListItem>

        <Divider />
        <Divider />

        <List>
          {myList.map((list,index)=>

          <ListItem
          key={index}
            sx={{
              bgcolor:
              loaction.pathname === list.path && myMode === "light"
              ? grey[200] 
              : loaction.pathname === list.path && myMode === "dark"
              ? grey[800] 
              : null, 
            }}
            disablePadding
          >
            <ListItemButton
              onClick={() => navegate(list.path)}
              sx={{ transition: "0.5s" }}
            >
              <ListItemIcon>
                {list.icon}
              </ListItemIcon>
              <ListItemText sx={{textTransform: "capitalize"}} primary={list.text} />
            </ListItemButton>
          </ListItem>
        )}

         

          <ListItem  onClick={handleLogout} disablePadding>
            <ListItemButton sx={{ transition: "0.5s" }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
