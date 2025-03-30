import React from "react";
import { Link, useLocation } from "react-router-dom";  // Import useLocation
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation();  // Get the current location

  // Function to check if the current route matches the link
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <Link to="/" className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </Link>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className={`sidebar-list-item ${isActive("/")}`}>
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
          <Link to="/products" className="sidebar-link">
        <li className={`sidebar-list-item ${isActive("/products")}`}>
            <BsFillArchiveFill className="icon" /> Products
        </li>
          </Link>
        <li className={`sidebar-list-item ${isActive("/categories")}`}>
          <Link to="/categories">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive("/customers")}`}>
          <Link to="/customers">
            <BsPeopleFill className="icon" /> Customers
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive("/inventory")}`}>
          <Link to="/inventory">
            <BsListCheck className="icon" /> Inventory
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive("/reports")}`}>
          <Link to="/reports">
            <BsMenuButtonWideFill className="icon" /> Reports
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive("/settings")}`}>
          <Link to="/settings">
            <BsFillGearFill className="icon" /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
