import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SwipeScreen from "./SwipeScreen";
import ChatSelectionScreen from "./ChatSelectionScreen";
import { useEffect } from "react";
import { encrypEmail } from "../constants";
import { useFocusEffect } from "expo-router";
const Tab = createBottomTabNavigator();


const MyTabs = (props) => {
  const [tabBarOptions, setTabBarOptions] = React.useState({});
  const handleChatTabPress = () => {
    setTabBarOptions({});
  };

  // const getSelectedProfiles = () => {
  //   fetch(
  //     `https://api-soulspark.com/chat-module/fetch-selected-profiles?email=${encrypEmail}`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       json.data.length==0?setTabBarOptions({}):setTabBarOptions({tabBarBadge:json.data.length});
  //     });
  // };

  // useFocusEffect(React.useCallback(getSelectedProfiles, []));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Swipe") {
              return (
                <MaterialCommunityIcons
                  name={focused ? "cards" : "cards-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Chat") {
              return (
                <Ionicons
                  name={focused ? "chatbubble" : "chatbubble-outline"}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "black",
        })} 
      >
        <Tab.Screen name="Swipe" component={SwipeScreen} initialParams={{"setTabBarOptions":setTabBarOptions}}
         />
        <Tab.Screen name="Chat" component={ChatSelectionScreen}
        options={tabBarOptions} listeners={{
            tabPress: handleChatTabPress,
          }}
          />
      </Tab.Navigator>
    </View>
  );
}

export default MyTabs;
