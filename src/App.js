import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";

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
    </Routes>
  );
}

export default App;
