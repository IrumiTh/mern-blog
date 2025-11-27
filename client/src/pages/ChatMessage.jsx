import React from "react";

export const ChatMessages = ({ messages }) => {
  // Function to check if a new date should be displayed
  const isNewDate = (currentIndex) => {
    if (currentIndex === 0) return true; // Always show date for the first message
    const currentDate = messages[currentIndex].date;
    const previousDate = messages[currentIndex - 1].date;
    return currentDate !== previousDate;
  };

  return (
    <div className="flex flex-col p-4 space-y-4 overflow-y-auto bg-gray-50 h-[calc(100vh-150px)]">
      {messages.map((message, index) => (
        <div key={index}>
    
          {isNewDate(index) && (
            <div className="text-center text-gray-500 text-sm my-2">
              {message.date}
            </div>
          )}
          <div
            className={`flex ${
              message.isSentByMe ? "justify-end" : "justify-start"
            }`}
          >
            <div
            className={`p-3 text-sm leading-snug ${
                message.isSentByMe
                ? "bg-orange-200 text-gray-700"
                : "bg-gray-200 text-gray-700"
            } ${
                index === 0
                ? 
                    message.isSentByMe
                    ? "rounded-tr-lg rounded-tl-lg rounded-bl-lg"
                    : "rounded-tr-lg rounded-tl-lg rounded-br-lg"
                : 
                    message.isSentByMe
                    ? "rounded-tr-lg rounded-bl-lg"
                    : "rounded-tl-lg rounded-br-lg"
            } max-w-md`}
            >
            {message.text}
            </div>

          </div>
          
          <div
            className={`text-xs mt-1 ${
              message.isSentByMe ? "text-right text-gray-400" : "text-left text-gray-400"
            }`}
          >
            {message.time}
          </div>
        </div>
      ))}
    </div>
  );
};
