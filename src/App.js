import "./App.css";
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
