import React, { useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Stack, useRouter } from 'expo-router';
import { photoCards } from '../constants'
import { Card, IconButton, OverlayLabel, ScreenHeaderBtn } from '../components'
import styles from './App.styles'

const Home = () => {
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

export default Home
