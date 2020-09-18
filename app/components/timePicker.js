/*
This component allows us to implement the date time picker
slide from bottom, display as the normal ios time picker
This is been used in the PostScreen and EditScreen for choosing start date and due date
*/

import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class timePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  handleConfirm = (date) => {
    this.props.parentReference(date); //passing date back to parent
    this.handleClick();
  };

  //this is the function from parent
  //for turnning on/off this component
  handleClick = () => {
    this.props.toggleShow();
  };

  render() {
    return (
      <DateTimePickerModal
        isVisible={this.handleClick}
        mode="datetime"
        locale="en_GB" // 24 hours in IOS
        date={this.props.date} //privious date
        headerTextIOS={this.props.pickerTitle} //current picker title
        onConfirm={this.handleConfirm}
        onCancel={this.handleClick}
      />
    );
  }
}

export default timePicker;
