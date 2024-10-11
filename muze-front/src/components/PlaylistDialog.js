import React, { useState, useContext } from "react";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { createPlaylist } from "../api";
// import { useSongContext } from "../services/SongContext";
import { SongsContext } from "../services/SongContext";
import { useNavigate } from "react-router-dom";

// Styled component for the backdrop
const StyledBackdrop = styled("div")(({ theme }) => ({
  backdropFilter: "blur(5px)", // Apply blur effect
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
  zIndex: theme.zIndex.modal - 1, // Place the backdrop behind the dialog
}));

const PlaylistDialog = ({ open, onClose, userId }) => {
  const theme = useTheme();
  const [playlistName, setPlaylistName] = useState("");
  const { favoriteSongs } = useContext(SongsContext);

  const navigate = useNavigate();

  const handleSave = async () => {
    const newPlaylist = {
      name: playlistName,
      userId: parseInt(userId),
      songs: favoriteSongs,
    };
    await createPlaylist(newPlaylist);
    setPlaylistName("");
    onClose();
    navigate("/");
  };

  return (
    <>
      {/* Custom Backdrop */}
      {open && <StyledBackdrop />}

      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            border: "2px solid #B388FF", // Border color
            borderRadius: "12px", // Border radius
            boxShadow: "none", // Remove default shadow if needed
            position: "relative", // Ensure the dialog has a stacking context
            zIndex: theme.zIndex.modal + 1, // Place the dialog above the backdrop
          },
        }}
      >
        <DialogTitle>Nommez votre nouvelle Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la Playlist"
            type="text"
            fullWidth
            variant="outlined"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlaylistDialog;
