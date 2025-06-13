import React, { JSX, useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, TextInput } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

interface SubItems{
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

interface ChecklistProps {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onComplete: () => void;
  createdAt: number;
  completedAt?: number;

}


export default function Checklist({
  text,
  completed,
  createdAt,
  completedAt,

  onDelete,
  onComplete,

}: ChecklistProps): JSX.Element {

  const [subItemInput, setSubItemInput] = useState('');


  return (
    <>
    <View style={styles.checklistContainer}>
      <View style={styles.topRow}>
        <Text style={[styles.checklistText, completed && styles.completedText]}>
          {text}
        </Text>
        <Pressable onPress={onDelete}>
          <Image
            source={require('../assets/deleteIcon/icons8-delete-18.png')}
            style={styles.icon}
            accessibilityLabel="Delete Icon"
          />
        </Pressable>
      </View>

      {!completed && (
        <Text style={styles.timestampText}>
          Added: {new Date(createdAt).toLocaleString()}
        </Text>
      )}
      {completed && completedAt && (
        <Text style={styles.timestampText}>
          Completed at: {new Date(completedAt).toLocaleString()}
        </Text>
      )}

      <View style={styles.row}>
        <BouncyCheckBox
          fillColor="#22c55e"
          iconStyle={{ borderColor: '#22c55e' }}
          size={25}
          style={styles.checkbox}
          isChecked={completed}
          onPress={onComplete}
        />
      </View>
    </View>
      </>
  );
}

const styles = StyleSheet.create({
  checklistContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checklistText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  timestampText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ef4444',
  },
  checkbox: {
    marginLeft: 0,
  },
  subItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'space-between',
  },
  subItemText: {
    fontSize: 14,
    flex: 1,
    color: '#000',
    marginLeft: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 4,
    fontSize: 14,
    marginTop: 8,
  },
  subItemContainer: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
