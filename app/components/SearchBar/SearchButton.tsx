import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

interface SearchButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export default function SearchButton({ onPress, disabled }: SearchButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isSelected, setIsSelected] = useState(false);

  const animatePress = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const animateRelease = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40
    }).start();
  };

  return (
    <Pressable
      style={[styles.submitButton, isSelected && styles.selectedButton]}
      onPress={() => {
        onPress();
        setIsSelected(true);
      }}
      onPressIn={animatePress}
      onPressOut={animateRelease}
      disabled={disabled}
    >
      <Animated.View
        style={{
          width: '100%',
          alignItems: 'center',
          transform: [{ scale: scaleAnim }]
        }}
      >
        <Text style={isSelected ? styles.selectedText : styles.buttonText}>
          Search
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#1C70BA',
    borderRadius: 3,
    width: '25%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedButton: {
    backgroundColor: '#1D60BA',
    borderColor: '#1D60BA'
  },
  buttonText: {
    color: 'white'
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
