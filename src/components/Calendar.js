import React from "react";
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
        // minDate={new Date()}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        customInput={<ExampleCustomInput />}
      />
    );
  }
}

const ExampleCustomInput = ({ value, onClick }) => (
  <div className="calendar__custom__input" onClick={onClick}>
    {value}
  </div>
);

export default Calendar;
