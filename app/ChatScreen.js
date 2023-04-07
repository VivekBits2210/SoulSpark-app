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
    console.log("in addMessage, message: ", message);
    setMessages([message, ...messages]);
  };

  socket = new WebSocket(`wss://api-soulspark.com/ws/chat/`);

  socket.onmessage = (message) => {
    getLevel()
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
      `https://api-soulspark.com/chat-module/fetch-chat-history?bot_id=${id}&email=${encrypEmail}&n=50`
    )
      .then((res) => res.json())
      .then((json) => {
        let result = [];
        for (let i = json.history.length - 1; i >= 0; i--) {
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
        console.log("results from the api: ", result);
        setLevel(json.level);
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
    console.log("calling addMessage from handleSendPress", message)
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      <Progress.Bar
        progress={level < 0 ? 0 : level - Math.floor(level)}
        color={"rgba(111, 97, 232, 0.6)"}
        borderColor={"rgba(111, 97, 232, 1)"}
        borderRadius={0}
        height={3}
        width={null}
      />

      <Chat messages={messages} onSendPress={handleSendPress} user={user} />
    </View>
  );
}

export default ChatScreen;
