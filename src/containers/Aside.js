import React from "react";
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';

import { Todo } from "pages";
import { FileUpload } from "components";

import { Icon } from "antd";

import "./styles/aside.scss";
const Aside = () => {
  const routes = [
  { path: 'todo',
    sidebar: () => <div><Icon type="schedule" />
    Todo</div>,
    main: () => <Todo />
  },
  { path: '/file',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <FileUpload />
  }
]
  return (
    <Router>
    <aside>
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link to="/todo">
              <Icon type="schedule" />
              Todo
            </Link>
          </li>
          <li>
            <Link to="/file">
              <Icon type="file-done" />
              File
            </Link>

          </li>
        </ul>
        <div style={{ flex: 1, padding: '10px' }}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </aside>
    </Router>
  )
}

export default Aside;
