import React from "react";
import App from "./App";
import Preview from "./Preview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

const RouteApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Router>
      </Provider>
  );
};

export default RouteApp;
