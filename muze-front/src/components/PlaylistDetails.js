import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  IconButton,
  // useTheme,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import usePlaylists from "../hook/usePlaylists";
import useSelectedPlaylist from "../hook/useSelectedPlaylist";
import { Link } from "react-router-dom";

const PlaylistDetails = () => {
  // const theme = useTheme();

  const { playlists, fetchData } = usePlaylists();
  const {
    selectedPlaylist,
    handlePlaylistClick,
    handleDeleteSong,
    handleDeletePlaylist,
  } = useSelectedPlaylist();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        padding: 2,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Section de gauche - Playlists */}
      <Box
        sx={{
          width: 200,
          border: "1px solid #ccc",
          padding: 2,
          margin: 2,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          color="secondary"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Playlists
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <List>
            {Array.isArray(playlists) && playlists.map((playlist, index) => (
              <ListItem key={index} disablePadding>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    padding: 2,
                    margin: "8px 0",
                  }}
                  onClick={() => handlePlaylistClick(playlist.id)}
                >
                  {playlist.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Section centrale - Détails playlist */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color="secondary"
            sx={{ marginBottom: 2, textAlign: "center", fontWeight: "bold" }}
          >
            {selectedPlaylist
              ? selectedPlaylist.name
              : "Selectionnez une playlist"}
          </Typography>
          <Tooltip
            title="Supprimer la playlist"
            arrow
            placement="top"
            sx={{ fontSize: "1rem" }}
          >
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={async () => {
                await handleDeletePlaylist(
                  selectedPlaylist ? selectedPlaylist.id : null
                );
                fetchData();
              }}
              sx={{ border: "3px solid" }}
              color="primary"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <List>
            {selectedPlaylist && selectedPlaylist.songs.length > 0 ? (
              selectedPlaylist.songs.map((song, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: (theme) => theme.palette.primary.light,
                    marginBottom: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography>{`${song.name} - ${song.artist} - ${
                    song.style
                  } - ${new Date(song.duration)
                    .toISOString()
                    .substr(14, 5)}`}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteSong(song.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography>
                  Aucun son dans la playlist, selectionnez en une autre
                </Typography>
              </ListItem>
            )}
          </List>
        </Box>
      </Box>

      {/* Section droite - Bouton Créer Playlist */}
      <Box
        sx={{
          width: 200,
          padding: 2,
          margin: 2,
          alignContent: "center",
          flexShrink: 0,
        }}
      >
        <Link to="/creator" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "100%", border: "3px solid", fontWeight: "bold" }}
          >
            Créer Playlist
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PlaylistDetails;
