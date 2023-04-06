import React from "react";
import { View } from "react-native";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SwipeScreen from "./SwipeScreen";
import ChatSelectionScreen from "./ChatSelectionScreen";
import WelcomeCarouselScreen from "./WelcomeCarouselScreen";
import Coffee from "./Coffee";
import { encrypEmail } from "../constants";
const Tab = createBottomTabNavigator();

const MyTabs = (props) => {
  // const { numProfiles } = props;
  // const ref = React.useRef(null);
  // useEffect(() => {
  //   fetch(
  //     `https://api-soulspark.com/chat-module/fetch-selected-profiles?email=${encrypEmail}`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.data.length !== 0) {
  //         ref.setTab(1);
  //       }
  //       console.log("My tabs: ", json);
  //     });
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Tab.Navigator
        // ref={ref}
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
            // else if (route.name == "Welcome") {
            //   return (
            //     <Ionicons
            //       name={focused ? "walk" : "walk-outline"}
            //       size={size}
            //       color={color}
            //     />
            //   );
            // }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "black",
        })}
      >
        <Tab.Screen name="Swipe" component={SwipeScreen} />
        <Tab.Screen name="Chat" component={ChatSelectionScreen} options={{ tabBarBadge: 2 }} />
        {/* <Tab.Screen name="Welcome" component={WelcomeCarouselScreen} /> */}
      </Tab.Navigator>
    </View>
  );
}

export default MyTabs;
