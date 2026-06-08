import { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import * as Notifications from 'expo-notifications';


export default function HomeScreen() {
  //detects if device is in dark or light mode
  const colorScheme = useColorScheme() ?? 'light';
  // Picks correct color based on light/dark theme
  const theme = COLORS[colorScheme];

  // Request permission when screen loads
  useEffect(() => {
    async function requestPermission() {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please enable notifications to use this feature."
        );
      }
    }

    requestPermission();
  }, []);

  //Trigger notification immediately
  const sendNotification = async () => {
    const permission = await Notifications.getPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert("No permission, please enable notifications first!");
      
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Push Notification",
        body: "You successfully sent the push notification!",
      },
      trigger: null, // <--  to "send immediately"
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.title }]}>Push Notification App</Text>
      <Text style={[styles.subtitle, { color: theme.subtitle }]}>
        Manage your notification preferences and send a notification.
      </Text>
      <Pressable style={[styles.button, { backgroundColor: theme.button }]} onPress={sendNotification}>
        <Text style={[styles.buttonText, { color: theme.text }]}>Send Notification</Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
