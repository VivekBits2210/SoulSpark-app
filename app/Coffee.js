import React from 'react';
import { View, TouchableOpacity, Text, Image, Linking , StyleSheet } from 'react-native';
import image0 from "../assets/icon.png";

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: '80%',
    paddingLeft: '5%',
    alignContent: 'center',
    top: 0,
  },
  text: {
    marginLeft: 15,
    fontSize: 20,
  },
});

export default function Coffee() {
    // const source = React.useRef({
    // uri: `https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg`,
    // }).current;
  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
        <TouchableOpacity
      onPress={() =>
        Linking.openURL('https://www.patreon.com/SoulSpark784/membership')
      }>
        <Image
        key={"dfsdfsd"}
        style={styles.image}
        source = {image0}
        resizeMode="contain"/>
        </TouchableOpacity>
              <Text style={styles.text}>Buy me a coffee</Text>
    </View>
  );
}
