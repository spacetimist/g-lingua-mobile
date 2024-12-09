import { Text, View, Image, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/adaptive_icon.png")} style={styles.icon} />
      <Text style={styles.title}>Welcome to G-Lingua</Text>
      <Text style={styles.subtitle}>
        Start learning languages with ease and fun!
      </Text>
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
});
