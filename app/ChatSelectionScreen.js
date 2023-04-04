import * as React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect } from "react";
import { SBItem, SBItemChatSelect } from "../components/SBItem";
import SButton from "../components/SButton";
import { useRouter } from "expo-router";
import { encrypEmail, window } from "../constants";
import { useState } from "react";

const PAGE_WIDTH = window.width;

export default function ChatSelectionScreen() {
  const [data, setData] = React.useState([...new Array(4).keys()]);
  // const [isFast, setIsFast] = React.useState(false);
  // const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef(null);
  const [chats, setChats] = useState([]);

  const getSelectedProfiles = () => {
    fetch(
      `https://api-soulspark.com/chat-module/fetch-selected-profiles?email=${encrypEmail}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let result = [];
        console.log(json.data[0].bot_id);
        for (let i = 0; i < json.data.length; i++) {
          let src = `https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com/${json.data[i].bot_id}.jpg`;
          result.push({
            key: json.data[i].bot_id,
            name: json.data[i].name,
            photo: src,
            index: i,
          });
        }
        console.log(result[0].key);
        setChats(result);
      });
  };

  useEffect(getSelectedProfiles, []);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.83,
    height: window.height * 0.68,
  };
  let chatIndex = 0;

  const router = useRouter();

  // let bot = { index: 1, name: "sus", photo: "srrc", key: "skey" };
  function fn({ item }) {
    console.log("sus: ", item.key);
    return (
      <View style={{ flex: 1, marginLeft: "2.5%" }}>
        <SBItemChatSelect
          id={item.key}
          name={item.name}
          src={item.photo}
          pretty={true}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      {chats.length > 0 ? (
        <Carousel
          {...baseOptions}
          loop={false}
          ref={ref}
          style={{ width: "100%" }}
          scrollAnimationDuration={750}
          data={chats}
          pagingEnabled={isPagingEnabled}
          onSnapToItem={(index) => (chatIndex = index)}
          renderItem={fn}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 10,
        }}
      >
        <SButton
          onPress={() => {
            ref.current?.scrollTo({ count: -1, animated: true });
          }}
        >
          <Icon name={"left"} size={15} color={"white"} />
        </SButton>
        <SButton
          onPress={() => {
            ref.current?.scrollTo({ count: 1, animated: true });
          }}
        >
          <Icon name={"right"} size={15} color={"white"} />
        </SButton>
      </View>
    </View>
  );
}
