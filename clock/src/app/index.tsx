import { useEffect, useRef, useState } from "react";  
import dayjs from 'dayjs';
import { 
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Easing
} from "react-native";

const { width } = Dimensions.get('window');
const SIZE = width * 0.9;

export default function Home() {

  const secondHand = useRef(new Animated.Value(0)).current;
  const minuteHand = useRef(new Animated.Value(0)).current;
  const hourHand = useRef(new Animated.Value(0)).current;

  const updateClock = () => {
    const now = dayjs();
    const seconds = now.second();
    const minutes = now.minute();
    const hours = now.hour();
    
    Animated.timing(secondHand, {
      toValue: seconds,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(minuteHand, {
      toValue: minutes + seconds / 60,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(hourHand, {
      toValue: hours % 12 + minutes / 60,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondInterpolate = secondHand.interpolate({
    inputRange: [0, 60],
    outputRange: ['0deg', '360deg'],
  });

  const minuteInterpolate = minuteHand.interpolate({
    inputRange: [0, 60],
    outputRange: ['0deg', '360deg'],
  });

  const hourInterpolate = hourHand.interpolate({
    inputRange: [0, 12],
    outputRange: ['0deg', '360deg'],
  });

  
  return (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <View style={[styles.bigQuadran]} />
    <View style={[styles.mediumQuadran]} />

    <Animated.View style={[styles.mover,  { transform: [{ rotate: hourInterpolate }] }]}>
      <View style={[styles.hours]} />
    </Animated.View>
    <Animated.View style={[styles.mover, { transform: [{ rotate: minuteInterpolate }] } ]}>
      <View style={[styles.minutes]} />
    </Animated.View>
    <Animated.View style={[styles.mover, { transform: [{ rotate: secondInterpolate }] } ]}>
      <View style={[styles.seconds]} />
    </Animated.View>
    <View style={[styles.smallQuadran]} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  mover: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '35%',
    marginTop: '15%',
    width: 4,
    borderRadius: 4
  },
  minutes: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    height: '45%',
    marginTop: '5%',
    width: 3,
    borderRadius: 3
  },
  seconds: {
    backgroundColor: 'rgba(227, 71, 134, 1)',
    height: '50%',
    width: 2,
    borderRadius: 2
  },
  bigQuadran:{
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200,200,200, 0.2)',
    position: 'absolute',
  },
  mediumQuadran:{
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200,200,200, 0.4)',
    position: 'absolute',
  },
  smallQuadran:{
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: 'rgba(227, 71, 134, 1)',
  }
})