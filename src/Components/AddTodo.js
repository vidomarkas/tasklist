import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: "",
    showForm: false
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

  showForm = () => {
    this.setState({ showForm: true }, () => {
      console.log(this.state.showForm);
    });
    console.log("click");
  };
  render() {
    return (
      <div className="addTodo" onClick={this.showForm}>
        +
        <form
          className="addTodo__form"
          onSubmit={this.onSubmit}
          action=""
          style={
            this.state.showForm ? { display: "block" } : { display: "none" }
          }
        >
          <input
            type="text"
            name="title"
            placeholder="Add todo ..."
            value={this.state.title}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="+"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}

export default AddTodo;
