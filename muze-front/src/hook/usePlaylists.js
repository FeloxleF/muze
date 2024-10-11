// usePlaylists.js

import { useState, useEffect, useCallback } from "react";
import { fetchPlaylists } from "../api";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const fetchData = useCallback(async () => {
    try {
      if (userId) {
        const data = await fetchPlaylists(userId);
        setPlaylists(data);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [userId, fetchData]);

  useEffect(() => {
    const handleUserIdChange = (event) => {
      setUserId(event.detail.userId);
    };

    window.addEventListener("userIdChange", handleUserIdChange);

    return () => {
      window.removeEventListener("userIdChange", handleUserIdChange);
    };
  }, []);

  return { playlists, fetchData };
};

export default usePlaylists;
