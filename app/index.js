import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Stack, useRouter } from 'expo-router';
import { photoCards } from '../constants'
import { Card, IconButton, OverlayLabel, ScreenHeaderBtn } from '../components'
import styles from './App.styles'
const SwipeScreen = () => {
  const router = useRouter();
  const swiperRef = useRef(null);

  const handleOnSwipedLeft = () => {}
  const handleOnSwipedTop = () => {}
  const handleOnSwipedRight = () => {}

  const handleSwipeBack = () => {
      if(swiperRef.current){
          swiperRef.current.swipeBack();
      }
    };

  return (
  <View>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          animateCardOpacity
          containerStyle={styles.container}
          cards={photoCards}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={4}
          infinite
          showSecondCard
          animateOverlayLabelsOpacity
          disableBottomSwipe={true}
          disableTopSwipe={true}
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <OverlayLabel label="NOPE" color="#E5566D" />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'LIKE',
              element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>

        <TouchableOpacity><IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        /></TouchableOpacity>
        <TouchableOpacity><IconButton
          name="back"
          onPress={handleSwipeBack}
          color="white"
          backgroundColor="#FFB804"
        /></TouchableOpacity>
        <TouchableOpacity><IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        /></TouchableOpacity>
      </View>
      <View style={styles.swipeTextContainer}>
      </View>
  </View>
  )
}

function ChatScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      <Text>Chat Window!</Text>
    </View>
  );
}

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
              } else if (route.name === 'Chat') {

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
            tabBarActiveTintColor: 'tomato',
          })}
        >
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function Home() {
return (
<View
style={styles.container}
>
  <Stack.Screen options={{
  headerStyle: { backgroundColor: "black"},
  headerShadowVisible: false,
  headerLeft: () => {
  return <Text style={{color:"white"}}>Soulspark Logo</Text>
  },
  headerRight: () => {
  return <ScreenHeaderBtn iconUrl={require('../assets/profile.jpg')} dimension="100%" />
  },
  headerTitle: ""
  }}
  />
<MyTabs />
</View>
  );
}
