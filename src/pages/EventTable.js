import React, { useEffect, useState } from "react";
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
import { DeleteForeverOutlined } from "@mui/icons-material";
import { getAllEventsReq } from "../components/request/requests";
import apiClient from "../components/request/apiClient";
import { useSnackbar } from "notistack";

export const EventTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [events, setEvents] = useState([]);
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectAll = (event) => {
    let newSelectedEventIds;

    if (event.target.checked) {
      newSelectedEventIds = events.map((customer) => customer.id);
    } else {
      newSelectedEventIds = [];
    }

    setSelectedEventIds(newSelectedEventIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEventIds.indexOf(id);
    let newSelectedEventIds = [];

    if (selectedIndex === -1) {
      newSelectedEventIds = newSelectedEventIds.concat(selectedEventIds, id);
    } else if (selectedIndex === 0) {
      newSelectedEventIds = newSelectedEventIds.concat(
        selectedEventIds.slice(1)
      );
    } else if (selectedIndex === selectedEventIds.length - 1) {
      newSelectedEventIds = newSelectedEventIds.concat(
        selectedEventIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedEventIds = newSelectedEventIds.concat(
        selectedEventIds.slice(0, selectedIndex),
        selectedEventIds.slice(selectedIndex + 1)
      );
    }

    setSelectedEventIds(newSelectedEventIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const getAllEvents = async () => {
    try {
      setLoading(true);
      const req = getAllEventsReq();
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
        setEvents(response?.data?.msg);
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
    getAllEvents();
  }, []);
  return (
    <>
      {!!selectedEventIds?.length && (
        <Box
          sx={{
            position: "absolute",
            top: "74px",
            right: "23px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>Delete {selectedEventIds?.length} item(s)</Typography>
          <IconButton>
            <DeleteForeverOutlined sx={{ color: "red" }} />
          </IconButton>
        </Box>
      )}
      <Card sx={{ marginTop: "20px", position: "relative" }}>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedEventIds.length === events.length}
                    color="primary"
                    indeterminate={
                      selectedEventIds.length > 0 &&
                      selectedEventIds.length < events.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Time
                </TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading ? (
                !!events?.length ? (
                  events.slice(0, limit).map((_event) => (
                    <TableRow
                      hover
                      key={_event.id}
                      selected={selectedEventIds.indexOf(_event.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEventIds.indexOf(_event.id) !== -1}
                          onChange={(event) =>
                            handleSelectOne(event, _event.id)
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
                          <Typography color="textPrimary" variant="body1">
                            {_event.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(_event.time).toLocaleTimeString()}
                      </TableCell>

                      <TableCell>{_event.date}</TableCell>
                      <TableCell>{_event.address}</TableCell>
                      <TableCell>{_event.description}</TableCell>
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
