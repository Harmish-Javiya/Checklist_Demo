import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

export default function AddScreen({ navigation }: Props) {
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState<'task' | 'checklist' | null>(null);

  const handleSubmit = () => {
    const trimmed = inputText.trim();
    if (!trimmed || !selectedType) return;
  
    navigation.replace('Home', {
      newItem: { name: trimmed, type: selectedType },
    });
  
    setInputText('');
    setSelectedType(null);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
        style={styles.background}
      />
      
      {/* Grain overlay */}
      <View style={styles.grainOverlay} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Add New Item</Text>
        <Text style={styles.subtitle}>Choose your productivity tool</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedType === 'checklist' && styles.selected,
            ]}
            onPress={() => setSelectedType('checklist')}
          >
            <LinearGradient
              colors={selectedType === 'checklist' ? ['#00d4aa', '#00c49a', '#00b48a'] : ['#1a1a1a', '#2a2a2a', '#1a1a1a']}
              style={styles.optionGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
            >
              <View style={styles.grainOverlaySmall} />
              <Text style={styles.optionEmoji}>📝</Text>
              <Text style={[styles.optionText, selectedType === 'checklist' && styles.selectedText]}>
                Checklist
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedType === 'task' && styles.selected,
            ]}
            onPress={() => setSelectedType('task')}
          >
            <LinearGradient
              colors={selectedType === 'task' ? ['#00d4aa', '#00c49a', '#00b48a'] : ['#1a1a1a', '#2a2a2a', '#1a1a1a']}
              style={styles.optionGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
            >
              <View style={styles.grainOverlaySmall} />
              <Text style={styles.optionEmoji}>✅</Text>
              <Text style={[styles.optionText, selectedType === 'task' && styles.selectedText]}>
                Task
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <LinearGradient
            colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
            style={styles.inputWrapper}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <View style={styles.grainOverlaySmall} />
            <TextInput
              style={styles.input}
              placeholder="Enter name..."
              placeholderTextColor="#6c757d"
              value={inputText}
              onChangeText={setInputText}
            />
          </LinearGradient>
        </View>

        <TouchableOpacity style={styles.addBtnWrapper} onPress={handleSubmit}>
          <LinearGradient
            colors={['#4c6ef5', '#364fc7', '#2f3ab2']}
            style={styles.addBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <Text style={styles.addText}>Add Item</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0a' 
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    shadowColor: '#fff',
    shadowOpacity: 0.02,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
  },
  grainOverlaySmall: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    shadowColor: '#fff',
    shadowOpacity: 0.02,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  title: { 
    fontSize: 36, 
    fontWeight: '800', 
    marginBottom: 8, 
    textAlign: 'center',
    color: '#f8f9fa',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#8e9aaf',
    textAlign: 'center',
    marginBottom: 48,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 20,
  },
  optionButton: {
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    maxWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  optionGradient: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
    position: 'relative',
  },
  selected: {
    shadowColor: '#00d4aa',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 17,
    color: '#f8f9fa',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
    position: 'relative',
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 17,
    color: '#f8f9fa',
    fontWeight: '500',
    letterSpacing: 0.3,
    position: 'relative',
    zIndex: 1,
  },
  addBtnWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4c6ef5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  addBtn: {
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});