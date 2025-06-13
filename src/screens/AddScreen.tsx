import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
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
      <Text style={styles.title}>Add New Item</Text>

      <View style={styles.optionRow}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedType === 'checklist' && styles.selected,
          ]}
          onPress={() => setSelectedType('checklist')}
        >
          <Text style={styles.optionText}>Checklist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedType === 'task' && styles.selected,
          ]}
          onPress={() => setSelectedType('task')}
        >
          <Text style={styles.optionText}>Task</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter name..."
        value={inputText}
        onChangeText={setInputText}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#10b981',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: '#0d99f2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
