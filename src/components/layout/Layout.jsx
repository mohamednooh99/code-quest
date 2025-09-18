import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // mobile & small screens (sm)
        setSidebarCollapsed(true);
      } else {
        // tablet and larger (md and up)
        setSidebarCollapsed(false);
      }
    };

    // Run on mount
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
