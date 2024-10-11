// ActionButtons.js
import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ActionButtons = ({ onStopClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        paddingBottom: 2,
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: (theme) => theme.palette.three.main, // couleur de fond
            marginRight: "3%",
            color: (theme) => theme.palette.secondary.main, // couleur du texte
            borderRadius: "20px", // arrondi des bords
            padding: "6px 16px", // padding pour ajuster la taille
            "&:hover": {
              backgroundColor: "#E6E6CC", // couleur lors du survol
              boxShadow: "none", // toujours sans ombre lors du hover
            },
          }}
        >
          Annuler
        </Button>
      </Link>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary",
          marginLeft: "3%",
        }}
        onClick={onStopClick}
      >
        STOP
      </Button>
    </Box>
  );
};

export default ActionButtons;
