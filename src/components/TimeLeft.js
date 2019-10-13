import React from "react";

export default function TimeLeft({ timeLeft }) {
  return (
    <div className="todoItem__timeLeft">
      <p>{timeLeft < 0 ? "expired" : timeLeft}</p>
    </div>
  );
}
