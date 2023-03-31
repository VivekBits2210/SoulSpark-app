import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Card.styles'
import IconButton from '../IconButton/IconButton'

const handlePress = () => {
  console.log("Expand pressed");
}

const Card = ({ card }) => (
  <View
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={card.photo}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {`${card.name}, ${card.age}`}
      </Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.expandButton}><IconButton
            name="down"
            onPress={handlePress}
            color="black"
            backgroundColor="white"
          /></TouchableOpacity>
       </View>
    </View>
  </View>
)

//Card.propTypes = {
//  card: shape({
//    photo: ImageSourcePropType,
//    name: string,
//    age: number,
//  }).isRequired,
//}

export default Card
