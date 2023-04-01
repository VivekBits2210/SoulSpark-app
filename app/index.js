import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import styles from "./App.styles";
import MyTabs from "./MyTabs";
import { fetchProfile } from "./APIFunctions";

export default function Home() {
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <View style={styles.globalContainer}>
      <MyTabs />
    </View>
  );
}
