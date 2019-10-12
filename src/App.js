import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";

import uuid from "uuid";

import "./css/main.css";

class App extends Component {
  state = {
    todos: []
  };

  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          console.log(this.state);
        }
        return todo;
      })
    });
  };

  deleteTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  addtodo = (title, body, timeCreated, deadline) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      body,
      timeCreated,
      completed: false,
      deadline
    };

    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  //save todos to local storage
  saveToLocalStorage = nextState => {
    const localStorageTodos = [];
    nextState.todos.map(todo => {
      return localStorageTodos.push(todo);
    });
    const todosStr = JSON.stringify(localStorageTodos);
    localStorage.setItem("todos", todosStr);
  };

  //get todos from local storage

  componentDidMount() {
    const todosFromLocalStorage = JSON.parse(localStorage.getItem("todos"));
    if (!todosFromLocalStorage) {
      this.setState({ todos: [] });
    } else {
      this.setState({ todos: [...todosFromLocalStorage] }, () => {});
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    this.saveToLocalStorage(nextState);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />

            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <div className="todos__container">
                    <Todos
                      className="todo__item"
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      deleteTodo={this.deleteTodo}
                    />
                  </div>
                  <AddTodo addtodo={this.addtodo} />
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
