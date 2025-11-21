import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

import { useState, useRef } from "react";
import { Colors } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ✅

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets(); // ✅
  const styles = createStyles(width);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      from: "ai",
      text: `Hello! I'm persona ${id}. How can I help you today?`,
    },
  ]);

  const flatListRef = useRef<FlatList<any>>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      from: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMsg]);

    const input = message;
    setMessage("");

    try {
      const formattedHistory = [
        ...messages.map((msg) => ({
          role: msg.from === "user" ? "user" : "assistant",
          content: msg.text,
        })),
        { role: "user", content: input },
      ];

      const response = await fetch("https://ai-persona-switcher-backend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personaKey: id,
          messages: formattedHistory,
        }),
      });

      const data = await response.json();

      const aiMsg = {
        id: Date.now().toString() + "_ai",
        from: "ai",
        text: data.reply || "",
      };

      setMessages((prev) => [...prev, aiMsg]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    } catch (error) {
      console.log("Error chatting with backend:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: insets.top }} // ✅ Fix notch overlay
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ThemedView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messagesContainer,
            { paddingBottom: insets.bottom + 90 }, // ✅ keep messages above keyboard + home bar
          ]}
          renderItem={({ item }) => (
            <ThemedView
              style={[
                styles.bubble,
                item.from === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <ThemedText>{item.text}</ThemedText>
            </ThemedView>
          )}
        />

        <ThemedView
          style={[
            styles.inputRow,
            { paddingBottom: insets.bottom + 8 }, // ✅ keeps input above home indicator
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <ThemedText>Send</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (width: number) =>
  StyleSheet.create({
    container: { flex: 1 },

    messagesContainer: {
      padding: 20,
      paddingBottom: 80,
    },

    bubble: {
      padding: 14,
      borderRadius: 24,
      marginBottom: 12,
      maxWidth: width * 0.75,

      borderWidth: 3,
      borderColor: Colors.shadow,
      backgroundColor: "#FFF",
      shadowColor: Colors.shadow,
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
    },

    userBubble: {
      alignSelf: "flex-end",
      backgroundColor: Colors.bubbleUser,
    },

    aiBubble: {
      alignSelf: "flex-start",
      backgroundColor: Colors.bubbleAI,
    },

    inputRow: {
      flexDirection: "row",
      padding: 10,
      backgroundColor: "#FFF",

      borderTopWidth: 3,
      borderTopColor: Colors.shadow,
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 1,
      elevation: 10,
    },

    input: {
      flex: 1,
      backgroundColor: "#EEE",
      padding: 12,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.shadow,
      color: "#000",
    },

    sendButton: {
      marginLeft: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: Colors.card2,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.shadow,
      shadowColor: Colors.shadow,
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1,
    },
  });
