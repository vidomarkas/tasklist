import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: ""
  };

  onChange = e => {
    this.setState({ title: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title) {
      this.props.addtodo(this.state.title);
    }
    this.setState({ title: "" });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }} action="">
        <input
          type="text"
          name="title"
          placeholder="Add todo ..."
          style={{ flex: "10", padding: "5px" }}
          value={this.state.title}
          onChange={this.onChange}
        />
        <input type="submit" value="+" className="btn" style={{ flex: "1" }} />
      </form>
    );
  }
}

export default AddTodo;
