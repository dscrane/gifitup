import React from "react";
import SidebarDrawer from "./SidebarDrawer";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__row sidebar__row-header">
        {"<SidebarHeading/>"}
      </div>
      <div className="sidebar__row sidebar__row-content">
        {"<SidebarContent/>"}
        <div></div>
      </div>
      <div className="sidebar__row sidebar__row-footer">
        {"<SidebarFooter/>"}
      </div>
    </div>
  );
};

export default Sidebar;
