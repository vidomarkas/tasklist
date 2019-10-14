import React, { Component } from "react";

import TodayTodos from "./TodayTodos";
import UpcomingTodos from "./UpcomingTodos";
import ExpiredTodos from "./ExpiredTodos";
import PropTypes from "prop-types";

export class Todos extends Component {
  state = {
    previousExpanded: true,
    todayExpanded: true,
    upcomingExpanded: true
  };
  render() {
    const d = new Date();
    const currentTimeMiliseconds = d.getTime() / 1000;

    return (
      <>
        <div className="todos__category">
          <h2
            className="todos__category__name"
            onClick={() => {
              this.setState({ expanded: !this.state.expanded });
            }}
          >
            Previous
          </h2>

          <div className="line-separator"></div>
          <ExpiredTodos
            className="todos__list"
            currentTimeMiliseconds={currentTimeMiliseconds}
            todos={this.props.todos}
            // key={this.props.todos.id}
            markComplete={this.props.markComplete}
            deleteTodo={this.props.deleteTodo}
            getDeadlinesMiliseconds={this.props.getDeadlinesMiliseconds}
          />
        </div>
        <div className="todos__category">
          <h2 className="todos__category__name">Today</h2>
          <div className="line-separator"></div>
          <TodayTodos
            className="todos__list"
            currentTimeMiliseconds={currentTimeMiliseconds}
            todos={this.props.todos}
            // key={this.props.todo.id}
            markComplete={this.props.markComplete}
            deleteTodo={this.props.deleteTodo}
            getDeadlinesMiliseconds={this.props.getDeadlinesMiliseconds}
          />
        </div>
        <div className="todos__category">
          <h2 className="todos__category__name">Upcoming</h2>
          <div className="line-separator"></div>
          <UpcomingTodos
            className="todos__list"
            currentTimeMiliseconds={currentTimeMiliseconds}
            todos={this.props.todos}
            // key={this.props.todo.id}
            markComplete={this.props.markComplete}
            deleteTodo={this.props.deleteTodo}
            getDeadlinesMiliseconds={this.props.getDeadlinesMiliseconds}
          />
        </div>
      </>
    );
  }
}

//     return this.props.todos.map(todo => {
//       const date = new Date(todo.unformattedDeadline);
//       const deadlineMiliseconds = date.getTime() / 1000;

//       if (
//         (deadlineMiliseconds - currentTimeMiliseconds) / 86400 > 0 &&
//         (deadlineMiliseconds - currentTimeMiliseconds) / 86400 <= 1
//       ) {
//         return (
//           <div>
//             <h2>Today</h2>
//             <TodoItem
//               todo={todo}
//               key={todo.id}
//               markComplete={this.props.markComplete}
//               deleteTodo={this.props.deleteTodo}
//             />
//           </div>
//         );
//       }
//       } else {
//         return (

//         );
//       }
//     });
//   }
// }

Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
