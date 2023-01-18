import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import apiClient from "../components/Requests/apiClient";
import {
  createUserReq,
  updateUserReq,
  getSingleUserReq,
} from "../components/Requests";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";

const CreateEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [imageLocal] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async () => {
    try {
      let obj = {
        name: `${userInfo.firstname} ${userInfo.lastname}`,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
      };
      const req = !id ? createUserReq(obj) : updateUserReq(id, obj);
      const response = await apiClient(
        req.url,
        req.method,
        req.data,
        req.headers
      );
      if (!response?.data?.success) {
        enqueueSnackbar(
          `Something went wrong during ${id ? "updating" : "creating"} user`,
          {
            variant: "error",
          }
        );
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar(
        `Something went wrong during ${id ? "updating" : "creating"} user`,
        {
          variant: "error",
        }
      );
    } finally {
      setUserInfo({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
      });
      navigate("/users-list");
    }
  };

  const getSingleUser = async () => {
    try {
      const req = getSingleUserReq(id);
      const response = await apiClient(
        req.url,
        req.method,
        req.data,
        req.headers
      );
      if (!response?.data?.success) {
        enqueueSnackbar(`Something went wrong during getting user details`, {
          variant: "error",
        });
      } else {
        let user = response?.data?.msg[0];
        let obj = {
          firstname: user.name.split(" ")[0],
          lastname: user.name.split(" ").length > 0 && user.name.split(" ")[1],
          email: user.email,
          phone: user.phone,
          address: user.address,
        };
        setUserInfo(obj);
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar(`Something went wrong during getting user details`, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (id) {
      getSingleUser();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onHandleChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

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
          {/* <input
            // id="hidden_input"
            accept="image/*"
            onChange={(e) => {
              // let urlForImage = UrlEndcoded
              console.log("data for image", e.target.files[0]);
              setImageLocal(e.target.files[0]);
            }}
            // type="file"
            style={{ display: "none" }}
          /> */}
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
        <TextField
          onChange={(e) => {
            onHandleChange("firstname", e.target.value);
          }}
          fullWidth
          sx={{ marginX: "16px" }}
          label="First Name"
          value={userInfo?.firstname}
        />

        <TextField
          onChange={(e) => {
            onHandleChange("lastname", e.target.value);
          }}
          fullWidth
          sx={{ marginX: "16px" }}
          label="Last Name"
          value={userInfo?.lastname}
        />
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
          onChange={(e) => {
            onHandleChange("email", e.target.value);
          }}
          fullWidth
          sx={{ marginX: "16px" }}
          label="Email"
          value={userInfo?.email}
        />

        <TextField
          onChange={(e) => {
            onHandleChange("phone", e.target.value);
          }}
          fullWidth
          sx={{ marginX: "16px" }}
          label="Phone"
          value={userInfo?.phone}
        />
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
          onChange={(e) => {
            onHandleChange("address", e.target.value);
          }}
          value={userInfo?.address}
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
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{ width: "200px" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEditUser;
