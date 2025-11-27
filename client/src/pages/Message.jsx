import React from "react";

export const Message = ({ name, time, text, unreadCount, avatar }) => {
  return (
    <div className="flex items-center p-4 hover:bg-gray-200 cursor-pointer">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex-grow">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-600 truncate">{text}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400">{time}</p>
        {unreadCount > 0 && (
          <div className="text-sm bg-orange-500 text-white w-5 h-5 flex items-center ml-2 justify-center rounded-full">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

