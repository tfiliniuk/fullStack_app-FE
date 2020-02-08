import React from "react";
import classNames from "classnames";

const Link = ({active, children, onClick}) => {
  return (
  <button
    onClick={onClick}
    className={classNames("", {"active": active})}
  >
  {children}
  </button>
  )
};

export default Link;
