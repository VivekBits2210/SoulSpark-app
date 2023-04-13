import { ActivityIndicator } from "react-native-paper";
import { Text,View } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Unmatched() {
  const router = useRouter();
  useEffect(() => {
    router.replace("");
  });

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