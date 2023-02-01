import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import defaultStyles from './style';

type Props = {
  onPress?: () => void;
  text: string;
  viewStyles?: ViewStyle;
};
const CustomButton = ({onPress, text, viewStyles}: Props) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.container, viewStyles]}
      onPress={onPress || undefined}>
      <Text style={defaultStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
