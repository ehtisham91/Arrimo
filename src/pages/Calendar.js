import FullCalendar from "@fullcalendar/react";
import { Box, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import Alert from "../components/Common/Alert/Alert";
import TimePicker from "../components/Common/timePicker/TimePicker";
import {
  createEventReq,
  getAllEventsReq,
  updateEventReq,
} from "../components/request/requests";
import { useSnackbar } from "notistack";
import apiClient from "../components/request/apiClient";
const Calendar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [eventList, setEventList] = useState([]);

  const [event, setEvent] = useState({
    id: "",
    title: "",
    description: "",
    time: "",
    createdAt: "",
    address: "",
    date: "",
  });
  const [showAlert, setShowAlert] = useState({ bool: false, date: "" });

  const handleAlertClose = () => {
    setShowAlert({ bool: false, date: "" });
    setEvent({
      id: "",
      title: "",
      description: "",
      time: "",
      createdAt: "",
      address: "",
      date: "",
    });
  };

  const handleDateClick = (arg) => {
    setShowAlert({ bool: true, date: arg?.dateStr });
    setEvent({ ...event, date: arg?.dateStr });
  };

  const onHandleChange = (key, value) => {
    setEvent((prev) => ({ ...prev, [key]: value }));
  };

  const onTimeChange = (timeDate) => {
    setEvent((prev) => ({ ...prev, time: timeDate }));
  };

  const updateEvent = (id, _event) => {
    const idx = eventList.findIndex((eve) => id === eve?.id);
    let eveList = [...eventList];
    eveList[idx] = _event;
    setEventList([...eveList]);
  };

  const handleEventClick = (e) => {
    let unformatedDateList = new Date(e.event.start)
      ?.toLocaleString()
      ?.split(",")[0]
      ?.split("/");
    let date = `${unformatedDateList[2]}-${unformatedDateList[1]}-${unformatedDateList[0]}`;

    setEvent({
      ...e.event.extendedProps,
      title: e.event.title,
      date: date,
      id: e.event.id,
    });
    setShowAlert({ bool: true, date: "" });
  };
  console.log("eventslist", eventList);

  const createNewEvent = async (data) => {
    try {
      const req = createEventReq(data);
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
        getAllEvents();
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during deleting user", {
        variant: "error",
      });
    }
  };

  const handleUpdateEvent = async (_id, data) => {
    try {
      const req = updateEventReq(_id, data);
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
        getAllEvents();
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during deleting user", {
        variant: "error",
      });
    }
  };

  const handleClickSave = () => {
    // let unformatedDateList = new Date(event?.time)
    //   ?.toLocaleString()
    //   ?.split(",")[0]
    //   ?.split("/");
    // let date = `${unformatedDateList[2]}-${unformatedDateList[1]}-${unformatedDateList[0]}`;
    // let obj = {
    //   ...event,
    //   date: date,
    // };

    if (event?.id) {
      updateEvent(event?._id, event);
      handleUpdateEvent(event?._id, event);
    } else {
      setEventList([...eventList, event]);
      createNewEvent(event);
    }
    handleAlertClose();
  };

  const getAllEvents = async () => {
    try {
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
        setEventList(response?.data?.msg);
      }
    } catch (err) {
      console.log("err", err);
      enqueueSnackbar("Something went wrong during getting events data", {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <Paper sx={{ padding: "20px 30px", heigth: "700px" }}>
        <FullCalendar
          height="700px"
          events={eventList}
          plugins={[dayGridPlugin, interaction]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </Paper>
      {showAlert.bool && (
        <Alert
          title="Please provide details for the event"
          continueFunc={handleClickSave}
          closeFunc={handleAlertClose}
          firstButtonText={"Cancel"}
          secondButtonText={"Save"}
          details={
            <Box>
              <Box display="flex" sx={{ marginY: "16px" }} alignItems="center">
                <TextField
                  onChange={(e) => {
                    onHandleChange("title", e.target.value);
                  }}
                  value={event?.title}
                  fullWidth
                  label="Title"
                  variant="outlined"
                />
                <TimePicker
                  date={showAlert?.date}
                  onTimeChange={onTimeChange}
                  value={new Date(event?.time)}
                  style={{ marginLeft: "8px" }}
                  label={"Event Time"}
                />
              </Box>

              <TextField
                sx={{ marginY: "16px" }}
                fullWidth
                label="Address"
                value={event?.address}
                variant="outlined"
                onChange={(e) => {
                  onHandleChange("address", e.target.value);
                }}
              />
              <TextField
                sx={{ marginTop: "16px" }}
                fullWidth
                multiline
                value={event?.description}
                minRows={3}
                label="Description"
                variant="outlined"
                onChange={(e) => {
                  onHandleChange("description", e.target.value);
                }}
              />
            </Box>
          }
        />
      )}
    </>
  );
};
export default Calendar;
