import React, { useEffect, useRef, useState } from "react";
import Modal from "react-native-modal";
import Swiper from "react-native-deck-swiper";
import { useRouter } from "expo-router";
import { getProfilesForSwipe } from "./APIFunctions";
import { encrypEmail, random_number } from "../constants";
import Toast from 'react-native-toast-message';


import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from "react-native";
import { Card, IconButton, OverlayLabel } from "../components";
import styles from "./App.styles";
import { ActivityIndicator } from "react-native-paper";

const SwipeScreen = ({ route }) => {
  const { getSelectedProfiles } = route.params;
  const router = useRouter();
  const swiperRef = useRef(null);
  const [photoCards, setPhotoCards] = useState([]);
  const [matchedModalVisible, setMatchedModalVisible] = useState({
    visible: false,
    name: null,
  });
  const [limitedModalVisible, setLimitedModalVisible] = useState(false);

  const getProfilesForSwipe = (n) => {
    fetch(
      `https://api-soulspark.com/ai-profiles/fetch-profile?n=${n}&email=${encrypEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          let src = `https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com/${data[i].bot_id}.jpg?random_number=${random_number}`;
          result.push({
            name: data[i].name,
            age: data[i].age,
            photo: src,
            bio: data[i].bio,
            key: data[i].bot_id,
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

  const getBotId = (cardIndex) => {
    const bot_id = photoCards[cardIndex].key;
    fetch(
      `https://api-soulspark.com/chat-module/fetch-chat-history?lines=0&bot_id=${bot_id}&email=${encrypEmail}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("IMPORTANT ANSWER", json);
        if (json.bot_id){
          getSelectedProfiles();
          Toast.show({
            type: 'success',
            text1: 'Matched',
            text2: `👋 ${json.name} wants to talk to you!`
          });
          // setMatchedModalVisible({ visible: true, name: json.name });
        }
        if (json.error && json.error === "Already matched with 3") {
          handleSwipeBack();
          Toast.show({
            type: 'error',
            text1: 'Out of Swipes',
            text2: `You cannot match with more than three profiles!`
          });
          // setLimitedModalVisible(true);
        }
      });
  };

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
    <>
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      {/*<Modal
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
      </Modal>*/}
      {/* <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={matchedModalVisible.visible}
        onRequestClose={() => {
          setMatchedModalVisible({ visible: false, name: null });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {`${matchedModalVisible.name} wants to talk to you!`}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setMatchedModalVisible({
                  visible: false,
                  name: null,
                })
              }
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
      {/*<Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={limitedModalVisible}
        onRequestClose={() => {
          setLimitedModalVisible(!limitedModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              You have already matched with 3 profiles!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setLimitedModalVisible(!limitedModalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>*/}
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
            infinite={true}
            stackSize={2}
            showSecondCard
            animateOverlayLabelsOpacity
            disableBottomSwipe={true}
            disableTopSwipe={true}
            onSwipedRight={getBotId}
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
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
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
            name="like1"
            onPress={handleOnSwipedRight}
            color="white"
            backgroundColor="#0071C5"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
    <Toast />
    </>
  );
};

export default SwipeScreen;
