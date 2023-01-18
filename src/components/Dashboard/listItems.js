import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";

export const ListItems = () => {
  const pathName = window.location.pathname;
  console.log(pathName);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate("/users-list");
        }}
        sx={{ backgroundColor: pathName?.includes("users") ? "lightgray" : "" }}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton
        sx={{
          backgroundColor: pathName?.includes("events") ? "lightgray" : "",
        }}
        onClick={() => {
          navigate("/events");
        }}
      >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
    </React.Fragment>
  );
};
