import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

const ToolbarMenu = ({
  isPlaying,
  speed,
  fontSize,
  width,
  textColor,
  bgColor,
  flipHorizontal,
  flipVertical,
  onPlayPause,
  onReset,
  onSpeedChange,
  onFontSizeChange,
  onWidthChange,
  onTextColorChange,
  onBgColorChange,
  onFlipHorizontal,
  onFlipVertical,
  onFileOpen,
  onFileSave,
  onToggleMenu,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.menuRow}>
          {/* Play/Pause Button */}
          <TouchableOpacity style={styles.button} onPress={onPlayPause}>
            <Text style={styles.buttonText}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>

          {/* Reset Button */}
          <TouchableOpacity style={styles.button} onPress={onReset}>
            <Text style={styles.buttonText}>↻</Text>
          </TouchableOpacity>

          {/* Horizontal Flip Button */}
          <TouchableOpacity
            style={[styles.button, flipVertical && styles.buttonActive]}
            onPress={onFlipVertical}
          >
            <Text style={styles.buttonText}>↔</Text>
          </TouchableOpacity>

          {/* Vertical Flip Button */}
          <TouchableOpacity
            style={[styles.button, flipHorizontal && styles.buttonActive]}
            onPress={onFlipHorizontal}
          >
            <Text style={styles.buttonText}>↕</Text>
          </TouchableOpacity>

          {/* Open File Button */}
          <TouchableOpacity style={styles.button} onPress={onFileOpen}>
            <Text style={styles.buttonText}>📁</Text>
          </TouchableOpacity>

          {/* Save File Button */}
          <TouchableOpacity style={styles.button} onPress={onFileSave}>
            <Text style={styles.buttonText}>💾</Text>
          </TouchableOpacity>

          {/* Menu Toggle Button */}
          <TouchableOpacity style={styles.button} onPress={onToggleMenu}>
            <Text style={styles.buttonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.controlsRow}>
        <View style={styles.control}>
          <Text style={styles.controlLabel}>Speed: {speed}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={speed}
            onValueChange={onSpeedChange}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#666666"
          />
        </View>

        <View style={styles.control}>
          <Text style={styles.controlLabel}>Size: {fontSize}</Text>
          <Slider
            style={styles.slider}
            minimumValue={12}
            maximumValue={60}
            step={2}
            value={fontSize}
            onValueChange={onFontSizeChange}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#666666"
          />
        </View>

        <View style={styles.control}>
          <Text style={styles.controlLabel}>Width: {width}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={40}
            maximumValue={95}
            step={5}
            value={width}
            onValueChange={onWidthChange}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#666666"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.foldButton} onPress={onToggleMenu}>
        <Text style={styles.foldButtonText}>▲</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    paddingTop: 40,
    paddingBottom: 10,
  },
  menuRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  button: {
    width: 42,
    height: 42,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonActive: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
  },
  controlsRow: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  control: {
    marginBottom: 5,
  },
  controlLabel: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 2,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  foldButton: {
    alignSelf: 'center',
    width: 50,
    height: 24,
    backgroundColor: '#333',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foldButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default ToolbarMenu;
