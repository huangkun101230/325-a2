import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from './../configs/colors';
import styles from './../configs/styles';

import ProgressCircle from 'react-native-progress-circle';

class circleTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ProgressCircle
        percent={this.props.percent}
        radius={60}
        borderWidth={15}
        color={this.props.fillColor}
        shadowColor={colors.lightGray}
        bgColor={this.props.backgroundColor}>
        <Text style={{fontSize: 24, color: colors.white, fontWeight: '700'}}>
          {this.props.stringPercent}%
        </Text>
      </ProgressCircle>
    );
  }
}

const cusStyles = StyleSheet.create({
  textPos: {
    position: 'absolute',
    left: 22,
    top: 37,
  },
  text: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 30,
  },
});
export default circleTimer;
