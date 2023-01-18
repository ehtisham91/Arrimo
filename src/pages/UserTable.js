import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../utils/get-initials";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { deleteUserReq, getAllUsersReq } from "../components/Requests";
import apiClient from "../components/Requests/apiClient";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

export const UserTable = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteOneUser = (_id) => {
    setAnchorEl(null);
    deleteOneUser(_id);
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];
    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const deleteSelectedUsers = async () => {
    try {
      selectedCustomerIds?.forEach((custId) => {
        const req = deleteUserReq(custId);
        apiClient(req.url, req.method, req.data, req.headers);
      });
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during deleting users", {
        variant: "error",
      });
    } finally {
      getAllUsers();
    }
  };

  const deleteOneUser = async (_id) => {
    try {
      const req = deleteUserReq(_id);
      const response = await apiClient(
        req.url,
        req.method,
        req.data,
        req.headers
      );
      if (!response?.data?.success) {
        enqueueSnackbar("Something went wrong during deleting user", {
          variant: "error",
        });
      } else {
        getAllUsers();
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during deleting user", {
        variant: "error",
      });
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const req = getAllUsersReq();
      const response = await apiClient(
        req.url,
        req.method,
        req.data,
        req.headers
      );
      if (!response?.data?.success) {
        enqueueSnackbar("Something went wrong during getting events data", {
          variant: "error",
        });
      } else {
        setCustomers(response?.data?.msg);
      }
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during getting events data", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "74px",
          right: "23px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {!!selectedCustomerIds?.length && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>
              Delete {selectedCustomerIds?.length} item(s)
            </Typography>
            <IconButton onClick={deleteSelectedUsers}>
              <DeleteForeverOutlined sx={{ color: "red" }} />
            </IconButton>
          </Box>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/user");
          }}
          sx={{ marginLeft: "8px" }}
        >
          Create User
        </Button>
      </Box>
      <Card sx={{ marginTop: "20px", position: "relative" }}>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Phone
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading ? (
                !!customers?.length ? (
                  customers?.map((customer) => (
                    <TableRow
                      hover
                      key={customer.id}
                      selected={
                        selectedCustomerIds.indexOf(customer._id) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedCustomerIds.indexOf(customer._id) !== -1
                          }
                          onChange={(event) =>
                            handleSelectOne(event, customer._id)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                            {getInitials(customer.name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {customer.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>

                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>
                        <IconButton onClick={handleClick}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              navigate(`/user/${customer._id}`);
                              handleClose();
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDeleteOneUser(customer._id);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} sx={{ textAlign: "center" }}>
                      No Data
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={12} sx={{ textAlign: "center" }}>
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </>
  );
};
