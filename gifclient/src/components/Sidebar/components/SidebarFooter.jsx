import React from "react";
import history from "../../../config/history";
import { GameCTA } from "../../GameCTA";

const SidebarFooter = () => {
  const handleClick = () => {
    const shareURL = history.location.pathname;
    console.log(window.location);
    navigator.clipboard.writeText(
      window.location.origin + shareURL.replace("games", "join")
    );
  };
  return (
    <div>
      <div>SidebarFooter</div>
      <GameCTA fn={handleClick} text="Copy Game Link" />
    </div>
  );
};

export default SidebarFooter;
