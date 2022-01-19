import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./teleporthq/style.module.css";
import Home from "./pages/home";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact component={Home} path="/" />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
