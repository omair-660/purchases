import React, { useEffect } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";

export default function Profile() {
  useEffect(() => {
    document.title = "Profile"; 
  }, []);
  const user = {
    name: "mohammed",
    email: "mohamed@example.com",
  };

  return (
    <Box component={'section'} sx={{ textAlign: "center", padding: 2 }}>
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{
          textAlign: "center",
          width: "150px",
          height: "150px",
          marginBottom: "20px",
          mx:"auto"
        }}
      />
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="body1" color="textSecondary">
        {user.email}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
}
