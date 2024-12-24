import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./animacion.css";
import injectContext from "./context/context.jsx";

const AppWithContext = injectContext(App);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <React.StrictMode>
            <AppWithContext />
        </React.StrictMode>
    </React.StrictMode>
);
