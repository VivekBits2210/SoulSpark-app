import React from 'react';
import { View, TouchableOpacity, Text, Image, Linking , StyleSheet } from 'react-native';
import image0 from "../assets/icon.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
  text: {
    fontSize: 20,
  },
});

export default function Coffee() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={{
        width: "100%",
        height: "50%"
      }}
        onPress={() =>
          Linking.openURL('https://www.patreon.com/SoulSpark784/membership')
        }
      >
        <Image
          key={"dfsdfsd"}
          style={styles.image}
          source={image0}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.text}>Buy me a coffee</Text>
    </View>
  );
}