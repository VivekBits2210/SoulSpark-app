import React, { useState } from 'react';
import { View } from 'react-native';
import { Chat } from '@flyerhq/react-native-chat-ui';

function ChatScreen() {
    const uuidv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16)
        const v = c === 'x' ? r : (r % 4) + 8
        return v.toString(16)
      })
    }
    const [messages, setMessages] = useState([]);
     const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

  const addMessage = (message) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Chat
              messages={messages}
              onSendPress={handleSendPress}
              user={user}
            />
    </View>
  );
}

export default ChatScreen;