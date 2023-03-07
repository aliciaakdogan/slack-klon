import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

export default function Channel({ username }) {
  const { id } = useParams();
  const [text, setText] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      fetch("http://localhost:4000/channels/" + id).then((data) => data.json()),
  });

  async function sendMessage() {
    setText("");
    await fetch("http://localhost:4000/channels/" + id, {
      method: "POST",
      body: JSON.stringify({ text: text, username: username }),
      headers: { "Content-Type": "application/json" },
    });
    refetch();
  }

  return (
    <div className="channel-container">
      <div>{data ? <h2>{data.channel.name} </h2> : "loading..."}</div>
      <div className="channel-messages-container">
        {data
          ? data.messages.map((message) => <Message message={message} />)
          : "Loading..."}
      </div>

      <div className="channel-message-box">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={() => sendMessage()}>Send message</button>
      </div>
    </div>
  );
}
