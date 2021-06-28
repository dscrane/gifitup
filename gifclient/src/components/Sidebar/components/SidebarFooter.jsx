import React from "react";
import { GameCTA } from "../../GameCTA";
import { useSessionStore } from "../../../store/store";

const SidebarFooter = () => {
  const shareURL = useSessionStore((state) => state.session.shareURL);
  const handleClick = () => {
    console.log(shareURL);
    navigator.clipboard.writeText(shareURL);
  };
  return (
    <div>
      <div>SidebarFooter</div>
      <GameCTA fn={handleClick} text="Copy Game Link" />
    </div>
  );
};

export default SidebarFooter;
