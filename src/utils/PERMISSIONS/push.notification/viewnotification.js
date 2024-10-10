import * as Notifications from 'expo-notifications';

export async function showNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: true,
    },
    trigger: { seconds: 4},
  });
}
