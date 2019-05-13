import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native'

export default class NotifService {

  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);

    this.lastId = 0;
  }

  configure(onRegister, onNotification, gcm = "") {
    PushNotification.configure({

        onRegister: onRegister, //this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification, //this._onNotification,

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

//   localNotif() {
//     this.lastId++;
//     PushNotification.localNotification({
//       alertAction: 'view', // (optional) default: view
    //   category: null, // (optional) default: null
    //   userInfo: null, // (optional) default: null (object containing additional notification data)
    //   title: "Local Notification", // (optional)
    //   message: "My Notification Message", // (required)
    //   playSound: false, // (optional) default: true
    //   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //   number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//     });
//   }

  scheduleNotif(details) {
    this.lastId++;
    const guitar = details.name
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + (10 * 1000)), // in 30 secs

    //   alertAction: 'view', // (optional) default: view
    //   category: null, // (optional) default: null
    //   userInfo: null, // (optional) default: null (object containing additional notification data)
    //   title: "Scheduled Notification", // (optional)
      message: `Time to restring ${guitar}`, // (required)
    //   playSound: true, // (optional) default: true
    //   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: ''+this.lastId});
  }
}
