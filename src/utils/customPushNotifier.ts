import {Notifier} from 'react-native-notifier';

type PushProps = {
  description: string;
  typeMess: 'err' | 'warn' | 'help' | 'success';
};

type NotifireProps = {
  PushComponent: ({description, typeMess}: PushProps) => JSX.Element;
  description: string;
  typeMess: 'err' | 'warn' | 'help' | 'success';
};

export const showNotifier = (props: NotifireProps) =>
  Notifier.showNotification({
    description: props.description,
    Component: props.PushComponent,
    componentProps: {
      typeMess: props.typeMess,
      description: props.description,
    },
  });
