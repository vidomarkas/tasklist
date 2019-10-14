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
    if (this.state.title) {
      this.props.addtodo(
        this.state.title,
        this.state.body,
        this.state.timeCreated,
        this.state.deadline,
        this.state.unformattedDeadline
      );
      this.hideForm();
    }
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
    this.setState({ showForm: false, title: "", body: "" });
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
            {/* <div
              className={
                this.state.showForm
                  ? "addTodo__dialog__image addTodo__dialog__image--rotate"
                  : "addTodo__dialog__image "
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 496.158 496.158"
                style={{ enableBackgroundNew: "0 0 496.158 496.158" }}
                xmlSpace="preserve"
                width="100px"
                height="100px"
                class=""
              >
                <g>
                  <path
                    style={{ fill: "#2ECC7150" }}
                    d="M0,248.085C0,111.063,111.069,0.003,248.075,0.003c137.013,0,248.083,111.061,248.083,248.082  c0,137.002-111.07,248.07-248.083,248.07C111.069,496.155,0,385.087,0,248.085z"
                    data-original="#32BEA6"
                    class=""
                    data-old_color="#32BEA6"
                  />
                  <path
                    style={{ fill: "#FFFFFF" }}
                    d="M383.546,206.55H289.08v-93.938c0-3.976-3.224-7.199-7.201-7.199H213.75  c-3.977,0-7.2,3.224-7.2,7.199v93.938h-93.937c-3.977,0-7.2,3.225-7.2,7.2v69.187c0,3.976,3.224,7.199,7.2,7.199h93.937v93.41  c0,3.976,3.224,7.199,7.2,7.199h68.129c3.978,0,7.201-3.224,7.201-7.199v-93.41h94.466c3.976,0,7.199-3.224,7.199-7.199V213.75  C390.745,209.774,387.521,206.55,383.546,206.55z"
                    data-original="#FFFFFF"
                    class="active-path"
                    data-old_color="#FFFFFF"
                  />
                </g>
              </svg>
            </div> */}

            <h2 className="addTodo__dialog__heading">Add new Task</h2>
            <form
              onSubmit={this.onSubmit}
              className="addTodo__dialog__form"
              action=""
              ref={this.myRef}
            >
              <input
                className="addTodo__dialog__field"
                type="text"
                name="title"
                placeholder="Task title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                maxLength="30"
                required
              />
              <textarea
                className="addTodo__dialog__field addTodo__dialog__field--details"
                type="text"
                name="body"
                placeholder="Task details"
                value={this.state.body}
                onChange={this.onChangeBody}
              />

              <div className="addTodo__dialog__deadline">
                Deadline:
                <br />
                <Calendar deadline={this.selectedDeadline} />
              </div>
              <div className="addTodo__dialog__controls">
                <input
                  type="submit"
                  value="Add"
                  className="btn btn-add"
                  onClick={() => {
                    this.createDate();
                  }}
                />
                <button className="btn btn-cancel" onClick={this.hideForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default AddTodo;
