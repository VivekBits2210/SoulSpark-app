import React, { useEffect, useRef, useState } from "react";
import Modal from "react-native-modal";
import Swiper from "react-native-deck-swiper";
import { useRouter } from "expo-router";
import { getProfilesForSwipe } from "./APIFunctions";
// import { photoCards, setPhotoCards } from "../constants";

import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from "react-native";
import { Card, IconButton, OverlayLabel } from "../components";
import styles from "./App.styles";

const SwipeScreen = () => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [photoCards, setPhotoCards] = useState([]);

  const getProfilesForSwipe = (n) => {
    fetch(`https://api-soulspark.com/ai-profiles/fetch-profile?n=${n}`)
      .then((res) => res.json())
      .then((data) => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          let src = `data:image/jpeg;base64,${data[i].profile_image};`;
          result.push({
            name: data[i].name,
            age: data[i].age,
            photo: src,
            key: Math.random() * 1000000,
          });
        }
        setPhotoCards(result);
      });
  };

  useEffect(() => {
    getProfilesForSwipe(20);
  }, []);

  // console.log("HAHA: " + JSON.stringify(photoCards[0]));
  // const photoCards = (async () => {
  //   return await getProfilesForSwipe(20);
  // })().then((res) => console.log(res[0].name));

  const handleOnSwipedLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
  };
  const handleOnSwipedRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
  };

  const handleSwipeBack = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeBack();
    }
  };

  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Swipe carefully, you cannot match with more than three partners!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.swiperContainer}>
        {photoCards.length > 0 ? (
          <Swiper
            ref={swiperRef}
            animateCardOpacity
            containerStyle={styles.container}
            cards={photoCards}
            renderCard={(card) => <Card card={card} />}
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
                title: "NOPE",
                element: <OverlayLabel label="NOPE" color="#E5566D" />,
                style: {
                  wrapper: styles.overlayWrapper,
                },
              },
              right: {
                title: "LIKE",
                element: <OverlayLabel label="LIKE" color="#4CCC93" />,
                style: {
                  wrapper: {
                    ...styles.overlayWrapper,
                    alignItems: "flex-start",
                    marginLeft: 30,
                  },
                },
              },
            }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <IconButton
            name="close"
            onPress={handleOnSwipedLeft}
            color="white"
            backgroundColor="#E5566D"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            name="back"
            onPress={handleSwipeBack}
            color="white"
            backgroundColor="#FFB804"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            name="heart"
            onPress={handleOnSwipedRight}
            color="white"
            backgroundColor="#4CCC93"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.swipeTextContainer}></View>
    </View>
  );
};

export default SwipeScreen;
