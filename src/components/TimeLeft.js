import React from "react";

export default function TimeLeft({ timeLeft }) {
  return (
    <p className="todoItem__timeLeft">{timeLeft < 0 ? "expired" : timeLeft}</p>
  );
}
