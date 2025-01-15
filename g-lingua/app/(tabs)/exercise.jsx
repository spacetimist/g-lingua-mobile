import { View, Text, StyleSheet } from "react-native";

export default function Exercise() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});