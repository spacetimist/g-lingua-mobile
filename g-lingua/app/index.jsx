import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/images/adaptive_icon.png")} 
        style={styles.icon} 
      />
      <Text style={styles.title}>Welcome to G-Lingua</Text>
      <Text style={styles.subtitle}>
        Start learning languages with ease and fun!
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/(tabs)/home")} // Navigasi ke tab home
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0E3CA",
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "#F0E3CA",
    fontSize: 16,
    fontWeight: "bold",
  },
});