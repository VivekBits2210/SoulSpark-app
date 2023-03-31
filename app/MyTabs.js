import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SwipeScreen from './SwipeScreen';
import ChatScreen from './ChatScreen';
import ChatSelectionScreen from './ChatSelectionScreen';

const Tab = createBottomTabNavigator();



function MyTabs() {
    return (
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
                } else {
  
                  return (
                    <Ionicons
                      name={focused ? 'chatbubble' : 'chatbubble-outline'}
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
        {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
        <Tab.Screen name="Chat" component={ChatSelectionScreen} />
      </Tab.Navigator>
    );
}

export default MyTabs;