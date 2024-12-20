import { useContext } from "react";
import { Context } from "./context/context";
import Rutas from "./router/routes";

function App() {
    const { store, actions } = useContext(Context);

    return <Rutas actions={actions} store={store} />;
}

export default App;
