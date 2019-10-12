import React from "react";

export default function Status({ status }) {
  const { expired, completed } = status;
  const obtainStatus = (expired, completed) => {
    if (completed) {
      return "Completed";
    } else if (expired) {
      return "Expired";
    } else {
      return "In progress";
    }
  };
  return <div>{obtainStatus(expired, completed)}</div>;
}
