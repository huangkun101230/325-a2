/* eslint-disable react-native/no-inline-styles */
/*
This component allows us to implement the React Native Progress Circle
This is been used in the ListScreen
*/

import React from 'react';
import {Text} from 'react-native';
import colors from './../configs/colors';

import ProgressCircle from 'react-native-progress-circle';

class circleTimer extends React.Component {
  constructor(props) {
    //this.props allow this component to get values from ListScreen
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

export default circleTimer;
