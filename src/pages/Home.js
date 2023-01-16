import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Home = () => {
  const [imageLocal, setImageLocal] = useState("");
  return (
    <Box id="main-box">
      <Box sx={{ width: "100%" }}>
        <Box
          onClick={() => {
            document.getElementById("hidden_input").click();
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: `url(${
              imageLocal
                ? imageLocal
                : "https://images.all-free-download.com/images/graphiclarge/camera_test_apple_560282.jpg"
            })`,
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            backgroundPosition: "50% 50%",
            backgroundSize: "cover",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          <input
            id="hidden_input"
            accept="image/*"
            onChange={(e) => {
              // let urlForImage = UrlEndcoded
              console.log("data for image", e.target.files[0]);
              setImageLocal(e.target.files[0]);
            }}
            type="file"
            style={{ display: "none" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "100px",
        }}
      >
        <TextField fullWidth sx={{ marginX: "16px" }} label="First Name" />

        <TextField fullWidth sx={{ marginX: "16px" }} label="Last Name" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "36px",
        }}
      >
        <TextField fullWidth sx={{ marginX: "16px" }} label="Email" />

        <TextField fullWidth sx={{ marginX: "16px" }} label="Phone" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "36px",
        }}
      >
        <TextField
          fullWidth
          multiline
          sx={{ marginX: "16px" }}
          minRows={4}
          label="Address"
        />
      </Box>
      <Box
        sx={{ marginY: "60px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="contained" style={{ width: "200px" }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
