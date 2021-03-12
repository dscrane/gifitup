import React from "react";
import SidebarDrawer from "./SidebarDrawer";

const lts = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__row sidebar__row-header">App Heading!</div>
      <div className="sidebar__row sidebar__row-content">
        {lts.map((lt) => (
          <div>{lt}</div>
        ))}
      </div>
      <h4 className="sidebar__row sidebar__row-footer">FOOTER</h4>
    </div>
  );
};

export default Sidebar;
