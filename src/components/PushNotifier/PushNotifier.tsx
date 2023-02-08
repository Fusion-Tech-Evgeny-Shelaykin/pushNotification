import React, {FC, useMemo} from 'react';
import {View, Text} from 'react-native';
import Error from '../../assets/error.svg';
import Help from '../../assets/info.svg';
import Success from '../../assets/success.svg';
import Warning from '../../assets/warning.svg';
import styles from './PushNotifier.styles';

type PushProps = {
  description: string;
  typeMess: 'err' | 'warn' | 'help' | 'success';
};

const PushNotifire: FC<PushProps> = ({description, typeMess}: PushProps) => {
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
    return 'white';
  }, [typeMess]);

  const Icon = useMemo(() => {
    if (typeMess === 'err') {
      return <Error />;
    }
    if (typeMess === 'help') {
      return <Help />;
    }
    if (typeMess === 'success') {
      return <Success />;
    }
    if (typeMess === 'warn') {
      return <Warning />;
    }
  }, [typeMess]);

  return (
    <View style={styles(color).container}>
      {Icon}
      <Text style={styles().description}>{description}</Text>
    </View>
  );
};

export default PushNotifire;
