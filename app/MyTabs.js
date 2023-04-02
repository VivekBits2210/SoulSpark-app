import React from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SwipeScreen from './SwipeScreen';
import ChatSelectionScreen from './ChatSelectionScreen';
import WelcomeCarouselScreen from './WelcomeCarouselScreen';
const Tab = createBottomTabNavigator();



function MyTabs() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
    <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Swipe') {
                  return (
                    <MaterialCommunityIcons
                      name={
                        focused
                          ? 'cards'
                          : 'cards-outline'
                      }
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === 'Chat') {
  
                  return (
                    <Ionicons
                      name={focused ? 'chatbubble' : 'chatbubble-outline'}
                      size={size}
                      color={color}
                    />
                  );
                }
                else {
  
                  return (
                    <Ionicons
                      name={focused ? 'walk' : 'walk-outline'}
                      size={size}
                      color={color}
                    />
                  );
                }
              },
              tabBarInactiveTintColor: 'gray',
              tabBarActiveTintColor: 'black',
            })}
          >
        <Tab.Screen name="Swipe" component={SwipeScreen} />
        <Tab.Screen name="Chat" component={ChatSelectionScreen} />
        <Tab.Screen name="Welcome" component={WelcomeCarouselScreen} />
      </Tab.Navigator>
      </View>
    );
}

export default MyTabs;