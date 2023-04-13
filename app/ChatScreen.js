import React, { useState } from "react";
import { View, Text } from "react-native";
import { Chat } from "@flyerhq/react-native-chat-ui";
import * as Progress from "react-native-progress";
import { email, api_url, normalize_font, window } from "../constants";
import { useEffect } from "react";
import { useSearchParams } from "expo-router";
import { Input } from "@flyerhq/react-native-chat-ui";
import { KeyboardAccessoryView } from "@flyerhq/react-native-keyboard-accessory-view";

function ChatScreen() {
  const { name, id, encryption, picture } = useSearchParams();
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      const v = c === "x" ? r : (r % 4) + 8;
      return v.toString(16);
    });
  };
  const [level, setLevel] = useState(-1);
  const [messages, setMessages] = useState([]);
  const chatUser = { id: email };

  const addMessage = (message) => {
    setMessages([message, ...messages]);
  };

  socket = new WebSocket(`wss://api-soulspark.com/ws/chat/`);

  socket.onmessage = (message) => {
    getLevel();
  };

  function getLevel() {
    fetch(
      `${api_url}/user-profiles/fetch-chat-history?bot_id=${id}&email=${encryption}&picture=${picture}&lines=50`
    )
      .then((res) => res.json())
      .then((json) => {
        let result = [];
        for (let i = json.history.length - 1; i >= 0; i--) {
          result.push({
            author: { id: json.history[i].who },
            createdAt: new Date(json.history[i].timestamp).getTime(),
            id: uuidv4(),
            text: json.history[i].message,
            type: "text",
          });
          // setMessages([result[i], ...messages]);
        }

        setMessages(result);
        setLevel(json.level ? json.level : 0);
      });
  }
  useEffect(getLevel, []);
  const handleSendPress = (message) => {
    const textMessage = {
      author: { id: email },
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    addMessage(textMessage);
    socket.send(
      JSON.stringify({
        email: email,
        bot_id: id,
        text: message.text,
      })
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      <View
        style={{
          backgroundColor: "rgba(60, 52, 151, 1)",
          display: "flex",
          flexDirection: "row",
          maxWidth: window.width,
        }}
      >
        <Progress.Bar
          progress={!level ? 0 : level < 0 ? 0 : level - Math.floor(level)}
          color={"rgba(111, 97, 232, 0.9)"}
          unfilledColor={"rgba(255, 255, 255, 1)"}
          borderColor={"rgba(60, 52, 151, 1)"}
          style={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
          height={17}
          width={window.width * 0.8}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(60, 52, 151, 1)",
            width: 0.2 * window.width,
          }}
        >
          <Text style={{ color: "#fff" }}>LEVEL {Math.floor(level + 1)}</Text>
        </View>
      </View>

      <Chat
        messages={messages}
        customBottomComponent={() => {
          return (
            <>
              {messages.length && messages[0].author.id === email ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // width: 200,
                    // height: 40,
                    backgroundColor: "white",
                    // marginLeft: 20,
                    // marginBottom: 16,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "italic",
                      fontSize: normalize_font(15),
                      marginBottom: "10%",
                    }}
                  >
                    {name} is typing...
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <KeyboardAccessoryView
                renderScrollable={React.useCallback(() => {
                  <Text></Text>;
                })}
                style={{
                  backgroundColor: "#000",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <Input
                  onSendPress={handleSendPress}
                  sendButtonVisibilityMode="editing"
                ></Input>
              </KeyboardAccessoryView>
            </>
          );
        }}
        user={chatUser}
      />
    </View>
  );
}

export default ChatScreen;
