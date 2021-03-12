import React from "react";

const lts = [
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
  "<SidebarPlayer/>",
];

const SidebarItem = () => {
  return (
    <div>
      {" "}
      {lts.map((lt) => (
        <div>{lt}</div>
      ))}
    </div>
  );
};

export default SidebarItem;
