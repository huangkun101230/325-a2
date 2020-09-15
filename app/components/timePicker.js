import React from 'react';
import {Button, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

class timePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  handleConfirm = (date) => {
    date = moment(date).format('MMM, Do YYYY HH:mm'); //format date e.g. 'Sep, 16th 2020 19:50'
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
        headerTextIOS={this.props.pickerTitle} //current picker title
        onConfirm={this.handleConfirm}
        onCancel={this.handleClick}
      />
    );
  }
}

export default timePicker;
