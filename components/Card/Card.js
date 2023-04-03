import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "./Card.styles";
import IconButton from "../IconButton/IconButton";

const Card = ({ card }) => {
  const router = useRouter();

  console.log("inside CARD: " + card.name);
  const handlePress = () => {
    router.push("/ExpandedProfile");
  };

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={card.photo} resizeMode="cover" />
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

//Card.propTypes = {
//  card: shape({
//    photo: ImageSourcePropType,
//    name: string,
//    age: number,
//  }).isRequired,
//}

export default Card;
