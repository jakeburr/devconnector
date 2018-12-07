import React from "react";
import loading from "./Loading.gif";

export default function Loading() {
  return (
    <div>
      <img
        src={loading}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
