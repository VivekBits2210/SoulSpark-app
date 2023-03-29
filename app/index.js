import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './App.styles'
import MyTabs from './MyTabs'

export default function Home() {
return (
<View style={styles.globalContainer}
>
<MyTabs />
</View>
  );
}
