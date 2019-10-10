import React from "react";
import { Link } from "react-router-dom";

export default function TodosCategories() {
  return (
    <div className="todosCategories">
      <Link className="todosCategories__link" to="/">
        Active
      </Link>
      <Link className="todosCategories__link" to="/completedTodos">
        Completed
      </Link>
      <Link className="todosCategories__link" to="/expiredTodos">
        Expired
      </Link>
    </div>
  );
}
