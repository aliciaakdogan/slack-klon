import React from "react";
import { Hash } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { data: channels } = useQuery({
    queryKey: ["channels"],
    queryFn: () =>
      fetch("http://localhost:4000/channels").then((data) => data.json()),
  });

  return (
    <div className="sidebar">
      <h1 className="sidebar-header">Alicias Slack</h1>
      {channels
        ? channels.map((channel) => (
            <Link
              to={`/${channel._id}`}
              className="sidebar-row"
              key={channel._id}
            >
              <Hash />
              {channel.name}
            </Link>
          ))
        : "Loading..."}
    </div>
  );
}
