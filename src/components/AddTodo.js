import React, { Component } from "react";
import Calendar from "./Calendar";

export class AddTodo extends Component {
  state = {
    title: "",
    body: "",
    timeCreated: null,
    deadline: null,
    unformattedDeadline: null,
    showForm: false
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
        this.state.deadline,
        this.state.unformattedDeadline
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
    this.setState({ unformattedDeadline: deadline });
    const formattedDeadline = this.formatDateFromISO(deadline);
    this.setState({ deadline: formattedDeadline });
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
  componentDidMount() {
    this.myRef = React.createRef();
  }

  render() {
    return (
      <>
        <div
          className="btn-addTodo"
          onClick={() => {
            this.showForm();
            window.scrollTo(0, this.myRef.current.offsetTop);
          }}
        >
          +
        </div>
        <div
          style={
            this.state.showForm ? { display: "block" } : { display: "none" }
          }
          className="addTodo__dialog__background"
        >
          <div
            className="addTodo__dialog"
            style={
              this.state.showForm ? { display: "flex" } : { display: "none" }
            }
          >
            <form
              onSubmit={this.onSubmit}
              className="addTodo__dialog__form"
              action=""
              ref={this.myRef}
            >
              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                maxLength="30"
              />
              <input
                type="text"
                name="body"
                placeholder="Task details"
                value={this.state.body}
                onChange={this.onChangeBody}
              />

              <div className="deadline">
                Deadline:
                <br />
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
          </div>
        </div>
      </>
    );
  }
}

export default AddTodo;
