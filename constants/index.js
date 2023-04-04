import colors from "./colors";
import photoCards from "./photoCards";
import { Dimensions } from "react-native";

import { isWeb } from "../utils";

export const ElementsText = {
  AUTOPLAY: "AutoPlay",
};

export const window = isWeb
  ? {
      ...Dimensions.get("window"),
      width: 375,
    }
  : Dimensions.get("window");

export { colors, photoCards };

export const encrypEmail =
  "a83987c7b3b1f6c7ffb6116a55e6bfbed35fa95700d5f02e7d5c625f1476cd547afd1bdeab97edc273fee8901329ab5d";
