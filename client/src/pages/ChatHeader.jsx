import React from "react";

export const ChatHeader = ({ avatar, name }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
      <div className="flex space-x-3">
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-phone-alt"></i>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-video"></i>
        </button>
      </div>
    </div>
  );
};
