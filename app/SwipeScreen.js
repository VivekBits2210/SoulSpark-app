import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import Swiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";
import { Card, IconButton, OverlayLabel } from "../components";
import { api_url, user, url_refresh_hack, aws_url, window } from "../constants";
import styles from "./App.styles";
import { useSearchParams } from "expo-router";

const SwipeScreen = ({ route }) => {
  // const { setTabBarOptions } = route.params;
  const { encryption } = useSearchParams();
  const swiperRef = useRef(null);
  const [photoCards, setPhotoCards] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getProfilesForSwipe = (n) => {
    fetch(
      `${api_url}/ai-profiles/fetch-profile?n=${n}&email=${encryption}`
    )
      .then((res) => res.json())
      .then((data) => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          let src = `${aws_url}/${data[i].bot_id}.jpg?url_refresh_hack=${url_refresh_hack}`;
          result.push({
            name: data[i].name,
            age: data[i].age,
            photo: src,
            bio: data[i].bio,
            key: data[i].bot_id,
          });
        }
        setPhotoCards(result);
        setRefreshing(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfilesForSwipe(20);
  }, []);

  useEffect(() => {
    getProfilesForSwipe(20);
  }, []);

  const getBotId = (cardIndex) => {
    const bot_id = photoCards[cardIndex].key;
    fetch(
      `${api_url}/chat-module/fetch-chat-history?lines=0&bot_id=${bot_id}&email=${encryption}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.bot_id) {
          // setTabBarOptions({ tabBarBadge: 1 });
          Toast.show({
            type: "success",
            text1: "Matched",
            text2: `👋 ${json.name} wants to talk to you!`,
          });
          // setMatchedModalVisible({ visible: true, name: json.name });
        }
        if (json.error && json.error === "Already matched with 3") {
          handleSwipeBack();
          Toast.show({
            type: "error",
            text1: "Out of Swipes",
            text2: `You cannot match with more than three profiles!`,
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

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
          {photoCards.length > 0 ? (
            <>
          <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            animateCardOpacity
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
          </View>
          <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <IconButton
              name="close"
              onPress={handleOnSwipedLeft}
              color="white"
              backgroundColor="#E5566D"
              size={window.height / 50}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton
              name="back"
              onPress={handleSwipeBack}
              color="white"
              backgroundColor="#FFB804"
              size={window.height / 50}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton
              name="like1"
              onPress={handleOnSwipedRight}
              color="white"
              backgroundColor="#0071C5"
              size={window.height / 50}
            />
          </TouchableOpacity>
        </View>
        </>
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
        
      </ScrollView>
      <Toast />
    </>
  );
};

export default SwipeScreen;
