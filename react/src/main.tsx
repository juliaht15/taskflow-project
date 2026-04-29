import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import "./index.css";

// El símbolo '!' al final de getElementById asegura a TypeScript que el elemento existe
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "No se encontró el elemento raíz. Asegúrate de que index.html tenga un <div id='root'></div>",
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
