import React from "react";

export default function TimeLeft({ timeLeft }) {
  return (
    <div className="todoItem__status">
      <p>{timeLeft < 0 ? "expired" : timeLeft}</p>
    </div>
  );
}
