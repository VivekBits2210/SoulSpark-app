import React from 'react';
import { View, Image } from 'react-native';
import {useTailwind} from 'tailwind-rn';

export default function HeaderBar() {
    const tw = useTailwind();
  return (
    <View style={tw('flex-row justify-between')}>
      <Image
        style={tw('w-8 h-8 rounded-full')}
        source={{ uri: 'your_user_profile_image_url' }}
      />
    </View>
  );
}