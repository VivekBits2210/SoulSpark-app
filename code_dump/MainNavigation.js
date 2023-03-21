import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {useTailwind} from 'tailwind-rn';

import ProfileSwiper from './ProfileSwiper';
import HeaderBar from './HeaderBar';

const Stack = createStackNavigator();

export default function MainNavigation() {
const tailwind = useTailwind();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: tailwind('bg-primary'),
          headerTintColor: tailwind('text-white'),
        }}>
        <Stack.Screen
          name="ProfileSwiper"
          component={ProfileSwiper}
          options={{
            headerTitle: () => <HeaderBar />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}