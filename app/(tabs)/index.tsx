import { StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useWindowDimensions } from "react-native";
import { router } from "expo-router";

// Avatars (transparent recommended!)
const avatars: Record<string, any> = {
  coder: require("../../assets/images/avatars/coder.png"),
  therapist: require("../../assets/images/avatars/therapist.png"),
  teacher: require("../../assets/images/avatars/teacher.png"),
  roast: require("../../assets/images/avatars/roast.png"),
};

const personas = [
  { id: "coder", name: "Friendly Coder", desc: "Helpful senior developer." },
  { id: "therapist", name: "Calm Listener", desc: "Empathetic & supportive." },
  { id: "teacher", name: "Patient Teacher", desc: "Explains step-by-step." },
  { id: "roast", name: "Roast Buddy", desc: "Friendly, funny roasting." },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  return (
    <ThemedView style={[styles.container, { paddingTop: 40 }]}>
      <ThemedText style={styles.title}>AI Persona Switcher</ThemedText>

      <ThemedText style={styles.subtitle}>
        Choose a persona to chat with 👇
      </ThemedText>

      <FlatList
        data={personas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 60 }}
        renderItem={({ item, index }) => {
          const bg =
            index % 4 === 0
              ? Colors.card1
              : index % 4 === 1
              ? Colors.card2
              : index % 4 === 2
              ? Colors.card3
              : Colors.card4;

          return (
            <TouchableOpacity
              onPress={() => router.push(`/chat/${item.id}`)}
              style={[styles.card, { backgroundColor: bg, width: width * 0.9 }]}
            >
              <ThemedView style={styles.row}>
                <ThemedView style={styles.avatarWrapper}>
                  <Image
                    source={avatars[item.id]}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </ThemedView>

                <ThemedView style={styles.textContainer}>
                  <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
                  <ThemedText style={styles.cardDesc}>{item.desc}</ThemedText>
                </ThemedView>
              </ThemedView>
            </TouchableOpacity>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.shadow,
  },

  subtitle: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: 6,
  },

  card: {
    padding: 20,
    borderRadius: 30,
    marginBottom: 25,
    borderWidth: 4,
    borderColor: Colors.shadow,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },

  avatarWrapper: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.shadow,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.shadow,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6,
    color: Colors.shadow,
  },

  cardDesc: {
    fontSize: 15,
    opacity: 0.8,
  },
});