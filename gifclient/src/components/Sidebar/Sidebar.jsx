import React from "react";
import { SidebarList, SidebarFooter, SidebarHeader } from "./components";

const Sidebar = ({ socket }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__row sidebar__row-header">
          <SidebarHeader />
        </div>
        <div className="sidebar__row sidebar__row-list">
          <SidebarList socket={socket} />
        </div>
        <div className="sidebar__row sidebar__row-footer">
          <SidebarFooter />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
