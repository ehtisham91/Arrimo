import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { UserTable } from "./pages/UserTable";
import { customers } from "./__mock_data/customers";
function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
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
    </Routes>
  );
}

export default App;
