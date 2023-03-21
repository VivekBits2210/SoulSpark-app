import React, {useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import ProfileSwiper from './ProfileSwiper';   
import staticProfiles from './staticProfiles';
import axios from 'axios';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    setProfiles(staticProfiles);
    // fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://192.168.1.28:8000/ai-profiles/fetch-profiles?n=10');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
      
        if (error.response) {
            console.error('Server response:', error.response.status, error.response.statusText);
        } else if (error.request) {
            console.error('Request config:', error.request);
        } else {
            console.error('General error:', error.message);
        }
    }
  };

  const handleSwipeBack = () => {
    if(swiperRef.current){
        swiperRef.current.swipeBack();
    }
  };

  const handleSwiped = (cardIndex) => {
  };

  const handleSwipedAll = () => {
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'user_profile_image' }} style={styles.profileImage} />
      </View>
      {profiles.length > 0 && <ProfileSwiper profiles={profiles} ref={swiperRef} onSwiped={handleSwiped} onSwipedAll={handleSwipedAll} />}
      <TouchableOpacity style={styles.reverseButton} onPress={handleSwipeBack}>
        <Image source={require('../assets/reverse_icon.png')} style={styles.reverseIcon} />
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F0',
      paddingTop: 20, // Add some padding to the top of the container
      paddingBottom: 20, // Add some padding to the bottom of the container
    },
    header: {
      padding: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    reverseButton: {
      alignSelf: 'center',
      marginBottom: 20,
    },
    reverseIcon: {
      width: 30,
      height: 30,
    },
  });
export default Home;