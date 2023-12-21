import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import { configureStore } from "./store";
import { initialState } from "./store/app/reducer";
import App from "./App";
import { Store } from "redux";
import { RootState } from "./store/types";
import "./index.scss";

const store: Store<RootState> = configureStore({
  initialState: { app: initialState },
});

const container = document.getElementById("root");

if (container == null) {
  throw new Error("Container not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
