import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<any, any>;

const { width } = Dimensions.get('window');

export default function Welcome({ navigation }: Props): React.JSX.Element {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);


  const handleGetStarted = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('ChecklistApp');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <LinearGradient
        colors={['#000000', '#0c0c0c', '#000000']}
        style={styles.background}
      />

      {/* Glowing Text */}
      <Animated.Text style={[styles.welcomeText]}>
        Welcome
      </Animated.Text>

      {/* Get Started Button */}
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted} activeOpacity={0.8}>
          <LinearGradient
            colors={['#ffffff10', '#ffffff05']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  welcomeText: {
    fontSize: 52,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 80,
    letterSpacing: 2,
  },
  buttonWrapper: {
    width: width * 0.7,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ffffff15',
    borderWidth: 1,
    backgroundColor: '#121212',
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: 1,
    fontWeight: '400',
  },
});
