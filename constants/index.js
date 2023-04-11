import { Dimensions, Platform, PixelRatio } from "react-native";
export const window = Dimensions.get("window");

export const user = {
  "encryption": "a83987c7b3b1f6c7ffb6116a55e6bfbed35fa95700d5f02e7d5c625f1476cd547afd1bdeab97edc273fee8901329ab5d",
  "email": "viveknayak2210@gmail.com",
  "name": "Vivek"
}

export const url_refresh_hack = 10;

export const api_url = 'https://api-soulspark.com';

export const aws_url = 'https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com';

export const normalize_font = ((size)=>{
  const newSize = (size * window.width) / 320; 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
  }
});