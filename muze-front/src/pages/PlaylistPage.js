// PlaylistPage.js
import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import PlaylistDetails from "../components/PlaylistDetails";
import UsernameInput from "../components/UsernameInput";

const PlaylistPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />
      <PlaylistDetails />
      <UsernameInput />
    </Box>
  );
};

export default PlaylistPage;
