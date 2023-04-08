import React from "react";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";

export const SBItem = (props) => {
  const { src, name, key, style, pretty, testID, ...animatedViewProps } = props;
  // console.log(name);
  const [isPretty, setIsPretty] = React.useState(pretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty ? (
          <SBImageItem
            text={name}
            id={key}
            src={src}
            style={style}
          />
        ) : (
          <SBTextItem text={name} style={style} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export const SBItemChatSelect = (props) => {
  const { id, src, name, style, pretty, testID, ...animatedViewProps } = props;
  const router = useRouter();
  const handleItemClick = () => {
    router.push(`./ChatScreen?name=${name}&id=${id}`);
  };
  const [isPretty, setIsPretty] = React.useState(pretty);
  return (
    <TouchableOpacity
      style={{ width: "100%", height: "100%" }}
      activeOpacity={0.7}
      onPress={handleItemClick}
    >
      <LongPressGestureHandler
        onActivated={() => {
          setIsPretty(!isPretty);
        }}
      >
        <Animated.View
          testID={testID}
          style={{ flex: 1 }}
          {...animatedViewProps}
        >
          {isPretty ? (
            <SBImageItem
              // onPress={handleItemClick}
              text={name}
              id={id}
              src={src}
              style={style}
            />
          ) : (
            <SBTextItem text={name} style={style} />
          )}
        </Animated.View>
      </LongPressGestureHandler>
    </TouchableOpacity>
  );
};
