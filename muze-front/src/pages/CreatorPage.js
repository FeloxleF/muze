import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import SongSelection from "../components/SongSelection";
import ActionButtons from "../components/ActionButtons";
import PlaylistDialog from "../components/PlaylistDialog";

const CreatorPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
      <SongSelection />
      <ActionButtons onStopClick={handleOpenDialog} />
      <PlaylistDialog
        open={openDialog}
        onClose={handleCloseDialog}
        userId={userId}
      />
    </Box>
  );
};

export default CreatorPage;
