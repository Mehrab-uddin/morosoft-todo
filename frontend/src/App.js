import React from "react";
import SignIn from "./components/landing/SingnIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import "./index.css";
import Task from "./components/Task";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/task" component={Task} />
        <Route path="/" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default App;
