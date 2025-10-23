import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import ToolbarMenu from './components/ToolbarMenu';
import HorizontalLine from './components/HorizontalLine';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  // State management
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [fontSize, setFontSize] = useState(32);
  const [width, setWidth] = useState(80);
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const scrollViewRef = useRef(null);
  const scrollPosition = useRef(0);
  const animationFrame = useRef(null);

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    saveData();
  }, [text, speed, fontSize, width, textColor, bgColor]);

  const loadSavedData = async () => {
    try {
      const savedText = await AsyncStorage.getItem('inscriptionContent');
      const savedConfig = await AsyncStorage.getItem('inscriptionConfig');
      
      if (savedText) setText(savedText);
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setSpeed(config.speed || 10);
        setFontSize(config.fontSize || 32);
        setWidth(config.width || 80);
        setTextColor(config.textColor || '#ffffff');
        setBgColor(config.bgColor || '#000000');
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('inscriptionContent', text);
      await AsyncStorage.setItem('inscriptionConfig', JSON.stringify({
        speed,
        fontSize,
        width,
        textColor,
        bgColor,
      }));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Auto-scroll animation
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        scrollPosition.current += speed / 45;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: scrollPosition.current,
            animated: false,
          });
        }
        animationFrame.current = requestAnimationFrame(animate);
      };
      animationFrame.current = requestAnimationFrame(animate);
    } else {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isPlaying, speed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    scrollPosition.current = 0;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleFileOpen = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets[0]) {
        const fileUri = result.assets[0].uri;
        const content = await FileSystem.readAsStringAsync(fileUri);
        setText(content);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open file');
      console.error('Error opening file:', error);
    }
  };

  const handleFileSave = async () => {
    try {
      Alert.alert(
        'Save File',
        'Text content is ready. In a real app, this would save to your device.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save file');
      console.error('Error saving file:', error);
    }
  };

  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const transformStyle = {
    scaleX: flipVertical ? -1 : 1,
    scaleY: flipHorizontal ? -1 : 1,
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar style="light" />
      
      {isMenuVisible && (
        <ToolbarMenu
          isPlaying={isPlaying}
          speed={speed}
          fontSize={fontSize}
          width={width}
          textColor={textColor}
          bgColor={bgColor}
          flipHorizontal={flipHorizontal}
          flipVertical={flipVertical}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSpeedChange={setSpeed}
          onFontSizeChange={setFontSize}
          onWidthChange={setWidth}
          onTextColorChange={setTextColor}
          onBgColorChange={setBgColor}
          onFlipHorizontal={() => setFlipHorizontal(!flipHorizontal)}
          onFlipVertical={() => setFlipVertical(!flipVertical)}
          onFileOpen={handleFileOpen}
          onFileSave={handleFileSave}
          onToggleMenu={handleToggleMenu}
        />
      )}

      <ScrollView
        ref={scrollViewRef}
        style={[
          styles.scrollView,
          { transform: [transformStyle] },
        ]}
        contentContainerStyle={[
          styles.scrollContent,
          { width: `${width}%` },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollPosition.current = e.nativeEvent.contentOffset.y;
        }}
      >
        <TextInput
          style={[
            styles.textInput,
            {
              fontSize,
              color: textColor,
            },
          ]}
          value={text}
          onChangeText={setText}
          multiline
          placeholder="在线提词器无需安装，完全免费且无任何使用限制。请在此输入或粘贴您的文本内容..."
          placeholderTextColor="#666666"
        />
      </ScrollView>

      <HorizontalLine width={width} />

      {!isMenuVisible && (
        <TouchableOpacity
          style={styles.menuToggleButton}
          onPress={handleToggleMenu}
        >
          <Text style={styles.menuToggleText}>☰</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignSelf: 'center',
    paddingTop: SCREEN_HEIGHT * 0.15,
    paddingBottom: SCREEN_HEIGHT * 0.65,
    paddingHorizontal: 20,
  },
  textInput: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    lineHeight: 1.5,
    textAlign: 'left',
  },
  menuToggleButton: {
    position: 'absolute',
    top: 40,
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 30,
    backgroundColor: '#333',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuToggleText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
