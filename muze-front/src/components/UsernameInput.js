import React from "react";
import { Box, Button, TextField } from "@mui/material";
import useUsername from "../hook/useUsername";
import { fetchUserData } from "../api";

const UsernameInput = () => {
  const [username, updateUsername] = useUsername();

  const handleChange = async (event) => {
    updateUsername(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Username submitted:", username);
    try {
      const data = await fetchUserData(username);
      const userId = data.id;
      localStorage.setItem("userId", userId);
      updateUsername(data.username);

      const event = new CustomEvent("userIdChange", { detail: { userId } });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error handling user change:", error);
    }
    localStorage.setItem("username", username);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 2,
      }}
    >
      <TextField
        label="Username"
        variant="outlined"
        color="primary"
        value={username}
        onChange={handleChange}
        sx={{ marginRight: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          color: "white",
        }}
        onClick={handleSubmit}
      >
        Change User
      </Button>
    </Box>
  );
};

export default UsernameInput;
