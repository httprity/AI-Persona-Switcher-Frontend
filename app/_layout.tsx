import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/theme";
import { View } from "react-native";

/**
 * This is the root layout for the entire app.
 * It wraps all routes, including the tabs layout.
 */
export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Expo router navigator */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: Colors.background },
        }}
      />

      {/* Status bar styling */}
      <StatusBar style="dark" />
    </View>
  );
}
