import React,  { forwardRef } from 'react';
import { Card } from './Card'
import { StyleSheet, View, Text, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
const ProfilesSwiper = forwardRef(({ profiles, onSwiped, onSwipedAll }, ref) => {
  return (
    <View style={styles.container}>
      <Swiper
        ref={ref}
        cards={profiles}
        renderCard = {card => <Card card= {card} />}
        // renderCard={(profile) => (
        //   <View style={styles.slide}>
        //     <Image
        //       source={profile.profile_image}
        //       resizeMode="cover"
        //       style={styles.cardImage}
        //     />
        //     <Text style={styles.cardText}>
        //       {profile.name}, {profile.age}
        //     </Text>
        //     <Text style={styles.cardText}>{profile.bio}</Text>
        //   </View>
        // )}
        onSwiped={(cardIndex) => onSwiped(cardIndex)}
        onSwipedAll={() => onSwipedAll()}
        // cardIndex={currentIndex}
        backgroundColor="transparent"
        stackSize={10}
        showSecondCard={true}
        disableBottomSwipe={true}
        disableTopSwipe={true}
        stackAnimationFriction={15}
        animateCardOpacity  
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 1,
  },
  cardImage: {
    width: '100%',
    height: 400,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 1,
    paddingVertical:1
  },
});

export default ProfilesSwiper;
