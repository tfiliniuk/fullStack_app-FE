import React from "react";

import { Icon } from "antd";

import { FilterLink } from "./";
import { VisibilityFilters } from "actions";

const Sidebar = () => (
  <div className="todo__sidebar-btn">
    <FilterLink filter={VisibilityFilters.SHOW_ALL}> <Icon type="home" /> All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}><Icon type="profile" />Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}><Icon type="schedule" />Completed</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_IMPORTANT}><Icon type="star" />Importnat</FilterLink>
  </div>
);

export default Sidebar;
