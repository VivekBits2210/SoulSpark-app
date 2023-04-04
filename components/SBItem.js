import React from "react";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";

export const SBItem = (props) => {
  const { src, name, key, style, pretty, testID, ...animatedViewProps } = props;
  console.log(name);
  const [isPretty, setIsPretty] = React.useState(pretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty ? (
          <SBImageItem text={name} key={key} src={src} style={style} />
        ) : (
          <SBTextItem text={name} style={style} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};
