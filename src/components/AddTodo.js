import React, { Component } from "react";
import Calendar from "./Calendar";

export class AddTodo extends Component {
  state = {
    title: "",
    body: "",
    showForm: false,
    timeCreated: null,
    deadline: null
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  onChangeBody = e => {
    this.setState({ body: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.body) {
      this.props.addtodo(
        this.state.title,
        this.state.body,
        this.state.timeCreated,
        this.state.deadline
      );
      this.hideForm();
    }
    this.setState({ title: "", body: "" });
  };

  //convert date and show deadline
  formatDateFromISO = deadline => {
    const selectedDate = new Date(deadline);
    const date =
      selectedDate.getFullYear() +
      "/" +
      (selectedDate.getMonth() + 1) +
      "/" +
      selectedDate.getDate();

    const time =
      selectedDate.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      ":" +
      selectedDate.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      ":" +
      selectedDate.getSeconds().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });

    return date + " " + time;
  };

  showForm = () => {
    this.setState({ showForm: true });
  };

  hideForm = () => {
    this.setState({ showForm: false }, () => {});
  };

  selectedDeadline = deadline => {
    const formatedDeadline = this.formatDateFromISO(deadline);
    this.setState({ deadline: formatedDeadline });
  };

  createDate = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();

    const time =
      today.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      ":" +
      today.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    // +
    // ":" +
    // today.getSeconds().toLocaleString("en-US", {
    //   minimumIntegerDigits: 2,
    //   useGrouping: false
    // });
    this.setState({ timeCreated: date + " " + time });
  };

  render() {
    return (
      <>
        <div className="btn-addTodo" onClick={this.showForm}>
          +
        </div>
        <form
          className="addTodo__dialog"
          onSubmit={this.onSubmit}
          action=""
          style={
            this.state.showForm ? { display: "block" } : { display: "none" }
          }
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChangeTitle}
            maxLength="30"
          />
          <input
            type="text"
            name="body"
            placeholder="Add todo ..."
            value={this.state.body}
            onChange={this.onChangeBody}
          />

          <div className="deadline">
            Deadline:
            <Calendar deadline={this.selectedDeadline} />
          </div>
          <input
            type="submit"
            value="Add"
            className="btn btn-add"
            style={{ flex: "1" }}
            onClick={() => {
              this.createDate();
            }}
          />
          <button className="btn btn-cancel" onClick={this.hideForm}>
            Cancel
          </button>
        </form>
      </>
    );
  }
}

export default AddTodo;
