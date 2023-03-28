import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ThirdScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Third</Text>
      <Button title="Go back" onPress={() => navigation.pop()} />
      <Button
        title="Go back to Main Menu"
        onPress={() => navigation.popToTop()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
