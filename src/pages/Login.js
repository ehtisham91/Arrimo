import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import { useSnackbar } from "notistack";
import apiClient from "../components/request/apiClient";
import { loginReq } from "../components/request/requests";
import { setLocalStorage } from "../components/Common/utils";
import { useNavigate } from "react-router";
const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onHandleChange = (key, value) => {
    setUserCred({ ...userCred, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const req = loginReq(userCred);
      const response = await apiClient(
        req.url,
        req.method,
        req.data,
        req.headers
      );
      if (!response?.data?.name) {
        enqueueSnackbar("Not Authenticated", {
          variant: "error",
        });
      } else {
        setLocalStorage("token", Date.now());
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during logining user", {
        variant: "error",
      });
    } finally {
      setUserCred({ email: "", password: "" });
      navigate("/list-view");
    }
  };
  return (
    <Box
      display="flex"
      sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          margin: "auto",
          width: "370px",
          padding: "30px",
          backgroundColor: "Highlight",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "36px",
            fontWeight: "bold",
          }}
        >
          Login
        </Typography>
        <TextField
          fullWidth
          value={userCred.email}
          label="Email"
          variant="outlined"
          onChange={(e) => {
            onHandleChange("email", e.target.value);
          }}
        />
        <TextField
          sx={{ marginY: "30px" }}
          fullWidth
          label="Password"
          variant="outlined"
          value={userCred.password}
          onChange={(e) => {
            onHandleChange("password", e.target.value);
          }}
        />
        <Button
          disabled={!userCred.email || !userCred.password}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
