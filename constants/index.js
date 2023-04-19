import { Dimensions, Platform, PixelRatio } from "react-native";
export const window = Dimensions.get("window");

export const url_refresh_hack = 10;

export const api_url = "https://api-soulspark.com";

export const aws_url =
  "https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com";

export const normalize_font = (size) => {
  const newSize = (size * window.width) / 320;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
  }
};

export const version = "v1.0.1";
