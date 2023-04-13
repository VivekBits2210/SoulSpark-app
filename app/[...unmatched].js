import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export default function Unmatched() {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}
