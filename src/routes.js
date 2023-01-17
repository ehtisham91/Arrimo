import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import { UserTable } from "./pages/UserTable";
import Calendar from "./pages/Calendar";
import { customers } from "./__mock_data/customers";
import { EventTable } from "./pages/EventTable";
import { events } from "./__mock_data/event";
import Login from "./pages/Login";

const routes = () => {
  return (
    <Routes>
      <Route
        exact
        path="/user"
        element={
          <Dashboard>
            <Home />
          </Dashboard>
        }
      />
      <Route
        path="/user/:id"
        element={
          <Dashboard>
            <Home />
          </Dashboard>
        }
      />
      <Route
        exact
        path="/list-view"
        element={
          <Dashboard>
            <UserTable customers={customers} />
          </Dashboard>
        }
      />
      <Route
        exact
        path="/events"
        element={
          <Dashboard>
            <Calendar />
          </Dashboard>
        }
      />
      <Route
        exact
        path="/events-list"
        element={
          <Dashboard>
            <EventTable events={events} />
          </Dashboard>
        }
      />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
};

export default routes;
