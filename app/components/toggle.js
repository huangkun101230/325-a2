import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import colors from './../configs/colors';

const Toggle = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={cusStyles.container}>
      <Text style={{marginBottom: 8}}>Choose your language: </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={cusStyles.label}>
          {isEnabled ? <Text>English</Text> : <Text>Chinese</Text>}
        </View>
        <Switch
          trackColor={{false: colors.shadow, true: colors.primary}}
          thumbColor={isEnabled ? colors.white : colors.yellow}
          ios_backgroundColor={colors.red}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const cusStyles = StyleSheet.create({
  container: {
    flex: 0,
    paddingVertical: 8,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  label: {
    marginRight: 10,
  },
});

export default Toggle;
