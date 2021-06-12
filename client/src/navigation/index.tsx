import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NewSession} from "../pages";


const MainRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <NewSession />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default MainRouter;