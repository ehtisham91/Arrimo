import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import { UserTable } from "./pages/UserTable";
import { customers } from "./__mock_data/customers";
import routes from "./routes";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <>
      <SnackbarProvider dense maxSnack={3}>
        {routes()}
      </SnackbarProvider>
    </>
  );
}

export default App;
