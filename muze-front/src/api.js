// api.js

const BASE_URL = "http://10.250.48.212:3333";

export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchPlaylists = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/playlists`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

export const fetchPlaylist = async (playlistId) => {
  try {
    const response = await fetch(`${BASE_URL}/playlists/${playlistId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};

export const deleteSongFromPlaylist = async (playlistId, songId) => {
  try {
    await fetch(`${BASE_URL}/playlists/${playlistId}/songs/${songId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    await fetch(`${BASE_URL}/playlists/${playlistId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("error deleting playlist:", error);
    throw error;
  }
};

export const getRandomSongs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/songs/list`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching random songs", error);
    throw error;
  }
};

export const createPlaylist = async (playlist) => {
  try {
    const response = await fetch(`${BASE_URL}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};
