import {StyleSheet} from 'react-native';

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      borderRadius: 5,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    description: {
      marginLeft: 10,
      color: 'black',
      fontWeight: 'bold',
    },
  });

export default styles;
