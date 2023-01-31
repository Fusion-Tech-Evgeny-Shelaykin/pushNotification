import React, {useMemo} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import error from '../assets/error.png';
import help from '../assets/help.png';
import success from '../assets/success.png';
import warning from '../assets/warning.png';

type PushProps = {
  description: string;
  typeMess: 'err' | 'warn' | 'help' | 'success';
};

const PushNotifire: React.FC<PushProps> = ({description, typeMess}) => {
  const color = useMemo(() => {
    if (typeMess === 'err') {
      return 'red';
    }
    if (typeMess === 'help') {
      return 'blue';
    }
    if (typeMess === 'success') {
      return 'green';
    }
    if (typeMess === 'warn') {
      return 'yellow';
    }
  }, [typeMess]);

  const icon = useMemo(() => {
    if (typeMess === 'err') {
      return error;
    }
    if (typeMess === 'help') {
      return help;
    }
    if (typeMess === 'success') {
      return success;
    }
    if (typeMess === 'warn') {
      return warning;
    }
  }, [typeMess]);
  console.log('type-color=======', color);

  return (
    <View
      style={[styles.container, {backgroundColor: color ? color : 'white'}]}>
      <Image source={icon} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default PushNotifire;
