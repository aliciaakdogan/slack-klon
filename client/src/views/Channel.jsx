import React from "react";
import { useQuery } from "@tanstack/react-query";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

export default function Channel() {
  const { id } = useParams();
  const { data: messages } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      fetch("http://localhost:3000/channels/" + id).then((data) => data.json()),
  });

  console.log(messages);

  return (
    <div>
      {messages
        ? messages.map((message) => <Message message={message} />)
        : "Loading..."}
    </div>
  );
}
