import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "./Card.styles";
import IconButton from "../IconButton/IconButton";
import { window } from "../../constants";

const Card = ({ card }) => {
  const router = useRouter();
  const id = card.key;

  const handlePress = () => {
    router.push(
      `/ExpandedProfile?name=${card.name}&age=${card.age}&bio=${card.bio}&bot_id=${id}`
    );
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: card.photo }}
        resizeMode="cover"
      />
      <View style={styles.photoDescriptionContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {`${card.name}, ${card.age}`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            name="caretdown"
            onPress={handlePress}
            color="white"
            backgroundColor="black"
            size={window.height/50}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;
