import React, { useEffect, useState } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import history from "./config/history";
import { useSessionStore } from "./store/store";
import { LandingPage, GamePage } from "./pages";

const App = () => {
  const session = useSessionStore((state) => state.session);
  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            {session.initialized ? <Redirect to="/games" /> : <LandingPage />}
          </Route>
          <Route path="/games">
            {session.initialized ? <GamePage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
