// useSongs.js
import { useEffect, useState } from "react";
import { getRandomSongs } from "../api";

const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getRandomSongs();
        setSongs(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des chansons", error);
        setError(error); // Mettez à jour l'état d'erreur si nécessaire
      }
    };

    fetchSongs();
  }, []);

  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    songs,
    currentIndex,
    handleNext,
    handlePrevious,
    error,
  };
};

export default useSongs;
