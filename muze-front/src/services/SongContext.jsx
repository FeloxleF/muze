import React, { createContext, useState } from "react";

const SongsContext = createContext();

// Crée un provider pour le contexte
const SongsProvider = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const addFavoriteSong = (songId) => {
    setFavoriteSongs((prevFavorites) => {
      if (!prevFavorites.includes(songId)) {
        const updatedFavorites = [...prevFavorites, songId];
        return updatedFavorites;
      }
      return prevFavorites;
    });
  };

  return (
    <SongsContext.Provider value={{ favoriteSongs, addFavoriteSong }}>
      {children}
    </SongsContext.Provider>
  );
};

export { SongsContext, SongsProvider };
