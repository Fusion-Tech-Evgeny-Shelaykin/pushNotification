import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import styles from './CustomButton.styles';

type Props = {
  onPress?: () => void;
  text: string;
  viewStyles?: ViewStyle;
};
const CustomButton = ({onPress, text, viewStyles}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, viewStyles]}
      onPress={onPress || undefined}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
