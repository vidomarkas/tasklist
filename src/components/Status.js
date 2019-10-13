import React from "react";

export default function Status({ status }) {
  const getStyle = () => {
    if (expired && !completed) {
      return { backgroundColor: "#FDEEE8", color: "#ECB8A8" };
    } else if (completed) {
      return { backgroundColor: "#E0F5F5", color: "#58ACAB" };
    } else {
      return { backgroundColor: "#E4EFFE", color: "rgb(125, 173, 224)" };
    }
  };
  const { expired, completed } = status;
  const obtainStatus = (expired, completed) => {
    console.log(expired, completed);
    if (completed) {
      return "Completed";
    } else if (expired) {
      return "Expired";
    } else {
      return "In progress";
    }
  };
  return (
    <div className="todoItem__status" style={getStyle()}>
      <p>{obtainStatus(expired, completed)}</p>
    </div>
  );
}
