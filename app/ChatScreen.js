import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import { Chat } from "@flyerhq/react-native-chat-ui";
import * as Progress from "react-native-progress";
import { email, encrypEmail } from "../constants";
import { useEffect } from "react";
import { useSearchParams } from "expo-router";

function ChatScreen() {
  const { id } = useSearchParams();
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      const v = c === "x" ? r : (r % 4) + 8;
      return v.toString(16);
    });
  };
  const [level, setLevel] = useState(-1);
  const [messages, setMessages] = useState([]);
  const user = { id: email };

  const addMessage = (message) => {
    setMessages([message, ...messages]);
  };

  function getLevel() {
    fetch(
      `https://api-soulspark.com/chat-module/fetch-chat-history?bot_id=${id}&email=${encrypEmail}&bot_id=${id}`
    )
      .then((res) => res.json())
      .then((json) => {
        let result = [];
        for (let i = 0; i < json.history.length; i++) {
          result.push({
            author: { id: json.history[i].who },
            createdAt: Date.now(),
            id: uuidv4(),
            text: json.history[i].message,
            type: "text",
          });
          // setMessages([result[i], ...messages]);
        }

        setMessages(result);
        console.log("message: ", messages);
        setLevel(json.level);
      });
  }
  useEffect(getLevel, []);
  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    addMessage(textMessage);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Progress.Bar
        // progress={0}
        progress={level < 0 ? 0 : level - Math.floor(level)}
        color={"rgba(80, 0, 128, 0.7)"}
        borderColor={"rgba(80, 0, 128, 1)"}
        borderRadius={0}
        height={3}
        width={null}
      />

      <Chat messages={messages} onSendPress={handleSendPress} user={user} />
    </View>
  );
}

export default ChatScreen;
