import React from "react";
import MessageItem from "../MessageItem";

export default function MessageList({ messages }) {
  if (!messages && !messages?.length) {
    return null;
  }

  return (
    <div className="col">
      {messages.slice(0, 5).map((message, index) => {
        return <MessageItem key={index} messageReal={message} />;
      })}
    </div>
  );
}
