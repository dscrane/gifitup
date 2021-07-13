import React from "react";
import { GameCTA } from "../../GameCTA";
import { useEmitterStore, useSessionStore } from "../../../store/store";

const SidebarFooter = () => {
  const shareURL = useSessionStore((state) => state.shareURL);
  const changeJudgeEmitter = useEmitterStore(
    (state) => state.changeJudgeEmitter
  );

  const handleClick = () => {
    console.log(shareURL);
    navigator.clipboard.writeText(shareURL);
  };
  const handleNext = () => {
    changeJudgeEmitter();
  };
  return (
    <div className="sidebar__footer">
      <div>SidebarFooter</div>
      <GameCTA fn={handleClick} text="Copy Game Link" />
      {/*<GameCTA fn={handleNext} text="Next Round" />*/}
    </div>
  );
};

export default SidebarFooter;
