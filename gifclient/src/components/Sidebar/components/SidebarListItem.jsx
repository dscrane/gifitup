import React from "react";

const SidebarListItem = ({ itemContent, itemScore, skeletonDisplay }) => {
  //TODO find a better svg lib and integrate
  return (
    <div
      className={`list__item ${skeletonDisplay ? "list__item-skeleton" : ""}`}
    >
      <div className="item__content item__content-name">
        <div>{itemContent}</div>
      </div>
      <div className="item__content item__content-score">
        <div>{itemScore}</div>
      </div>
    </div>
  );
};

export default SidebarListItem;
