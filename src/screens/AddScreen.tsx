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
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <LinearGradient
        colors={['#111827', '#1f2937', '#111827']}
        style={styles.background}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Add New Item</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedType === 'checklist' && styles.selected,
            ]}
            onPress={() => setSelectedType('checklist')}
          >
            <LinearGradient
              colors={selectedType === 'checklist' ? ['#10b981', '#059669'] : ['#374151', '#1f2937']}
              style={styles.optionGradient}
            >
              <Text style={[styles.optionText, selectedType === 'checklist' && styles.selectedText]}>
                📝 Checklist
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
              colors={selectedType === 'task' ? ['#10b981', '#059669'] : ['#374151', '#1f2937']}
              style={styles.optionGradient}
            >
              <Text style={[styles.optionText, selectedType === 'task' && styles.selectedText]}>
                ✅ Task
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter name..."
            placeholderTextColor="#9ca3af"
            value={inputText}
            onChangeText={setInputText}
          />
        </View>

        <TouchableOpacity style={styles.addBtnWrapper} onPress={handleSubmit}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.addBtn}
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
    backgroundColor: '#111827' 
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    marginBottom: 40, 
    textAlign: 'center',
    color: '#f9fafb',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 16,
  },
  optionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    maxWidth: 140,
  },
  optionGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 16,
  },
  selected: {
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#f9fafb',
    fontWeight: '600',
  },
  selectedText: {
    color: '#ffffff',
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtnWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addBtn: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});