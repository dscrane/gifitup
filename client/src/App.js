import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Gamespace } from "./components/Gamespace";

const App = () => {
  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <div className="app__gamespace">
        <Gamespace />
      </div>
    </div>
  );
};

export default App;
