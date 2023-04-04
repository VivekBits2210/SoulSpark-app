import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import styles from "./Card.styles";
import IconButton from "../IconButton/IconButton";

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
            name="down"
            onPress={handlePress}
            color="black"
            backgroundColor="rgba(255, 255, 255, 0.85)"
            size={10}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;
