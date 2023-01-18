import React, { useEffect, useState } from "react";
import {
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
import { deleteEventReq, getAllEventsReq } from "../components/Requests";
import apiClient from "../components/Requests/apiClient";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

export const EventTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [events, setEvents] = useState([]);
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    let newSelectedEventIds;
    if (event.target.checked) {
      newSelectedEventIds = events.map((_event) => _event._id);
    } else {
      newSelectedEventIds = [];
    }
    setSelectedEventIds(newSelectedEventIds);
  };

  const deleteSelectedEvents = async () => {
    try {
      let allPromises = [];
      allPromises = selectedEventIds?.map((eveId) => {
        const req = deleteEventReq(eveId);
        return Promise.resolve(
          apiClient(req.url, req.method, req.data, req.headers)
        );
      });
      Promise.all(allPromises).then(() => {
        setSelectedEventIds([]);
        getAllEvents();
      });
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during deleting events", {
        variant: "error",
      });
    }
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
        {!!selectedEventIds?.length && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={deleteSelectedEvents}
          >
            <Typography>Delete {selectedEventIds?.length} item(s)</Typography>
            <IconButton>
              <DeleteForeverOutlined sx={{ color: "red" }} />
            </IconButton>
          </Box>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/events");
          }}
          sx={{ marginLeft: "8px" }}
        >
          Grid View
        </Button>
        <Button
          sx={{ marginLeft: "8px" }}
          variant="outlined"
          onClick={() => {
            navigate("/events-list");
          }}
        >
          List View
        </Button>
      </Box>
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
                  events?.map((_event) => (
                    <TableRow
                      hover
                      key={_event.id}
                      selected={selectedEventIds.indexOf(_event._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEventIds.indexOf(_event._id) !== -1}
                          onChange={(event) =>
                            handleSelectOne(event, _event._id)
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
