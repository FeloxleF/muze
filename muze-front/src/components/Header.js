// Header.js
import React from "react";
import { AppBar, Typography, useTheme } from "@mui/material";
import "@fontsource/protest-guerrilla";

const Header = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        padding: 2,
        boxShadow: "none",
        textAlign: "center",
        backgroundColor: theme.palette.three.main,
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{ fontFamily: "Protest Guerrilla, sans-serif" }}
      >
        MUZE
      </Typography>
    </AppBar>
  );
};

export default Header;
