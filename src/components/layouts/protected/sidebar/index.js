import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <section className="sidebar-section">
    <nav className="section-nav">
      <ul className="nav-list">
        <li className="list-item">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink
            to="/dashboard/bookmarks"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  </section>
);

export default Sidebar;
