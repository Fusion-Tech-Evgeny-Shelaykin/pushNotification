import {Notifier, NotifierComponents} from 'react-native-notifier';

type NotifireProps = {
  description: string;
  imgUrl: string;
};

class CustomPushNotifier {
  constructor(params: NotifireProps) {
    this.description = params.description;
    this.imgUrl = params.imgUrl;
  }
  private description;
  private imgUrl;

  Show = () =>
    Notifier.showNotification({
      description: this.description,
      Component: NotifierComponents.Notification,
      componentProps: {
        imageSource: require('imgUrl'),
      },
    });
}

export default CustomPushNotifier;
