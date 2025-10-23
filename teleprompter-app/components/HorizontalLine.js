import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_Y = 80;
const MAX_Y = SCREEN_HEIGHT - 80;

const HorizontalLine = ({ width }) => {
  const [linePosition, setLinePosition] = useState(SCREEN_HEIGHT * 0.2);

  React.useEffect(() => {
    loadLinePosition();
  }, []);

  const loadLinePosition = async () => {
    try {
      const savedPosition = await AsyncStorage.getItem('horizontalLineTop');
      if (savedPosition) {
        setLinePosition(parseFloat(savedPosition));
      }
    } catch (error) {
      console.error('Error loading line position:', error);
    }
  };

  const saveLinePosition = async (position) => {
    try {
      await AsyncStorage.setItem('horizontalLineTop', position.toString());
    } catch (error) {
      console.error('Error saving line position:', error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = linePosition + gestureState.dy;
        if (newY >= MIN_Y && newY <= MAX_Y) {
          setLinePosition(newY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const newY = linePosition + gestureState.dy;
        const finalY = Math.max(MIN_Y, Math.min(MAX_Y, newY));
        setLinePosition(finalY);
        saveLinePosition(finalY);
      },
    })
  ).current;

  const rightPosition = `${(100 - width) / 2}%`;

  return (
    <View
      style={[styles.line, { top: linePosition }]}
      {...panResponder.panHandlers}
    >
      <View style={[styles.dot, { right: rightPosition }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'red',
    left: 0,
  },
  dot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    top: -7,
    marginRight: -16,
  },
});

export default HorizontalLine;
