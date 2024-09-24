import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "./Pages/MainPage";

const App = () => {
  return (
    <Router>
      <MainPage />
    </Router>
  );
};

export default App;
