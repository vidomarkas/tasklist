import React from "react";

export default function TimeLeft({ timeLeft, completed }) {
  return (
    <div
      className="todoItem__timeLeft"
      style={{ display: completed ? "none" : "block" }}
    >
      <p>{timeLeft < 0 ? "expired" : timeLeft}</p>
    </div>
  );
}
