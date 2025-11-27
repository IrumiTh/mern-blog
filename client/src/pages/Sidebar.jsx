import React from "react";

export const Sidebar = ({ children }) => {
  return (
    <div className="w-80 h-screen bg-gray-100 border-r border-gray-200">
      
        
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
};
