import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackActions } from "@react-navigation/native";

export default function SecondScreen({ navigation, route }) {
  let language = route.params.language;
  let greeting = language === "english" ? "Hello" : "Bonjour";
  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <Button
        title="Go to Third Screen"
        onPress={() => navigation.push("Third")}
      />
      <Button
        title="Go to Third Screen with replace"
        onPress={() => {
          navigation.dispatch(StackActions.replace("Third"));
        }}
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
