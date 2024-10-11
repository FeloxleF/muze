import { useState, useEffect } from "react";

const useUsername = () => {
  const [username, setUsername] = useState("");

  // Récupérer le username du local storage lors du premier rendu
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  return [username, updateUsername];
};

export default useUsername;
