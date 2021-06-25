import React, { useEffect } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import history from "./config/history";
import { LandingPage, GamePage } from "./pages";
import { PlayerPage } from "./pages/PlayerPage";

const App = () => {
  useEffect(() => {
    history.push("/");
  }, []);

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to="/register" />
          <Redirect push from="/join/:id" to="/register/:id" />
          <Route exact path="/register">
            <LandingPage />
          </Route>
          <Route exact path="/register/:id" component={LandingPage} />
          <Route path="/players">
            <PlayerPage />
          </Route>
          <Route path="/games/:id">
            <GamePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
