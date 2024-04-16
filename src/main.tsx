// @ts-ignore
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import ContextProvider from "./context";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ContextProvider>
    <Router>
      <Toaster />

      <App />
    </Router>
  </ContextProvider>
);
