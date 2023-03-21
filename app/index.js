import { Chat, MessageType } from '@flyerhq/react-native-chat-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Stack, useRouter } from 'expo-router';
import { photoCards } from '../constants'
import { Card, IconButton, OverlayLabel, ScreenHeaderBtn } from '../components'
import styles from './App.styles'

const SwipeScreen = () => {
  const router = useRouter();
  const swiperRef = useRef(null);

  const handleOnSwipedLeft = () => {
    if(swiperRef.current){
        swiperRef.current.swipeLeft();
    }
  }
  const handleOnSwipedRight = () => {
    if(swiperRef.current){
          swiperRef.current.swipeRight();
     }
  }

  const handleSwipeBack = () => {
      if(swiperRef.current){
          swiperRef.current.swipeBack();
      }
    };

  return (
  <View style={styles.container}>
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
    const uuidv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16)
        const v = c === 'x' ? r : (r % 4) + 8
        return v.toString(16)
      })
    }
    const [messages, setMessages] = useState([]);
     const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Chat
              messages={messages}
              onSendPress={handleSendPress}
              user={user}
            />
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
            tabBarActiveTintColor: 'black',
          })}
        >
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function Home() {
return (
<View style={styles.globalContainer}
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
