import React, { useEffect } from "react";
import SidebarItem from "./SidebarItem";

const content = [
  "List Item 1",
  "List Item 2",
  "List Item 3",
  "List Item 4",
  "List Item 5",
  "List Item 6",
];

const SidebarDrawer = () => {
  return (
    <div>
      Drawer
      <SidebarItem />
    </div>
  );
};

export default SidebarDrawer;
