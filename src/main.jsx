import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./redux/store";
import axios from "axios";
import App from "./app.jsx";
import "./index.css";

let interceptorId = null;

const setupAxiosInterceptor = () => {
  if (interceptorId !== null) {
    axios.interceptors.request.eject(interceptorId);
  }

  interceptorId = axios.interceptors.request.use(
    (config) => {
      try {
        const state = store.getState();
        const token = state?.auth?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          delete config.headers.Authorization;
        }
      } catch (error) {
        console.error("Interceptor error:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

setupAxiosInterceptor();

store.subscribe(() => {
  try {
    const state = store.getState();
    const token = state?.auth?.token;
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error("Store subscribe error:", error);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
