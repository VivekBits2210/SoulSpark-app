import React, { useState } from "react";
import { View, StatusBar, Text } from "react-native";
import { Chat } from "@flyerhq/react-native-chat-ui";
import * as Progress from "react-native-progress";
import { email, encrypEmail } from "../constants";
import { useEffect } from "react";
import { useSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import { Input } from "@flyerhq/react-native-chat-ui";
import { KeyboardAccessoryView } from "@flyerhq/react-native-keyboard-accessory-view";
const windowWidth = Dimensions.get("window").width;

function ChatScreen() {
  const { name, id } = useSearchParams();
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      const v = c === "x" ? r : (r % 4) + 8;
      return v.toString(16);
    });
  };
  const [level, setLevel] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const user = { id: email };

  const addMessage = (message) => {
    console.log("in addMessage, message: ", message);
    setMessages([message, ...messages]);
  };

  socket = new WebSocket(`wss://api-soulspark.com/ws/chat/`);

  socket.onmessage = (message) => {
    getLevel();
    // data = JSON.parse(message.data)

    // if(data.who!==email){
    //   const messageData = {
    //     author: { id: data.who },
    //     createdAt: Date.now(),
    //     id: uuidv4(),
    //     text: data.message,
    //     type: "text",
    //   };
    // console.log("calling addMessage from socket.onmessage now with messageData", data.who)
    // addMessage(messageData);
    // }
  };

  function getLevel() {
    fetch(
      `https://api-soulspark.com/chat-module/fetch-chat-history?bot_id=${id}&email=${encrypEmail}&lines=50`
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
        console.log("json inside: ", json);
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
    console.log("calling addMessage from handleSendPress", message);
    addMessage(textMessage);
    // const textMessage2 = {
    //   author: { id: email },
    //   createdAt: Date.now(),
    //   id: uuidv4(),
    //   text: message.text,
    //   type: "text",
    // };
    // addMessage(textMessage2);
    socket.send(
      JSON.stringify({
        email: email,
        bot_id: id,
        text: message.text,
      })
    );
  };
  console.log("level outside json : ", level);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      <View
        style={{
          backgroundColor: "rgba(60, 52, 151, 1)",
          display: "flex",
          flexDirection: "row",
          maxWidth: windowWidth,
        }}
      >
        <Progress.Bar
          progress={!level ? 0 : level < 0 ? 0 : level - Math.floor(level)}
          color={"rgba(111, 97, 232, 0.9)"}
          unfilledColor={"rgba(255, 255, 255, 1)"}
          borderColor={"rgba(60, 52, 151, 1)"}
          style={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
          height={17}
          width={windowWidth * 0.8}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(60, 52, 151, 1)",
            width: 0.2 * windowWidth,
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
                    width: 200,
                    height: 40,
                    backgroundColor: "white",
                    marginLeft: 20,
                    marginBottom: 16,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "italic",
                      fontSize: 16,
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
        user={user}
      />
    </View>
  );
}

export default ChatScreen;
