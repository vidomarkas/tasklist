import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  render() {
    return (
      <DatePicker
        selected={this.state.selectedDeadline}
        onChange={this.handleChange}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        customInput={<CustomInput />}
      />
    );
  }
}

class CustomInput extends Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <div className="calendar__custom__input" onClick={onClick}>
        {value}
      </div>
    );
  }
}

export default Calendar;
