import React from "./node_modules/react";
import DatePicker from "./node_modules/react-datepicker";
import "./node_modules/react-datepicker/dist/react-datepicker.css";

class Calendar extends React.Component {
  state = {
    selectedDeadline: new Date()
  };

  handleChange = date => {
    this.setState(
      {
        selectedDeadline: date
      },
      () => {
        this.props.deadline(this.state.selectedDeadline);
      }
    );
  };

  // handleChange = selectedDate => {
  //   const date =
  //     selectedDate.getFullYear() +
  //     "-" +
  //     (selectedDate.getMonth() + 1) +
  //     "-" +
  //     selectedDate.getDate();

  //   const time =
  //     selectedDate.getHours() +
  //     ":" +
  //     selectedDate.getMinutes() +
  //     ":" +
  //     selectedDate.getSeconds();
  //   const deadline = date + " " + time;
  //   this.setState(
  //     {
  //       selectedDeadline: deadline
  //     },
  //     () => {
  //       this.props.deadline(this.state.selectedDeadline);
  //     }
  //   );
  // };

  render() {
    return (
      <DatePicker
        selected={this.state.selectedDeadline}
        onChange={this.handleChange}
        minDate={new Date()}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    );
  }
}

export default Calendar;
