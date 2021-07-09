import React, { useEffect } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import history from "./config/history";
import { LandingPage, GamePage, PlayerPage } from "./pages";
import { useSessionStore } from "./store/store";
import { GameContext } from "./pages/GamePage/components";

const App = () => {
  // TODO:
  //  Reset state on reload

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>
          <Redirect push from="/join/:id" to="/register/:id" />
          <Route exact path="/register">
            <LandingPage />
          </Route>
          <Route exact path="/register/:id" component={LandingPage} />
          <Route path="/games">
            <GamePage />
          </Route>
          <Route path="/sid/:id">
            <GamePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
