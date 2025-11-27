import React from "react";

export const ChatInput = ({ onSend }) => {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-4 border-t bg-white">
      <button className="text-gray-500 hover:text-gray-700 mr-2">
        <i className="fas fa-plus"></i>
      </button>
      <input
        type="text"
        placeholder="Type here..."
        className="flex-grow p-2 border rounded-lg focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="ml-2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
        onClick={handleSend}
      >
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};
