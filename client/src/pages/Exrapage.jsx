import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Message } from "./Message";
import { ChatMessages } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";

export default function Exrapage() {
  const messagenotification = [
    {
      name: "Mark Barnette",
      time: "11:08",
      text: "I'm available at 10:30 AM this Friday...",
      unreadCount: 2,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdjLlJS2C2KD-fRoOykz8e5luqOtFFpGo_QQ&s",
    },
    {
      name: "Mark Barnette",
      time: "11:08",
      text: "Hi. My dog hasn’t been eating...",
      
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdjLlJS2C2KD-fRoOykz8e5luqOtFFpGo_QQ&s",
    },
    // Add more message data here
  ];

  const [messages, setMessages] = useState([
    { text: "Hi, Dr. Smith! I wanted to ask about Bella's follow-up appointment. Are you available this Friday?", isSentByMe: false, time: "8:45 AM", date: "Wednesday, January 1st" },
    { text: "Good morning! Let me check the schedule. One moment, please.", isSentByMe: true, time: "8:47 AM", date: "Wednesday, January 1st" },
    { text: "Sure, no problem.", isSentByMe: false, time: "8:48 AM", date: "Wednesday, January 1st" },
    { text: "I'm available at 10:30 AM this Friday. Does that time work for you?", isSentByMe: true, time: "8:50 AM", date: "Wednesday, January 1st" },
    { text: "That works perfectly. Thank you!", isSentByMe: false, time: "8:51 AM", date: "Wednesday, January 1st" },
  ]);

  const handleSend = (message) => {
    setMessages([...messages, { text: message, isSentByMe: true, time: new Date().toLocaleTimeString() }]);
  };

  return (
    <div className="flex">
      <Sidebar className="border-r-8">
        {messagenotification.map((msg, index) => (
          <Message
            key={index}
            name={msg.name}
            time={msg.time}
            text={msg.text}
            unreadCount={msg.unreadCount}
            avatar={msg.avatar}
          />
        ))}
      </Sidebar>
      <div className="flex-grow p-6">
        <div className="flex flex-col h-screen">
          <ChatHeader
            avatar="https://img.freepik.com/premium-vector/hand-drawing-cartoon-girl-cute-girl-drawing-profile-picture_488586-692.jpg"
            name="Mark Barnette"
          />
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
