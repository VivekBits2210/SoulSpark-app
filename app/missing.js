import { ActivityIndicator } from "react-native-paper";

export default function Missing() {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}