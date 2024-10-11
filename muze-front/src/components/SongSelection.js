import React, { useState, useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material";
import useSongs from "../hook/useSongs";
// import { useSongContext } from "../services/SongContext";
import { SongsContext } from "../services/SongContext";

const SongSelection = () => {
  const theme = useTheme();
  const { songs, currentIndex, handleNext, error } = useSongs();
  const [isLastSongHandled, setIsLastSongHandled] = useState(false);
  const { addFavoriteSong } = useContext(SongsContext);

  // Gérer l'affichage des erreurs
  if (error) {
    return (
      <Typography color="error">Erreur de chargement des chansons.</Typography>
    );
  }

  // Affichage du son actuel
  const currentSong = songs[currentIndex];

  const handleLastSong = () => {
    if (currentIndex === songs.length - 1) {
      setIsLastSongHandled(true); // Désactiver les boutons après le dernier son
    } else {
      handleNext(); // Passer au son suivant si ce n'est pas le dernier
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleLastSong} // Appeler la fonction sans ajout aux favoris
        disabled={isLastSongHandled || songs.length === 0} // Désactivé après le dernier son
        sx={{
          border: "2px solid #B388FF",
          color: theme.palette.primary.main,
          width: "60px",
          height: "60px",
          marginRight: 2,
        }}
      >
        <CloseIcon sx={{ fontSize: 40 }} />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          border: "2px solid",
          borderColor: theme.palette.primary.main,
          borderRadius: "12px",
          padding: 8,
          width: "25%",
          textAlign: "center",
        }}
      >
        {currentSong ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {currentSong.name} - {currentSong.artist}{" "}
              {/* Afficher le titre et l'artiste */}
            </Typography>
            <Box
              sx={{
                width: "150px",
                height: "150px",
                backgroundColor: "#B388FF",
                marginBottom: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Pochette</Typography>
            </Box>
            <Typography>
              {currentSong.style} -{" "}
              {new Date(currentSong.duration).toISOString().substr(14, 5)}
            </Typography>{" "}
            {/* Afficher le style et la durée */}
          </>
        ) : (
          <Typography>Chargement des chansons...</Typography>
        )}
      </Box>

      {/* Favorite Button */}
      <IconButton
        onClick={() => {
          addFavoriteSong(currentSong.id); // Ajouter ou retirer des favoris
          handleLastSong(); // Passer au son suivant ou désactiver si c'est le dernier
        }}
        disabled={isLastSongHandled || songs.length === 0} // Désactivé après avoir manipulé le dernier son
        sx={{
          border: "2px solid",
          color: theme.palette.primary.main,
          width: "60px",
          height: "60px",
          marginLeft: 2,
        }}
      >
        <FavoriteBorderIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default SongSelection;
