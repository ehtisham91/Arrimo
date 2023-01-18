import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateEditUser from "./pages/CreateEditUser";
import { UserTable } from "./pages/UserTable";
import Calendar from "./pages/Calendar";
import { EventTable } from "./pages/EventTable";
import Login from "./pages/Login";
import AuthWrapper from "./components/AuthWrapper";

const routes = () => {
  return (
    <Routes>
      {routeData.map((route) => {
        return (
          <Route
            exact={route?.exact}
            path={route.path}
            element={
              route?.screenLabel ? (
                <AuthWrapper>
                  <Dashboard screenLabel={route.screenLabel}>
                    {route.element}
                  </Dashboard>
                </AuthWrapper>
              ) : (
                route.element
              )
            }
          />
        );
      })}
    </Routes>
  );
};

const routeData = [
  {
    path: "",
    exact: true,
    element: <UserTable />,
    screenLabel: "Users List",
  },
  {
    path: "/user",
    exact: true,
    element: <CreateEditUser />,
    screenLabel: "Create User",
  },
  {
    path: "/user/:id",
    exact: false,
    element: <CreateEditUser />,
    screenLabel: "Update User",
  },
  {
    path: "/users",
    exact: true,
    element: <UserTable />,
    screenLabel: "Users List",
  },
  {
    path: "/events",
    exact: true,
    element: <Calendar />,
    screenLabel: "Events",
  },
  {
    path: "/events-list",
    exact: true,
    element: <EventTable />,
    screenLabel: "Events Table",
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
    screenLabel: null,
  },
];

export default routes;
