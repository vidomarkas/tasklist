import React, { Component } from "react";

import TodayTodos from "./TodayTodos";
import UpcomingTodos from "./UpcomingTodos";
import ExpiredTodos from "./ExpiredTodos";
import PropTypes from "prop-types";

export class Todos extends Component {
  state = {
    previousExpanded: false,

    todayExpanded: true,
    upcomingExpanded: true
  };

  render() {
    const currentDateAndTime = new Date();
    const currentTimeMiliseconds = currentDateAndTime.getTime() / 1000;

    return (
      <>
        <div className="todos__category">
          <div
            className="todos__category__name"
            onClick={() => {
              this.setState({ previousExpanded: !this.state.previousExpanded });
            }}
          >
            {this.state.previousExpanded ? (
              <h2>
                Previous
                <span>
                  <svg
                    className="todos__category__name__rotatedSVG"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </h2>
            ) : (
              <h2>
                Previous
                <span>
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </h2>
            )}
          </div>
          <div className="line-separator"></div>
          <ExpiredTodos
            className="todos__list"
            previousExpanded={this.state.previousExpanded}
            currentTimeMiliseconds={currentTimeMiliseconds}
            todos={this.props.todos}
            key={this.props.todos.id}
            markComplete={this.props.markComplete}
            deleteTodo={this.props.deleteTodo}
          />
        </div>
        <div className="todos__category">
          <div
            className="todos__category__name"
            onClick={() => {
              this.setState({ todayExpanded: !this.state.todayExpanded });
            }}
          >
            {this.state.todayExpanded ? (
              <h2>
                Today
                <span>
                  <svg
                    className="todos__category__name__rotatedSVG"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </h2>
            ) : (
              <h2>
                Today
                <span>
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </h2>
            )}
          </div>
          <div className="line-separator"></div>
          <TodayTodos
            className="todos__list"
            todayExpanded={this.state.todayExpanded}
            currentTimeMiliseconds={currentTimeMiliseconds}
            todos={this.props.todos}
            key={this.props.todos.id}
            markComplete={this.props.markComplete}
            deleteTodo={this.props.deleteTodo}
            getDeadlinesMiliseconds={this.props.getDeadlinesMiliseconds}
          />
        </div>
        <div className="todos__category">
          <div
            className="todos__category__name"
            onClick={() => {
              this.setState({ upcomingExpanded: !this.state.upcomingExpanded });
            }}
          >
            {this.state.upcomingExpanded ? (
              <h2>
                Upcoming
                <span>
                  <svg
                    className="todos__category__name__rotatedSVG"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </h2>
            ) : (
              <h2>
                Upcoming
                <span>
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </h2>
            )}
          </div>
          <div className="line-separator"></div>
          <UpcomingTodos
            className="todos__list"
            upcomingExpanded={this.state.upcomingExpanded}
            currentTimeMiliseconds={currentTimeMiliseconds}
            todos={this.props.todos}
            key={this.props.todos.id}
            markComplete={this.props.markComplete}
            deleteTodo={this.props.deleteTodo}
            getDeadlinesMiliseconds={this.props.getDeadlinesMiliseconds}
          />
        </div>
      </>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
