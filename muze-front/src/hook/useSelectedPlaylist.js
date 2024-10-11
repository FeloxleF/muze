// useSelectedPlaylist.js

import { useState, useEffect } from "react";
import { fetchPlaylist, deleteSongFromPlaylist, deletePlaylist } from "../api";

const useSelectedPlaylist = (userId) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistClick = async (playlistId) => {
    try {
      const data = await fetchPlaylist(playlistId);
      setSelectedPlaylist({
        id: playlistId,
        name: data.name,
        songs: data.song,
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      await deleteSongFromPlaylist(selectedPlaylist.id, songId);
      handlePlaylistClick(selectedPlaylist.id);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    if (!playlistId) {
      console.warn("No playlist ID provided.");
      return;
    }
    try {
      await deletePlaylist(selectedPlaylist.id);
      setSelectedPlaylist(null);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  useEffect(() => {
    const handleUserIdChange = (event) => {
      setSelectedPlaylist(null);
    };

    window.addEventListener("userIdChange", handleUserIdChange);

    return () => {
      window.removeEventListener("userIdChange", handleUserIdChange);
    };
  }, []);

  return {
    selectedPlaylist,
    handlePlaylistClick,
    handleDeleteSong,
    handleDeletePlaylist,
  };
};

export default useSelectedPlaylist;
