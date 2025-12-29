import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./utils/AuthProvider";
import { ToastContainer } from "react-toastify";
import { RequireLogin } from "./utils/RequireLogin";
import 'tippy.js/dist/tippy.css'

function App() {
  return (
      <BrowserRouter basename="/xt/cta_emp">
        <ToastContainer />
        <AuthProvider>
          <RequireLogin>
            <AppRoutes />
          </RequireLogin>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
