import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GameSpace } from "./components/GameSpace";

const App = () => {
  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <div className="app__gamespace">
        <GameSpace />
      </div>
    </div>
  );
};

export default App;
