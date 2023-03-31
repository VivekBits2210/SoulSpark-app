import * as React from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons } from '@expo/vector-icons';

import { SBItem } from "../components/SBItem";
import SButton from "../components/SButton";
import { useRouter  } from "expo-router";
import { ElementsText, window } from "../constants";

const PAGE_WIDTH = window.width;

export default function ChatSelectionScreen() {
  const [data, setData] = React.useState([...new Array(4).keys()]);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: window.height*0.75 ,
  }

  const router = useRouter();
  const handleItemClick = () => {
    router.push('./ChatScreen');
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{ width: "100%" }}
        scrollAnimationDuration={750}
        data={data}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={index => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View style={{ flex: 1, marginLeft: "2.5%" }}>
            <TouchableOpacity style={{width:"100%",height:"100%"}} activeOpacity={0.94} onPress={handleItemClick}>
            <SBItem key={index} index={index} />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* <SButton
        onPress={() => {
          setIsFast(!isFast);
        }}
      >
        {isFast ? "NORMAL" : "FAST"}
      </SButton> */}
      {/* <SButton
        onPress={() => {
          setIsPagingEnabled(!isPagingEnabled);
        }}
      >
                PagingEnabled:{isPagingEnabled.toString()}
      </SButton> */}
      {/* <SButton
        onPress={() => {
          setIsAutoPlay(!isAutoPlay);
        }}
      >
        {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
      </SButton> */}
      {/* <SButton
        onPress={() => {
          console.log(ref.current?.getCurrentIndex());
        }}
      >
                Log current index
      </SButton> */}
      {/* <SButton
        onPress={() => {
          setData(
            data.length === 6
              ? [...new Array(8).keys()]
              : [...new Array(6).keys()],
          );
        }}
      >
                Change data length to:{data.length === 6 ? 8 : 6}
      </SButton> */}
          <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10
      }}
    >
      <SButton
        onPress={() => {
          ref.current?.scrollTo({ count: -1, animated: true });
        }}
      >
              <Ionicons
                      name={'arrow-back-sharp'}
                      color={'white'}
                    />
      </SButton>
      <SButton
        onPress={() => {
          ref.current?.scrollTo({ count: 1, animated: true });
        }}
      >
              <Ionicons
                      name={'arrow-forward-sharp'}
                      color={'white'}
                    />
      </SButton>
      </View>
    </View>
  );
}