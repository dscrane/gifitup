import React from "react";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import SidebarItem from "./SidebarItem";

const content = [
  "List Item 1",
  "List Item 2",
  "List Item 3",
  "List Item 4",
  "List Item 5",
  "List Item 6",
];

const useStyles = makeStyles(() => ({
  navList: {
    width: "100%",
    backgroundColor: "lightseagreen",
  },
  listItem: {
    backgroundColor: "lightblue",
    color: "red",
    width: "100%",
    text: "center",
  },
}));

const SidebarDrawer = () => {
  const classes = useStyles();
  const displayContent = content.map((item) => (
    <>
      <SidebarItem content={item} className={classes.listItem} />
      <Divider variant="inset" component="li" />
    </>
  ));

  return (
    <Drawer anchor="left" variant="permanent">
      <List alignItems="flex-start" className={classes.navList}>
        {displayContent}
      </List>
    </Drawer>
  );
};

export default SidebarDrawer;
