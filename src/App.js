import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./Components/Todos";
import Header from "./Components/layout/Header";
import AddTodo from "./Components/AddTodo";
import About from "./Components/pages/About";

import uuid from "uuid";

import "./App.css";

class App extends Component {
  state = {
    todos: []
  };

  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  deleteTodo = id => {
    console.log(this.state);
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
    console.log(this.state);
  };

  addtodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
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
      this.setState({ todos: [...todosFromLocalStorage] });
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
                  <AddTodo addtodo={this.addtodo} />

                  <Todos
                    className="todoItem"
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    deleteTodo={this.deleteTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
