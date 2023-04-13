import React from "react";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";

export const SBItem = (props) => {
  const { src, text, key, style, testID } = props;
  return (
    <Animated.View testID={testID} style={{ flex: 1 }}>
      <SBImageItem
        text={text}
        id={key}
        src={src}
        style={style}
        borderRadius={10}
      />
    </Animated.View>
  );
};

export const SBItemChatSelect = (props) => {
  const { id, src, name, style, pretty, testID, encryption, ...animatedViewProps } = props;
  const router = useRouter();
  const handleItemClick = () => {
    router.push(`./ChatScreen?name=${name}&id=${id}&encryption=${encryption}`);
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
          //          setIsPretty(!isPretty);
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
