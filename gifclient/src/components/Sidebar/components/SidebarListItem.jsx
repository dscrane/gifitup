import React from "react";

const testsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-person-badge avi-icon"
    viewBox="0 0 15 15"
  >
    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
  </svg>
);

const SidebarListItem = ({
  itemContent,
  itemIcon,
  itemScore,
  skeletonDisplay,
}) => {
  //TODO find a better svg lib and integrate
  return (
    <div
      className={`list__item ${skeletonDisplay ? "list__item-skeleton" : ""}`}
    >
      <div className="item__content item__content-avi">
        <div className="avi-svg">{itemIcon}</div>
      </div>
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
