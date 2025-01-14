import { useEffect } from "react";
import { Alert, Linking } from "react-native";

import messaging from "@react-native-firebase/messaging";
import { openSettings } from "expo-linking";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

const requestPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      Alert.alert(
        "Open Settings",
        "You currently have notifications turned off for this application. You can open Settings to re-enable them",
        [
          { text: "Cancel" },
          {
            text: "Open Settings",
            onPress: async () => {
              openSettings();
            },
          },
        ],
        { cancelable: false },
      );
    }
  }
};

const useNotifications = () => {
  useEffect(() => {
    requestPermissions();

    const handleInitialNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();

      if (response) {
        const deepLink = response.notification.request.content.data?.deepLink;
        if (deepLink) {
          setTimeout(() => {
            Linking.openURL(deepLink);
          }, 1000);
        }
      }
    };

    handleInitialNotification();

    messaging().onMessage(async (remoteMessage) => {
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data,
      };

      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    });

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          const deepLink = response.notification.request.content.data?.deepLink;
          if (deepLink) {
            Linking.openURL(deepLink);
          }
        },
      );

    return () => {
      responseSubscription.remove();
    };
  }, []);
};

export default useNotifications;
