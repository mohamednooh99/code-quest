import React from "react";
import {
  DashboardIcon,
  UserIcon,
  SettingsIcon,
  MenuIcon,
  LogoutIcon,
} from "../ui/icons/index.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      icon: <DashboardIcon className="w-5 h-5" />,
      label: "Dashboard",
      href: "/dashboard",
      active: false,
    },
    {
      icon: <UserIcon className="w-5 h-5" />,
      label: "Users",
      href: "/dashboard/users",
      active: true,
    },
    {
      icon: <SettingsIcon className="w-5 h-5" />,
      label: "Settings",
      href: "/settings",
      active: false,
    },
  ];

  return (
    <div
      className={` relative bg-gray-800 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) => (
            <>
              {console.log(item)}
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "px-0 py-2 " : "px-3 py-2"
                  } rounded-lg ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  } ${!collapsed ? "" : "justify-center"}`
                }
                end
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>
            </>
          ))}
        </div>
      </nav>

      {/* User info and logout */}
      {user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          {!collapsed && (
            <div className="mb-3">
              <p className="text-sm text-gray-300">{user.username}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className={`flex items-center ${
              collapsed ? "px-0 py-2 " : "px-3 py-2"
            } rounded-lg hover:bg-gray-700 w-full ${
              !collapsed ? "" : "justify-center"
            }`}
          >
            <LogoutIcon className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
