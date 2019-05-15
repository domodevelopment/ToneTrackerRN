import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native'
import constants from "../constants"

export default class NotifService {

  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);
    this.lastId = 0;
  }

  configure(onRegister, onNotification, gcm = "") {
    PushNotification.configure({
      onRegister: onRegister,
      onNotification: onNotification,
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  scheduleNotif(details) {
    this.lastId++;
    const guitar = details.name
    let due = new Date(details.timestamp + this.getLife(details));
    PushNotification.localNotificationSchedule({
      userInfo: {id: details.key},
      date: due,
      message: `Time to restring ${guitar}`, 
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif(key) {
    PushNotification.cancelLocalNotifications({id: key});
  }

  getLife = item => {
    const day = 86400000
    let life = 0
    if (!item.coated && item.use === constants.daily) {
      life = day * 30
    } else if (!item.coated && item.use === constants.somedays) {
      life = day * 75
    } else if (!item.coated && item.use === constants.weekly) {
      life = day * 120
    } else if (item.coated && item.use === constants.daily) {
      life = day * 75
    } else if (item.coated && item.use === constants.somedays) {
      life = day * 187
    } else if (item.coated && item.use === constants.weekly) {
      life = day * 300
    }
    if (item.type === constants.bass) {
      life * 2
    }
    return life
  }
}
