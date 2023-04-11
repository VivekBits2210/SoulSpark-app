import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SBItemChatSelect } from "../components/SBItem";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { user, window, url_refresh_hack, api_url, aws_url } from "../constants";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import IconButton from "../components/IconButton/IconButton";

const PAGE_WIDTH = window.width;

export default function ChatSelectionScreen() {
  const ref = React.useRef(null);
  const [chats, setChats] = useState(null);

  const getSelectedProfiles = () => {
    fetch(
      `${api_url}/chat-module/fetch-selected-profiles?email=${user.encryption}`
    )
      .then((res) => res.json())
      .then((json) => {
        let result = [];
        for (let i = json.data.length - 1; i >= 0; i--) {
          let src = `${aws_url}/${json.data[i].bot_id}.jpg?url_refresh_hack=${url_refresh_hack}`;
          result.push({
            myKey: json.data[i].bot_id,
            name: json.data[i].name,
            photo: src,
            index: i,
          });
        }
        setChats(result);
      });
  };

  useFocusEffect(React.useCallback(getSelectedProfiles, []));

  // useEffect(getSelectedProfiles, []);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.93,
    height: window.height * 0.68,
  };
  let chatIndex = 0;

  const router = useRouter();

  function fn({ item }) {
    ref.current?.scrollTo({ index: 0 });
    return (
      <View style={{ flex: 1, marginLeft: "2.5%" }}>
        <SBItemChatSelect
          id={item.myKey}
          name={item.name}
          src={item.photo}
          pretty={true}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: "white" }}>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      {chats ? (
        chats.length == 0 ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "grey", textAlign: "center" }}>
              {"No matches yet"}
            </Text>
          </View>
        ) : (
          <>
            <Carousel
              {...baseOptions}
              loop={false}
              ref={ref}
              style={{ width: "100%" }}
              scrollAnimationDuration={750}
              data={chats}
              pagingEnabled={true}
              onSnapToItem={(index) => (chatIndex = index)}
              renderItem={fn}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 10,
                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              <IconButton
                name="caretleft"
                onPress={() => {
                  ref.current?.scrollTo({ count: -1, animated: true });
                }}
                color="white"
                backgroundColor="black"
                size={20}
              />
              <IconButton
                name="caretright"
                onPress={() => {
                  ref.current?.scrollTo({ count: 1, animated: true });
                }}
                color="white"
                backgroundColor="black"
                size={20}
              />

              {/* <SButton
                disabled={false}
                onPress={() => {
                  ref.current?.scrollTo({ count: -1, animated: true });
                }}
              >
                <Icon name={"caretleft"} size={20} color={"white"} />
              </SButton>
              <SButton
                disabled={false}
                onPress={() => {
                  ref.current?.scrollTo({ count: 1, animated: true });
                }}
              >
                <Icon name={"caretright"} size={20} color={"white"} />
              </SButton> */}
            </View>
          </>
        )
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
  );
}

const styles = StyleSheet.create({
  singleButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 9,
    shadowOpacity: 0.4,
    elevation: 2,
    padding: 15,
  },
});
