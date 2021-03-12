import React, { useEffect, useState } from "react";

import { Sidebar } from "./components/Sidebar";
import { AppBar } from "./components/AppBar";
import { GameTable } from "./components/GameTable";

const App = () => {
  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <div className="app__gamespace">
        <div className="gamespace__table">Gamespace Table</div>
        <div className="gamespace__hand">Gamespace Hand</div>
      </div>
      {/*<div style={{ height: "100vh", background: "black" }}>100vh</div>*/}
      {/*<AppBar />*/}
      {/*<Sidebar />*/}
      {/*<GameTable />*/}
    </div>
  );
};

export default App;
