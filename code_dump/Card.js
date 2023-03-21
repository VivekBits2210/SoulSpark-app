import { View, Text, Image, ImageSourcePropType,StyleSheet, Dimensions  } from 'react-native'
// import { colors } from './constants'
const { height } = Dimensions.get('window')

const Card = ({ card }) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={card.profile_image}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.name}, ${card.age}`}
      </Text>
    </View>
  </View>
)

const styles=  StyleSheet.create({
    card: {
      /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
      height: height - 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      borderRadius: 5,
      shadowColor: '#F0F0F0',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      elevation: 2,
    },
    image: {
      borderRadius: 5,
      flex: 1,
      width: '100%',
    },
    photoDescriptionContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      flexDirection: 'column',
      height: '100%',
      position: 'absolute',
      left: 10,
      bottom: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      color: "white",
      textShadowColor: "black",
      textShadowRadius: 10,
    },
  })

export default Card