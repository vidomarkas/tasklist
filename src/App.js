import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";
import uuid from "uuid";

import "./css/main.css";

class App extends Component {
  state = {
    todos: [],
    sortedTodos: []
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
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  addtodo = (title, body, timeCreated, deadline, unformattedDeadline) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      body,
      timeCreated,
      completed: false,
      deadline,
      unformattedDeadline
    };
    console.log(newTodo);

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
      this.setState(
        { todos: [...todosFromLocalStorage] }
        //  , () => { this.sortTodosByDeadline(); }
      );
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
                      className="todos"
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      deleteTodo={this.deleteTodo}
                      getDeadlinesMiliseconds={this.getDeadlinesMiliseconds}
                    />
                  </div>
                  <AddTodo addtodo={this.addtodo} />
                  <Footer />
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
