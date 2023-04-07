import React from "react";
import WelcomeCarouselScreen from "./WelcomeCarouselScreen";
import { LogBox } from 'react-native';
// import { StatusBar } from 'expo-status-bar';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function Home() {
  return <WelcomeCarouselScreen />;
}
