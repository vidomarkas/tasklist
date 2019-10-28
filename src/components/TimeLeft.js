import React from "react";

export default function TimeLeft({ timeLeft, completed }) {
  return (
    <div
      className="todoItem__timeLeft todoItem__sidemenu__section"
      style={{ display: completed ? "none" : "block" }}
    >
      <p className="todoItem__sidemenu__text--secondary">Time left</p>
      <p className="todoItem__sidemenu__text--primary">
        {timeLeft < 0 ? "expired" : timeLeft}
      </p>
    </div>
  );
}
