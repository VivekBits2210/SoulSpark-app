import React, { useEffect } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SwipeScreen from "./SwipeScreen";
import ChatSelectionScreen from "./ChatSelectionScreen";
import { window } from "../constants";
import { useNavigation } from "expo-router";

const Tab = createBottomTabNavigator();

const MyTabs = (props) => {
  const [tabBarOptions, setTabBarOptions] = React.useState({});
  const handleChatTabPress = () => {
    setTabBarOptions({});
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
        console.log("Back button disabled on My Tab screen");
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { height: window.height * 0.1 },
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Swipe") {
              return (
                <MaterialCommunityIcons
                  name={focused ? "cards" : "cards-outline"}
                  size={window.height / 27}
                  color={color}
                />
              );
            } else if (route.name === "Chat") {
              return (
                <Ionicons
                  name={focused ? "chatbubble" : "chatbubble-outline"}
                  size={window.height / 27}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "black",
        })}
      >
        <Tab.Screen
          name="Swipe"
          component={SwipeScreen}
          initialParams={{ setTabBarOptions: setTabBarOptions, tabBarOptions: tabBarOptions, refreshed: true}}
        />
        <Tab.Screen
          name="Chat"
          component={ChatSelectionScreen}
          options={tabBarOptions}
          listeners={{
            tabPress: handleChatTabPress,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MyTabs;
