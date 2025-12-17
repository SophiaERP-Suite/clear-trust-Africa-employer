import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
      <BrowserRouter basename="/xt/cta_emp">
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
